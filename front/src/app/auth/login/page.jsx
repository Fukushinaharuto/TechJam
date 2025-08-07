"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Cookies from "js-cookie";

export default function Page() {
    const router = useRouter();
    const [visibility, setVisibility] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isError, setIsError] = useState(false);

    const loginApi = async (event) => {
        event.preventDefault();
        const response = await Login({ name, password });

        if (response.success) {
            Cookies.set('authToken', response.token);
            router.push("/home");
        } else {
            setIsError(true);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <form onSubmit={loginApi} className="space-y-4 px-1 mt-1">
                <div className="group">
                    <label className="block text-base text-text mb-2">
                        ユーザー名
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            className={`peer pl-12 h-[43px] w-full px-4 py-2 border rounded-md placeholder:text-base placeholder:focus:text-textOpacity group-hover:shadow-input focus:shadow-input focus:outline-none focus:border-text transition-shadow ${
                                isError
                                ? "border-formError shadow-error"
                                : "border-textOpacity"
                            }`}
                            placeholder="山本 吾郎"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="group">
                    <label className="block text-base text-text mb-2">
                        パスワード
                    </label>
                    <div className="relative">
                        <input
                            type={visibility ? "text" : "password"}
                            className={`peer pl-12 h-[43px] w-full px-4 py-2 border rounded-md placeholder:text-base placeholder:focus:text-text group-hover:shadow-input focus:shadow-input focus:outline-none focus:border-text transition-shadow ${
                            isError
                                ? "border-formError shadow-error"
                                : "border-textOpacity"
                            }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    <button
                        onClick={() => setVisibility(!visibility)}
                        type="button"
                    >
                        <Image
                        src={`/visibility_${visibility ? "open" : "close"}.svg`}
                        alt="パスワードが見えないアイコン"
                        width={20}
                        height={20}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        />
                    </button>
                    </div>
                </div>
                {isError && (
                    <p className="text-formError text-error text-xs">
                    メールアドレスまたはパスワードが正しくありません。
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full p-2 h-14 text-base text-baseColor bg-accentDark rounded-md"
                >
                    ログイン
                </button>
            </form>
        </div>
    );
};