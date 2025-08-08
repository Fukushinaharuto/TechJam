<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\UserRequest;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;


class UserController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        return response()->json([
            'name' => $user->name,
            'imageUrl' => $user->image_url,
        ]);
    }

    public function update(UserRequest $request)
    {
        try {
            $user = Auth::user();
            $validatedData = $request->validated();
            $imageFile = $request->file('imageFile');

            if ($imageFile) {
                if ($user->image_url) {
                    $deletePath = 'public/' . $user->image_url;
                    Storage::delete($deletePath);
                }
                $path = $imageFile->store('user_images', 'public');
                $fileName = basename($path);
                $user->image_url = $fileName;
            }

            $user->name = $validatedData['name'];
            $user->save();

            return response()->json([
                'message' => 'ユーザー情報を更新しました。',
                'success' => true,
                'name' => $user->name,
                'imageUrl' => $user->image_url,
            ]);
        } catch (\Exception $e) {
            Log::error('ユーザー情報更新エラー: ' . $e);
            return response()->json([
                'messages' => 'ユーザー情報の更新に失敗しました。',
                'success' => false,
            ]);
        }
    }


    public function image()
    {
        $user = Auth::user();

        $fileName = $user->image_url;

        if (!Storage::disk('public')->exists($fileName)) {
            abort(404, 'Image not found');
        }

        $file = Storage::disk('public')->get($fileName);
        $mimeType = Storage::disk('public')->mimeType($fileName);

        return new Response($file, 200, [
            'Content-Type' => $mimeType,
            'Content-Disposition' => 'inline; filename="' . $fileName . '"',
        ]);
    }
}
