import style from "./Header.module.css";

export function Header() {
  return (
    <div className={style.wrapper}>
      {/* 左の丸アイコン */}
      <div className={style.avatar}></div>

      {/* 検索ボックス */}
      <div className={style.searchBox}>
        <input
          type="text"
          placeholder="検索..."
          className={style.searchInput}
        />
        <button className={style.searchButton}></button>
      </div>

      {/* フィルターボタン（三本線） */}
      <button className={style.filterButton}>≡</button>

      {/* タグボタンたち */}
      <div className={style.tagList}>
        <button className={style.tagButton}>#ピザ</button>
        <button className={style.tagButton}>#ピザ</button>
        <button className={style.tagButton}>#ピザ</button>
        <button className={style.tagButton}>全て</button>
      </div>
    </div>
  );
}