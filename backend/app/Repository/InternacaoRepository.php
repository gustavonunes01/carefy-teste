<?php

namespace App\Repository;

use App\Models\Internacao;

class InternacaoRepository extends AbstractRepository
{
    protected $model = Internacao::class;

    public function existGuia(string $guia){

        return $this->model->select("id_paciente")->where("codigo", $guia)->first();
    }

    public function existInternacao(string $id_paciente){
        return $this->model->select("id")->where("id_paciente", $id_paciente)->whereNull("saida")->first();
    }

    public function listInternacao(){

        return $this->model->with("paciente")->get();
    }

}
