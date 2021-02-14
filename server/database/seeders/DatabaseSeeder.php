<?php

namespace Database\Seeders;

use App\Models\Athlete;
use Illuminate\Support\Facades\File;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $json = File::get("database/data/olympic-winners.json");
        $data = json_decode($json);
        foreach ($data as $obj) {
            Athlete::create(array(
                'athlete' => $obj->athlete,
                'age' => $obj->age,
                'country' => $obj->country,
                'year' => $obj->year,
                'date' => $obj->date,
                'sport' => $obj->sport,
                'gold' => $obj->gold,
                'silver' => $obj->silver,
                'bronze' => $obj->bronze,
                'total' => $obj->total
            ));
        }
        // \App\Models\User::factory(10)->create();
    }
}
