"use client";

import style from "./page.module.css";

export default function Page() {
  return (
    <div className={style.container}>
      <div className={style.detail}>
        <div className={style.title}>基本情報</div>
        {/* 説明・住所・電話番号の表示を修正 */}
        <div className={style.detailBody}>
          <span className={style.value}>
            テキストテキストテキストテキストテキストテキストテキスト
          </span>
        </div>
        <div className={style.detailBody}>
          <span className={style.value}>
            〒150-0001<br />
            東京都渋谷区神宮前１丁目12-34 ABCビル2階
          </span>
        </div>
        <div className={style.detailBody}>
          <span className={style.value}>
            <span role="img" aria-label="電話">📞</span> 03-1234-5678
          </span>
        </div>
        <div className={style.detailBody} style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <span className={style.value}>
            月〜金：10:00〜19:00<br />
            土・日・祝：11:00〜18:00
          </span>
          <button className={style.reserve_button}>予約</button>
        </div>
      </div>
    </div>
  );
}
