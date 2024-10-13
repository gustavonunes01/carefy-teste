<?php

use App\Enums\Profile;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CensoController;
use App\Http\Controllers\SalesController;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthenticatedSessionController::class, 'store']);


Route::get('/me', [AuthenticatedSessionController::class, 'me']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);

Route::get('/doctors', function(){
    $users = User::select('id', 'name')->where('profile_id', Profile::DOCTOR)->get();

    return response()->json($users, 200);
});

Route::post('/censo/importacao', [CensoController::class, 'import']);
Route::get('/internacoes', [\App\Http\Controllers\InternacaoController::class, 'list']);

