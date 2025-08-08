"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./registration.module.css";
import { Register } from "@/api/Register";

//import Cookies from "js-cookie";

export default function Page() {
    const router = useRouter();
    const [visibility, setVisibility] = useState(false);              
    const [confirmVisibility, setConfirmVisibility] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");  
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");

    const registerApi = async (event) => {
        event.preventDefault();
        if (password !== confirm) {
            setMessage('パスワードが一致していません。')
            setIsError(true);
            return;
        }
        const response = await Register({ name, password });
        if (response.success) {
            Cookies.set("authToken", response.token);
            router.push("/home");
        } else {
            setMessage(response.messages)
            setIsError(true);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.title}>
                新規登録
            </div>
            <form onSubmit={registerApi} className="space-y-4 px-1 mt-1">
                <div className="group">
                    <label className={style.username}>
                        
                    </label>
                    <div className={style.loginform}>
                        <input
                            type="text"
                            className={`peer pl-12 h-[43px] flex-1 px-4 py-2 border-none rounded-md placeholder:text-base placeholder:focus:text-textOpacity group-hover:shadow-input focus:shadow-input focus:outline-none focus:border-text transition-shadow ${
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
                            className={`peer pl-12 h-[43px] flex-1 px-4 py-2 border-none rounded-md placeholder:text-base placeholder:focus:text-text group-hover:shadow-input focus:shadow-input focus:outline-none focus:border-text transition-shadow ${
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
                    <div className={style.passwordform_confirm}>
                        <input
                            type={confirmVisibility ? "text" : "password"} 
                            className={`peer pl-12 h-[43px] flex-1 px-4 py-2 border-none rounded-md placeholder:text-base placeholder:focus:text-text group-hover:shadow-input focus:shadow-input focus:outline-none focus:border-text transition-shadow ${
                            isError
                                ? "border-formError shadow-error"
                                : "border-textOpacity"
                            }`}
                            placeholder="パスワード(確認)"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setConfirmVisibility(v => !v)}    
                        >
                        <Image
                           src={`/visibility_${confirmVisibility ? "open" : "close"}.svg`} 
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
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    className={style.register_button}
                >
                    新規登録
                </button>
                <div className={style.text_login}>
                    ログインの方は{" "}
                    <Link href="/auth/login" className={style.next}>
                        こちら
                    </Link>
                </div>
            </form>
        </div>
    );
};