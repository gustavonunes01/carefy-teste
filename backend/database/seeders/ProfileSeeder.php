<?php


namespace Database\Seeders;

use App\Models\Profile;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    public function run()
    {
        Profile::updateOrCreate(
            [
                'id' => 1,
                'name' => 'Recepção',
            ],
            [
                'id' => 1,
                'name' => 'Recepção',
            ]
        );

        Profile::updateOrCreate(
            [
                'id' => 2,
                'name' => 'Paciente',
            ],
            [
                'id' => 2,
                'name' => 'Paciente',
            ]
        );

        Profile::updateOrCreate(
            [
                'id' => 3,
                'name' => 'Doutor',
            ],
            [
                'id' => 3,
                'name' => 'Doutor',
            ]
        );

    }
}
