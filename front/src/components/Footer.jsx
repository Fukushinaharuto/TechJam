"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MypageIndex } from "@/api/MypageIndex";

export function Footer() {  
    const [iconImage, setIconImage] = useState("");
    useEffect(() => {
        const Index = async() => {
            const response = await MypageIndex() 
            if (response.imageUrl) {
                const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}storage/user_images/${response.imageUrl}`;
                setIconImage(fullUrl);
                console.log(fullUrl);                  
            } 
        }
        Index()
    }, []);
    return (    
        <div className="flex bg-[var(--footer)] justify-center items-center px-12 py-2 gap-4"> 
            <div>
                <Link 
                    href="/home"
                >     
                    <div className="w-[50px] h-[50px]">
                        <Image
                            className="mx-auto"
                            src="/home.svg"
                            width={60}
                            height={60}
                            alt="ホームアイコン"
                        />
                    </div>
                </Link>
            </div>
            <div>
                <Link 
                    href="/favorites"
                >     
                    <div className="w-[50px] h-[50px]">
                        <Image
                            className="mx-auto"
                            src="/favorite.svg"
                            width={60}
                            height={60}
                            alt="お気に入りアイコン"
                        />
                    </div>
                </Link>
            </div>
            <div>
                <Link 
                    href="/reviews/create"
                >     
                    <div className="w-[50px] h-[50px]">
                        <Image
                            className="mx-auto"
                            src="/post.svg"
                            width={60}
                            height={60}
                            alt="投稿アイコン"
                        />
                    </div>
                </Link>
            </div>
            <div>
                <Link
                    href="/events"
                >     
                    <div className="w-[50px] h-[50px]">
                        <Image
                            className="mx-auto"
                            src="/notification.svg"
                            width={60}
                            height={60}
                            alt="イベントアイコン"
                        />
                    </div>
                </Link>
            </div>
            <div className="">
                <Link 
                    href="/mypage"
                >     
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden relative flex-shrink-0 bg-gray-200">
                    {iconImage ? (
                        <Image
                            className="mx-auto"
                            src={iconImage}
                            width={60}
                            height={60}
                            alt="icon"
                            unoptimized
                        />
                    ) : null}
                    </div>
                </Link>
            </div>
        </div>
    );
};