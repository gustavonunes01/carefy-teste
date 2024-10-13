<?php

namespace App\Repository;

use App\Models\Paciente;

class PacienteRepository extends AbstractRepository
{
    protected $model = Paciente::class;

    public function create(array $data){

        if(empty($data)) throw \Exception("Erro ao inserir paciente");

        // Se existir um paciente com o mesmo nome e data de nascimento ele atualiza somente, para não duplicar
        return $this->model->updateOrCreate(
            #RN02-01
            ["nome" => $data["nome"], "nascimento" => $data["nascimento"]],
            $data
        );
    }

    public function list(){
        return $this->model->with("internacoes")->get();
    }

}
