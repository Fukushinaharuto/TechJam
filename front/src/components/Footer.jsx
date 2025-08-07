import Image from "next/image";
import Link from "next/link";

export function Footer() {  

    return (    
        <div className="flex bg-[var(--footer)] justify-between items-center px-12 py-2 gap-4"> 
            <div>
                <Link 
                    href="/home"
                >     
                    <Image
                        className="mx-auto"
                        src="/home.svg"
                        width={60}
                        height={60}
                        alt="ホームアイコン"
                    />
                </Link>
            </div>
            <div>
                <Link 
                    href="/favorites"
                >     
                    <Image
                        className="mx-auto"
                        src="/favorite.svg"
                        width={60}
                        height={60}
                        alt="お気に入りアイコン"
                    />
                </Link>
            </div>
            <div>
                <Link 
                    href="/reviews"
                >     
                    <Image
                        className="mx-auto"
                        src="/post.svg"
                        width={60}
                        height={60}
                        alt="投稿アイコン"
                    />
                </Link>
            </div>
            <div>
                <Link
                    href="/events"
                >     
                    <Image
                        className="mx-auto"
                        src="/notification.svg"
                        width={60}
                        height={60}
                        alt="イベントアイコン"
                    />
                </Link>
            </div>
            <div className="">
                <Link 
                    href="/mypage"
                >     
                    <Image
                        className="mx-auto"
                        src="/icon.svg"
                        width={60}
                        height={60}
                        alt="ユーザーアイコン"
                    />
                </Link>
            </div>
        </div>
    );
};