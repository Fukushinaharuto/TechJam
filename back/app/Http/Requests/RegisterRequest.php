<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ['required', 'max:10', 'unique:users'],
            "password" => ['required', 'confirmed', Password::defaults()]
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => '名前は必須です。',
            'name.max' => '名前は10文字以内で入力してください。',
            'name.unique' => 'この名前はすでに使用されています。',
            'password.required' => 'パスワードは必須です。',
            'password.confirmed' => 'パスワードが一致しません。',
            'password.min' => 'パスワードは8文字以上でなければなりません。',
            'password.mixedCase' => 'パスワードには大文字と小文字の両方を含める必要があります。',
            'password.numbers' => 'パスワードには少なくとも1つの数字が必要です。',
            'password.symbols' => 'パスワードには少なくとも1つの記号が必要です。',
            'password.uncompromised' => 'このパスワードは、過去に漏洩したことがあります。別のパスワードを使用してください。',
        ];
    }
}
