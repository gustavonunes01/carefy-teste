<?php

namespace App\Http\Controllers;

use App\Http\Requests\Censo\CensoRequest;
use App\Services\CensoImportacao;
use App\Services\InernacaoService;
use Illuminate\Http\Request;

class InternacaoController extends Controller
{

    protected InernacaoService $service;

    public function __construct(){
        $this->service = new InernacaoService();
    }

    /**
     * @throws \Exception
     */
    public function list()
    {
        $censoImportacao = $this->service->list();
        return response()->json(['data' => $censoImportacao], 200);
    }


}
