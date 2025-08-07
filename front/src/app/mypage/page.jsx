"use client"
import { Head } from "@/components/Head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ReviewContext } from "@/components/ReviewContext"
import { Footer } from "@/components/Footer";
import { MyPageIndex } from "@/api/mypageIndex";

export default function Page() {
    const [name, setName] = useState('ユーザー名');
    const [iconImage, setIconImage] = useState("/icon-test.svg");

    useEffect(() => {
        const Index = async() => {
            const response = await MypageIndex() 
            if (response ) {
                setName(response.name);
                setIconImage(response.imageUrl);
            }
        }
        Index()
    }, [name, iconImage]);
    
    return (
        <div>
            <div className="w-full">
                <Head
                    title={"仕事"}
                />
            </div>
            <h2 className="text-3xl mt-10 mb-5 px-4">
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
                                src={iconImage}
                                alt="アイコン"
                                width={120}
                                height={120}
                            />
                            <div>
                                称号
                            </div>
                        </div>
                        <div className="bg-[var(--review)] rounded-2xl p-4 grid grid-rows-1">
                            <div className="flex text-xl items-center">
                                {name}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="text-3xl mt-10 mb-5 px-4">
                投稿一覧
            </h2>
            <div className="flex overflow-x-auto space-x-4 p-4 [&::-webkit-scrollbar]:hidden">
                <div className="w-[300px] flex-shrink-0">
                    <ReviewContext 
                        name={'料理名'}
                        userImage={'/icon.svg'}
                        dishImage={'/test.png'}
                    />
                </div>
                <div className="w-[300px] flex-shrink-0">
                    <ReviewContext 
                        name={'料理名'}
                        userImage={'/icon.svg'}
                        dishImage={'/test.png'}
                    />
                </div>
            </div>
            <div className='fixed bottom-0 left-0 w-full z-50'>
                <Footer/>
            </div>
        </div>
    );
};