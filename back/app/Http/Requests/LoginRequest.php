<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class LoginRequest extends FormRequest
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
            'name' => ['required', 'max:10'],
            'password' => ['required', Password::defaults()],
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'ユーザー名は必須です。',
            'name.max' => 'ユーザー名は10文字以内にしてください。',
            'password.required' => 'パスワードは必須です。',
            'password.min' => 'パスワードは8文字以上でなければなりません。',
            'password.mixedCase' => 'パスワードには大文字と小文字の両方を含める必要があります。',
            'password.numbers' => 'パスワードには少なくとも1つの数字が必要です。',
            'password.symbols' => 'パスワードには少なくとも1つの記号が必要です。',
            'password.uncompromised' => 'このパスワードは、過去に漏洩したことがあります。別のパスワードを使用してください。',
        ];
    }
}