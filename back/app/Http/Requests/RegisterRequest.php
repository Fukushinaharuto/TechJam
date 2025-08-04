<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            "name" ['required', 'max:255', 'uniqid:users'],
            "email" => ['required', 'email', 'uniqid:users']
            "phone_number" => ['required', 'max:15', 'uniqid:users'],
            "password" => ['required', Password::defaults()]
        ];
    }

    public function message(): array
    {
        return [
            'name.required' => '名前は必須です。',
            'name.max' => '名前は255文字以内で入力してください。',
            'name.unique' => 'この名前はすでに使用されています。',
            'email.required' => 'メールアドレスは必須です。',
            'email.email' => '有効なメールアドレスを入力してください。',
            'email.unique' => 'このメールアドレスはすでに使用されています。',
            'phone_number.required' => '電話番号は必須です。',
            'phone_number.max' => '電話番号は15文字以内で入力してください。',
            'phone_number.unique' => 'この電話番号はすでに使用されています。',
            'password.required' => 'パスワードは必須です。',
            'password.min' => 'パスワードは8文字以上でなければなりません。',
            'password.mixedCase' => 'パスワードには大文字と小文字の両方を含める必要があります。',
            'password.numbers' => 'パスワードには少なくとも1つの数字が必要です。',
            'password.symbols' => 'パスワードには少なくとも1つの記号が必要です。',
            'password.uncompromised' => 'このパスワードは、過去に漏洩したことがあります。別のパスワードを使用してください。',
        ];
    }
}
