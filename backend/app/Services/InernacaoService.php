<?php

namespace App\Services;

use App\Repository\InternacaoRepository;
use App\Repository\PacienteRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class InernacaoService
{

    protected InternacaoRepository $repository;
    protected PacienteRepository $pacienteRepository;

    public function __construct(){
        $this->repository = new InternacaoRepository();
        $this->pacienteRepository = new PacienteRepository();
    }

    private function convertList($item, $nome){

        $internacoes = [];

        foreach($item->internacoes as $item){
            $internacoes[] = [
                'id' => $item->id,
                'codigo' => $item->codigo,
                'entrada' => Carbon::parse($item->entrada)->format('d/m/Y'),
                "saida" => Carbon::parse($item->saida)->format('d/m/Y')
            ];
        }

        return [
            "id" => $item->id,
            "nome" => $nome,
            "nascimento" => Carbon::parse($item->nascimento)->format('d/m/Y'),
            "codigo" => $item->codigo,
            "internacoes" => $internacoes
        ];
    }

    public function list(){


        return $this->pacienteRepository->list()?->map(function($item){

            Log::info($item);

            return $this->convertList($item, $item->nome);
        });

        $list = $this->repository->listInternacao();

        return $list->map(function($item){
            return [
                "id" => $item->id,
                "nome" => $item->paciente->nome,
                "nascimento" => Carbon::parse($item->paciente->nascimento)->format('d/m/Y'),
                "codigo" => $item->paciente->codigo,
                "guia" => $item->codigo,
                "entrada" => Carbon::parse($item->entrada)->format('d/m/Y'),
                "saida" => Carbon::parse($item->saida)->format('d/m/Y'),
            ];
        });
    }

}
