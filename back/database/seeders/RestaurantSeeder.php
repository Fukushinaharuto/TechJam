<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Restaurant;

class RestaurantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Restaurant::create([
            'name' => '麺家 獅子丸',
            'address' => '東京都新宿区西新宿2-8-1',
            'phone' => '03-1234-5678',
            // その他のカラムをここに
        ]);

        Restaurant::create([
            'name' => 'カフェ 花鳥風月',
            'address' => '東京都渋谷区渋谷1-1-1',
            'phone' => '03-9876-5432',
            // ...
        ]);

        // もっと複数件登録可能
    }
}
