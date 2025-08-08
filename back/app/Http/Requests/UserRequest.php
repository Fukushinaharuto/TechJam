<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['string', 'max:10', 'unique:users,name,' . $this->user()->id ?? ''], 
            'imageFile' => ['required', 'file', 'image', 'max:2048'], 
        ];
    }

    public function messages(): array
    {
        return [
            'name.max' => '名前は10文字以内で入力してください。',
            'name.unique' => 'この名前はすでに使用されています。',
            'imageFile.required' => '写真は必須です。',
            'imageFile.file' => 'アップロードに失敗しました。再度お試しください。',
            'imageFile.image' => '画像ファイルを選択してください。',
            'imageFile.max' => '画像のサイズは2MB以下にしてください。',
        ];
    }
}
