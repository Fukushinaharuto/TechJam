import style from "./page.module.css";
//import { useState } from "react";

export default function Page() {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.main_title}>レビュー詳細</div>
      </div>


        <div className={style.card}>
            <section className={style.card_store}>
                <div className={style.store}>
                    <h2 className={style.store_name}>店舗名：料理名</h2>
                </div>
                <div className={style.card__image}>
                <div className={style.thumbs}>
                    <div className={style.thumb} />
                    <div className={style.thumb} />
                    <div className={style.thumb} />
                    <div className={style.thumb} />
                </div>
                </div>
            </section>

            <section className={style.card_details}>
                <div className={style.price_detail}>
                    <dt className={style.detail_list_label}>値段</dt>
                    <dd className={style.detail_list}>
                        <span className={style.price}>¥1,000〜¥1,500</span>
                    </dd>
                </div>

                <div className={style.detail_list__item}>
                    <dt className={style.detail_list_label}>自己評価</dt>
                    <dd className={style.detail_list__value_rating}>
                        <div className={style.rating__row}>
                            <span className={style.rating_label}>見た目</span>
                            <div className={style.stars}>★★★★★</div>
                        </div>
                        <div className={style.rating_row}>
                            <span className={style.rating_label}>味</span>
                            <div className={style.stars}>★★★★☆</div>
                        </div>
                        <div className={style.rating_row}>
                            <span className={style.rating_label}>コスパ</span>
                            <div className={style.stars}>★★★☆☆</div>
                        </div>
                    </dd>
                </div>


                <div className={style.detail_list__item}>
                    <dt className={style.detail_list_label}>タグ</dt>
                    <dd className={style.detail_list__value_tags}>
                        <span className={style.tag}>#ピザ</span>
                        <span className={style.tag}>#ピザ</span>
                    </dd>
                </div>

        
                <div className={style.detail_list__item}>
                    <dt className={style.detail_list_label}>コメント</dt>
                    <dd className={style.detail_list__value}>
                    <textarea
                        className={style.comment}
                        placeholder="コメントを入力"
                    />
                    </dd>
                </div>


                <div className={style["detail-list__item"]}>
                    <div className={style.detail_list__label}>訪問日時</div>
                </div>
             
            </section>    
        </div>

    </div>
  );
}
