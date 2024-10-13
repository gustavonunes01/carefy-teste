<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notificacao extends Model
{
    use HasFactory;

    protected $fillable = [
        "id_paciente",
        "id_user",
        "message",
        "read_at",
    ];

    public function paciente(){
        return $this->belongsTo(Paciente::class, 'id_paciente');
    }

    public function user(){
        // Aqui seria o usuário que está criando essa notificação.
        return $this->belongsTo(User::class, 'id_user');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    public function casts(): array
    {
        return [
            'read_at' => 'timestamp',
        ];
    }

}

