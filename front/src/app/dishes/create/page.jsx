"use client"
import { Head } from "@/components/Head";
import Image from "next/image";
import { useState } from "react";
import { ReviewContext } from "@/components/ReviewContext"

export default function Page() {
    const [name, setName] = useState('ユーザー名');
    const [password, setPassword] = useState('パスワード');

    return (
        <div>
            <Head
                title={"仕事"}
                image_url={"/icon-test.svg"}
            />
            <h2 className="text-3xl mt-6 px-4">
                プロフィール
            </h2>
            <div>
                <div>
                    <div className="flex justify-end px-7">
                        <Image
                            src={"/edit.svg"}
                            alt="アイコン"
                            width={20}
                            height={20}
                        />
                        <div className="text-[var(--footer)]">編集</div>
                    </div>
                    <div className="grid grid-cols-[fit-content(100%)_auto] px-4 gap-5">                  
                        <div className="grid place-items-center w-fit">
                            <Image
                                src={"/icon-test.svg"}
                                alt="アイコン"
                                width={120}
                                height={120}
                            />
                            <div>
                                称号
                            </div>
                        </div>
                        <div className="bg-[var(--review)] rounded-2xl p-4 grid grid-rows-2">
                            <div className="flex text-xl items-center">
                                {name}
                            </div>
                            <div className="flex text-xl items-center">
                                パスワード
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="text-3xl my-6 px-4">
                投稿一覧
            </h2>
            <div className="w-[350px]">
                <ReviewContext/>
            </div>
            

        </div>
    );
};