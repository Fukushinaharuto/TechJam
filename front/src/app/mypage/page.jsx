"use client"
import { Head } from "@/components/Head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ReviewContext } from "@/components/ReviewContext"
import { Footer } from "@/components/Footer";
import { MypageIndex } from "@/api/MypageIndex";
import { MypageUpdate } from "@/api/MypageUpdate";

export default function Page() {
    const [name, setName] = useState('');
    const [iconImage, setIconImage] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [editName, setEditName] = useState("");
    const [editImageFile, setEditImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    
    useEffect(() => {
        const Index = async() => {
            const response = await MypageIndex() 
            if (response ) {
                setName(response.name);
                setEditName(response.name || "");
                if (response.imageUrl) {
                    const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}storage/user_images/${response.imageUrl}`;
                    setIconImage(fullUrl);
                    setPreviewUrl(fullUrl);  
                    console.log(fullUrl);                  
                }
            }
        }
        Index()
    }, []);

    const Update = async() => {
        const response = await MypageUpdate({ editImageFile, editName})
        console.log(response);
        if (response) {
            setName(response.name);
            if (response.imageUrl) {
                setIconImage(`${process.env.NEXT_PUBLIC_API_URL}storage/user_images/${response.imageUrl}`);
            }
        }
    }

    
    return (
        <div className="pb-[80px]">
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
                    <div 
                        className="flex justify-end px-7" 
                        onClick={() => setIsEdit(!isEdit)}
                    >
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
                            {!isEdit ?
                                <div className="w-[120px] h-[120px] rounded-full overflow-hidden relative flex-shrink-0 bg-gray-200">
                                    {iconImage ? (
                                        <Image
                                            src={iconImage}
                                            alt="アイコン"
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            unoptimized
                                        />
                                    ) : (
                                        // 代わりに何か表示するかnullにする
                                        null
                                    )}
                                </div>
                            :
                            <>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="iconFile"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setEditImageFile(file);
                                            setPreviewUrl(URL.createObjectURL(file));
                                        }

                                    }}
                                />
                                <label htmlFor="iconFile" className="cursor-pointer ">
                                <div className="w-[120px] h-[120px] rounded-full overflow-hidden relative flex-shrink-0 bg-gray-200">
                                    <Image
                                        src={previewUrl}
                                        alt="アイコン"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        unoptimized
                                    />
                                </div>
                                </label>
                            </>
                            }
                            <div>
                                称号
                            </div>
                        </div>
                        <div className="bg-[var(--review)] rounded-2xl p-4 grid grid-rows-1">
                            <div className="flex text-xl items-center">
                                {!isEdit ?
                                    <div>
                                        {name}
                                    </div>
                                :
                                    <div >
                                        <input 
                                            type="text"
                                            className="bg-white border-[1px] py-1 px-3 border-[#333333]"
                                            onChange={(e) => setEditName(e.target.value)}
                                            value={editName}
                                        />

                                    </div>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isEdit &&
            <div className="flex justify-end items-center pr-6 mt-5">
                <div 
                    className="px-5 py-2  bg-blue-400 rounded-md text-white text-lg"
                    onClick={Update}
                >
                    変更する
                </div>
            </div>
            }
            
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