import Image from "next/image";

export function Head({ title, iconImage }) {  
    
    return (    
        <div className="relative flex justify-center border-b-2 border-[var(--footer)] py-4">
            <h1 className="text-4xl">
                {title}
            </h1>
            {iconImage && (
                <Image
                    src={iconImage}
                    alt="アイコン"
                    width={42}
                    height={42}
                />
            )}
        </div>
    );
};