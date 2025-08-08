<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DishRequest extends FormRequest
{
    public function authorize(): bool
    {
        // 認可の制御。必要に応じてtrue→falseに変更。
        return true;
    }

    public function rules(): array
    {
        return [
            'restaurantId' => ['nullable', 'exists:restaurants,id'],
            'placeId' => ['nullable','required_without:restaurantId', 'string'],
            'lat' => ['nullable','required_without:restaurantId', 'numeric'],
            'lng' => ['nullable','required_without:restaurantId', 'numeric'],
            'dish' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'restaurantId.exists' => '指定されたレストランが存在しません。',
            'placeId.required_without' => 'レストランが指定されていない場合、placeIdは必須です。',
            'lat.required_without' => 'レストランが指定されていない場合、latは必須です。',
            'lng.required_without' => 'レストランが指定されていない場合、lngは必須です。',
            // 必要に応じて他のメッセージも追加
            'dish.required' => '料理名は必須です。',
            'dish.string' => '料理名は文字列で指定してください。',
            'dish.max' => '料理名は255文字以内で入力してください。',
            'price.required' => '値段は必須です。',
            'price.numeric' => '値段は数値で指定してください。',
            'price.min' => '値段は0以上で指定してください。',

        ];
    }
}
