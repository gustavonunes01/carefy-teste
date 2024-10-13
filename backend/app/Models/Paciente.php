<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Paciente extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['nome', 'email', 'nascimento', 'codigo'];

    public function internacoes(){
        return $this->hasMany(Internacao::class, "id_paciente", "id");
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

