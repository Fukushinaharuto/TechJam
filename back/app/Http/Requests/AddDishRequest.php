<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddFoodsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'restaurant_id' => ['required'],
            "name" ['required'],
            "price" => ['required'],
            "description" => ['required'],
            "imageUrl" => ['required']
        ];
    }
    public function messages(): array
    {
        return [
            'restaurant_id.required' => 'レストランIDは必須です。',
            'name.required' => '料理名は必須です。',
            'price.required' => '価格は必須です。',
            'description.required' => '説明は必須です。',
            'imageUrl.required' => '画像URLは必須です。',
        ];
    }
}
