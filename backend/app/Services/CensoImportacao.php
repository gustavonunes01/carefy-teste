<?php

namespace App\Services;

use App\Repository\InternacaoRepository;
use App\Repository\PacienteRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CensoImportacao
{

    protected PacienteRepository $pacienteRepository;
    protected InternacaoRepository $internacaoRepository;

    public function __construct()
    {
        $this->pacienteRepository = app(PacienteRepository::class);
        $this->internacaoRepository = app(InternacaoRepository::class);
    }

    public function import(array $data): array
    {

        if(empty($data)){
            throw new \Exception("EMPTY");
        }

        $error = [];

        foreach($data as $row){
            DB::beginTransaction();
            try{

                $nascimento = \Carbon\Carbon::createFromFormat('d/m/Y',$row['nascimento']);

                // Começar criando o paciente
                $pacienteCreat = [
                    'nome' => $row['nome'],
                    'nascimento' => $nascimento->format('Y-m-d'),
                    'codigo' => $row['codigo'],
                ];

                $paciente = $this->pacienteRepository->create($pacienteCreat);

                // Se deu certo de criar o paciente, entao criamos a internação
                if ($paciente) {
                    $existGuia = $this->internacaoRepository->existGuia($row['guia']);
                    if (!empty($existGuia)) {
                        #RN02-02
                        // Existe internação para o numero da guia
                        if ($existGuia->id_paciente == $paciente->id) {
                            // Se for para o mesmo paciente
                            throw new \Exception("EXIST_GUIA_SAME");
                        } else {
                            // Se não a guia é de outro paciente
                            throw new \Exception("EXIST_GUIA_DIFF");
                        }
                    }

                    $existInternacao = $this->internacaoRepository->existInternacao($paciente->id);

                    if (!empty($existInternacao)) {
                        #RN02-05
                        throw new \Exception("EXIST_INTERN_NOT_LEAVE");
                    }

                    $data_entrada = \Carbon\Carbon::createFromFormat('d/m/Y',$row['entrada']);
                    $data_saida = \Carbon\Carbon::createFromFormat('d/m/Y',$row['saida']);

                    if($nascimento > $data_entrada){
                        #RN02-03
                        throw new \Exception("INTERN_DATA_ENTRY_ERRO");
                    }

                    if($data_saida <= $data_entrada){
                        #RN02-04
                        throw new \Exception("INTERN_DATA_EXIT_ERRO");
                    }

                    $internacaoData = [
                        'id_paciente' => $paciente->id,
                        'codigo' => $row['guia'],
                        'entrada' => $data_entrada->format('Y-m-d'),
                        'saida' => isset($row['saida']) && $row['saida'] !== '' ? $data_saida->format('Y-m-d') : null,
                    ];

                    $this->internacaoRepository->store($internacaoData);
                }
                DB::commit();
            } catch (\Exception $exception){
                Log::error($exception->getMessage());
                $row["verified"] = false;
                $error[] = [ "type_error" => $exception->getMessage(), "data" => $row];
                DB::rollBack();
            }

        }

        return ["message" => "Importação finalizada", 'error' => $error];

    }
}
