"use client";
import Link from "next/link";
import style from "./RestaurantShow.module.css";


export function RestaurantShow({ placeDetails }) {  
    
    return (   
        <div className={style.container}>
        <div className={style.detail}>
            <h1 className="text-3xl my-6 font-bold">{placeDetails["name"]}</h1>
           
                
            {/* 説明・住所・電話番号の表示
            </div>
            <div className={style.title}>基本情報</div>
            を修正 */}
            <div className={style.detailBody}>
            <span className={style.value}>
                
              
            </span>
            </div>
            <div className={style.detailBody}>
            <span className={style.value}>
                {placeDetails['address']}
            </span>
            </div>
            <div className={style.detailBody}>
            <span className={style.value}>
                <span role="img" aria-label="電話">📞</span> {placeDetails["phone"]}
            </span>
            </div>
            <div>
            <Link
                    className="text-blue-400 border-b text-lg"
                    href={placeDetails["website"]}
                >
                    {placeDetails["website"]}
                </Link>
            </div>
            <div className={style.detailBody} style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <span className={style.value}>
                
            </span>
            </div>
            
        </div>
        </div>
    )
};