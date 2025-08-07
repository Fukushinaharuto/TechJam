import Image from "next/image";

export function Footer() {  
    
    return (    
        <div className="flex bg-[var(--footer)] justify-between items-center px-12 py-2"> 
            <div>
                <Image
                    className="mx-auto"
                    src="/home.svg"
                    width={40}
                    height={40}
                    alt="ホームアイコン"
                />
            </div>
            <div>
                <Image
                    className="mx-auto"
                    src="/favorite.svg"
                    width={40}
                    height={40}
                    alt="お気に入りアイコン"
                />
            </div>
            <div>
                <Image
                    className="mx-auto"
                    src="/post.svg"
                    width={40}
                    height={40}
                    alt="投稿アイコン"
                />
            </div>
            <div>
                <Image
                    className="mx-auto"
                    src="/notification.svg"
                    width={40}
                    height={40}
                    alt="通知アイコン"
                />
            </div>
            <div>
                <Image
                    className="mx-auto"
                    src="/icon.svg"
                    width={40}
                    height={40}
                    alt="ユーザーアイコン"
                />
            </div>
        </div>
    );
};