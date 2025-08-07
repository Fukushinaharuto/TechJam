import Image from "next/image";

export function ReviewContext({ userImage, name, dishImage }) {  
    
    return (    
        <div className="bg-[var(--review)] p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <Image
                        src={userImage}
                        alt="ユーザーアイコン"
                        width={30}
                        height={30}
                    />
                    <h1 className="ml-4 text-xl">{name}</h1>
                </div>
                <Image
                    src={`/favoriteOrangi.svg`}
                    alt="お気に入りアイコン"
                    width={30}
                    height={30}
                />
            </div>
            <div className="grid grid-cols-2 gap-5">
                <Image
                    src={dishImage}
                    alt="料理のアイコン"
                    width={160}
                    height={160}
                />
                    <div className="grid grid-rows-4">
                        <div className="flex">
                            <Image
                                src={`/icon.svg`}
                                alt="コスパのアイコン"
                                width={23}
                                height={23}
                                className="mr-2"
                            />
                            <Image src={`/star.svg`} alt="星のアイコン" width={23} height={23}/>
                            <Image src={`/star.svg`} alt="星のアイコン" width={23} height={23}/>
                            <Image src={`/star.svg`} alt="星のアイコン" width={23} height={23}/>
                            <Image src={`/star.svg`} alt="星のアイコン" width={23} height={23}/>
                            <Image src={`/star.svg`} alt="星のアイコン" width={23} height={23}/>
                        </div>
                        <div className="flex">
                            <Image
                                src={`/icon.svg`}
                                alt="見栄えのアイコン"
                                width={23}
                                height={23}
                                className="mr-2"
                            />
                            <Image src={`/star.svg`} alt="星のアイコン" width={23} height={23}/>
                            <Image src={`/star.svg`} alt="星のアイコン" width={23} height={23}/>
                            <Image src={`/star.svg`} alt="星のアイコン" width={23} height={23}/>
                            <Image src={`/star.svg`} alt="星のアイコン" width={23} height={23}/>
                            <Image src={`/star.svg`} alt="星のアイコン" width={23} height={23}/>
                        </div>
                        <div className="flex">
                            <Image
                                src={`/icon.svg`}
                                alt="美味しさのアイコン"
                                width={23}
                                height={23}
                                className="mr-2"
                            />
                            <Image src={`/star.svg`} alt="星のアイコン" width={23} height={23}/>
                            <Image src={`/star.svg`} alt="星のアイコン" width={23} height={23}/>
                            <Image src={`/star.svg`} alt="星のアイコン" width={23} height={23}/>
                            <Image src={`/star.svg`} alt="星のアイコン" width={23} height={23}/>
                            <Image src={`/star.svg`} alt="星のアイコン" width={23} height={23}/>
                        </div>
                        <div className="text-xs flex justify-end items-end">
                            もっと見る   
                        </div>
                    </div>
                </div>
            </div>
        
    );
};