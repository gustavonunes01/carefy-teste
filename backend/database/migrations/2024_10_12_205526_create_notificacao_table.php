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
        Schema::create('notificacao', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger("id_paciente");
            $table->unsignedBigInteger("id_user");
            $table->text("message");
            $table->timestamp("read_at")->nullable();

            $table->foreign("id_paciente")->references("id")->on("pacientes");
            $table->foreign("id_user")->references("id")->on("users");

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notificacao');
    }
};
