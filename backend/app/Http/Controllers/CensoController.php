<?php

namespace App\Http\Controllers;

use App\Http\Requests\Censo\CensoRequest;
use App\Services\CensoImportacao;
use Illuminate\Http\Request;

class CensoController extends Controller
{

    protected CensoImportacao $service;

    public function __construct(){
        $this->service = new CensoImportacao();
    }

    /**
     * @throws \Exception
     */
    public function import(Request $request)
    {
        \Log::info("cheguei aqui");
        $censoImportacao = $this->service->import($request->all());
        \Log::info($censoImportacao);
        return response()->json(['data' => $censoImportacao], 200);
    }


}
