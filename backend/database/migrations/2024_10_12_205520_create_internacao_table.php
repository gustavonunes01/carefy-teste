<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('internacao', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("id_paciente");
            $table->string("codigo");
            $table->timestamp("entrada");
            $table->timestamp("saida")->nullable();

            $table->foreign("id_paciente")->references("id")->on("pacientes");

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('internacao');
    }
};
