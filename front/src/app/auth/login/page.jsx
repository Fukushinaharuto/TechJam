"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./login.module.css";

//import Cookies from "js-cookie";

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
        <div className={style.container}>
            <div className={style.title}>
                ログイン
            </div>
            <form onSubmit={loginApi} className="space-y-4 px-1 mt-1">
                <div className="group">
                    <label className={style.username}>
                        
                    </label>
                    <div className={style.loginform}>
                        <input
                            type="text"
                            className={`peer pl-12 h-[43px] w-full px-4 py-2 border-none rounded-md placeholder:text-base placeholder:focus:text-textOpacity group-hover:shadow-input focus:shadow-input focus:outline-none focus:border-text transition-shadow ${
                                isError
                                ? "border-formError shadow-error"
                                : "border-textOpacity"
                            }`}
                            placeholder="ユーザー名"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                </div>

                <div className="group">
                    <label className="block text-base text-text mb-2">
                        
                    </label>
                    <div className={style.passwordform}>
                        <input
                            type={visibility ? "text" : "password"}
                            className={`peer pl-12 h-[43px] w-full px-4 py-2 border-none rounded-md placeholder:text-base placeholder:focus:text-text group-hover:shadow-input focus:shadow-input focus:outline-none focus:border-text transition-shadow ${
                            isError
                                ? "border-formError shadow-error"
                                : "border-textOpacity"
                            }`}
                            placeholder="パスワード"
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
                        className={style.visibility}
                        />
                    </button>
                    </div>
                </div>
                {isError && (
                    <p className="text-formError text-error text-xs">
                    ユーザー名またはパスワードが正しくありません。
                    </p>
                )}

                <button
                    type="submit"
                    className={style.login_button}
                >
                    ログイン
                </button>
                <div className={style.text_registration}>
                    新規登録の方は{" "}
                    <Link href="/auth/registration" className={style.next}>
                        こちら
                    </Link>
                </div>
            </form>
        </div>
    );
};