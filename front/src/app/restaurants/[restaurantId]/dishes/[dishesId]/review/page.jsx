"use client";

import style from "./page.module.css";
import { useRouter } from "next/navigation";


export default function Page() {

    const router = useRouter();

    // ダミーデータ
    const review = {
        ratings: { appearance: "★★★★★", taste: "★★★★☆", cost: "★★★☆☆" },
        tags: ["#ピザ", "#チーズ"],
        comment: "とても美味しかった！生地がサクサクだった！",
        visitedAt: "2025/08/07 14:00",
    };

    return (
    <div className={style.container}>
        <header className={style.header}>
            <h1 className={style.main_title}>レビュー詳細</h1>
        </header>


        <div className={style.card}>

            <div className={style.avatarPlaceholder} />

            
            <section className={style.card_store}>
                <div className={style.store}>
                    <h2 className={style.store_name}>店舗名・料理名</h2>
                </div>
                <div className={style.card__image}>
                    <img src="" alt="料理の写真" className={style.image}></img>

                <div className={style.thumbs}>
                    <div className={style.thumb} />
                    <div className={style.thumb} />
                    <div className={style.thumb} />
                    <div className={style.thumb} />
                </div>
                </div>
            </section>

            <section className={style.card_details}>

                <div className={style.detail_list__item}>
                    <dt className={style.detail_list_label}>自己評価</dt>
                    <dd className={style.detail_list__value_rating}>
                        <div className={style.rating__row}>
                            <span className={style.rating_label}>見た目</span>
                            <div className={style.stars}>{review.ratings.appearance}</div>
                        </div>
                        <div className={style.rating__row}>
                            <span className={style.rating_label}>味</span>
                            <div className={style.stars}>{review.ratings.taste}</div>
                        </div>
                        <div className={style.rating__row}>
                            <span className={style.rating_label}>コスパ</span>
                            <div className={style.stars}>{review.ratings.cost}</div>
                        </div>
                    </dd>
                </div>


                <div className={style.detail_list__item}>
                    <dt className={style.detail_list_label}>タグ</dt>
                    <dd className={style.detail_list__value_tags}>
                        {review.tags.map((t) => (
                            <span key={t} className={style.tag}>
                            {t}
                            </span>
                        ))}
                    </dd>
                </div>

        
                <div className={style.detail_list__item}>
                    <dt className={style.detail_list_label}>コメント</dt>
                    <dd className={style.commentBox}>{review.comment}</dd>
                </div>


                <div className={style["detail-list__item"]}>
                    <div className={style.detail_list__label}>{review.visitedAt}</div>
                </div>
             
            </section>    
        </div>

    </div>
  );
}
