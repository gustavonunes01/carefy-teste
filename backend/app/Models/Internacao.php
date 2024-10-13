<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Internacao extends Model
{
    use HasFactory;

    protected $table = "internacao";

    protected $fillable = [
        "id_paciente",
        "codigo",
        "entrada",
        "saida",
    ];

    public function paciente(){
        return $this->belongsTo(Paciente::class, 'id_paciente');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    public function casts(): array
    {
        return [
            'nascimento' => 'date',
        ];
    }

}

