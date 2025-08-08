"use client";

import { useState } from "react";
import style from "./page.module.css";

export default function Page() {
  // 仮の選択肢データ
  const storeOptions = ["店舗A", "店舗B", "店舗C"];
  const dishOptions = ["料理X", "料理Y", "料理Z"];
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedDish, setSelectedDish] = useState("");
 
  const [ratings, setRatings] = useState({
    appearance: 0,
    taste: 0,
    cost: 0,
  });
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [visitDate, setVisitDate] = useState("");
  const [ratingInput, setRatingInput] = useState("");
  const [customRatings, setCustomRatings] = useState([]);

  const handleStarClick = (type, value) => {
    setRatings((prev) => ({ ...prev, [type]: value }));
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };
  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };
  const handleRemoveTag = (removeTag) => {
    setTags(tags.filter((t) => t !== removeTag));
  };
  const handleAddCustomRating = () => {
    const trimmed = ratingInput.trim();
    if (trimmed && !customRatings.some(r => r.label === trimmed)) {
      setCustomRatings([...customRatings, { label: trimmed, value: 0 }]);
      setRatingInput("");
    }
  };
  const handleRatingInputKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomRating();
    }
  };
  const handleCustomStarClick = (label, value) => {
    setCustomRatings(customRatings.map(r => r.label === label ? { ...r, value } : r));
  };
  const handleRemoveCustomRating = (label) => {
    setCustomRatings(customRatings.filter(r => r.label !== label));
  };

  return (
    <div className={style.container}>
      <div className={style.card_group}>
        <div className={style.input_row}>
          <div className={style.title_required}>店舗名</div>
          <select
            className={style.input}
            value={selectedStore}
            onChange={e => setSelectedStore(e.target.value)}
          >
            <option value="" disabled>店舗を選択</option>
            {storeOptions.map((store) => (
              <option key={store} value={store}>{store}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={style.card_group}>
        <div className={style.input_row}>
          <div className={style.title_required}>料理名</div>
          <select
            className={style.input}
            value={selectedDish}
            onChange={e => setSelectedDish(e.target.value)}
          >
            <option value="" disabled>料理を選択</option>
            {dishOptions.map((dish) => (
              <option key={dish} value={dish}>{dish}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={style.card_group}>
        <div className={style.title_required}>写真</div>
        <div className={style.photo}>
          <input type="file" accept="image/*" className={style.input} />
        </div>
      </div>

      <div className={style.card_group}>
        <dt className={style.title_required}>自己評価</dt>
        <dd className={style.evaluation_rating}>
          <div className={style.rating__row}>
            <span className={style.rating_label}>見た目</span>
            <div className={style.stars}>
              {[1,2,3,4,5].map((n) => (
                <span
                  key={n}
                  className={style.star}
                  style={{ color: n <= ratings.appearance ? '#FFD700' : '#ccc' }}
                  onClick={() => handleStarClick('appearance', n)}
                >★</span>
              ))}
            </div>
          </div>
          <div className={style.rating__row}>
            <span className={style.rating_label}>味</span>
            <div className={style.stars}>
              {[1,2,3,4,5].map((n) => (
                <span
                  key={n}
                  className={style.star}
                  style={{ color: n <= ratings.taste ? '#FFD700' : '#ccc' }}
                  onClick={() => handleStarClick('taste', n)}
                >★</span>
              ))}
            </div>
          </div>
          <div className={style.rating__row}>
            <span className={style.rating_label}>コスパ</span>
            <div className={style.stars}>
              {[1,2,3,4,5].map((n) => (
                <span
                  key={n}
                  className={style.star}
                  style={{ color: n <= ratings.cost ? '#FFD700' : '#ccc' }}
                  onClick={() => handleStarClick('cost', n)}
                >★</span>
              ))}
            </div>
          </div>
          {customRatings.map(rating => (
            <div className={style.rating__row} key={rating.label}>
              <span className={style.rating_label}>{rating.label}
                <button type="button" onClick={() => handleRemoveCustomRating(rating.label)} style={{marginLeft:'0.3em',background:'none',border:'none',cursor:'pointer',color:'#FF8A65',fontWeight:'bold'}}>×</button>
              </span>
              <div className={style.stars}>
                {[1,2,3,4,5].map((n) => (
                  <span
                    key={n}
                    className={style.star}
                    style={{ color: n <= rating.value ? '#FFD700' : '#ccc' }}
                    onClick={() => handleCustomStarClick(rating.label, n)}
                  >★</span>
                ))}
              </div>
            </div>
          ))}
          <div className={style.rating__row}>
            <input
              type="text"
              placeholder="評価項目を追加"
              value={ratingInput}
              onChange={e => setRatingInput(e.target.value)}
              onKeyDown={handleRatingInputKeyDown}
              style={{minWidth:'80px',flex:'1',padding:'0.4em',border:'1px solid #FF8A65',borderRadius:'0.5em'}}
            />
            <button type="button" onClick={handleAddCustomRating} style={{background:'#FF9F61',color:'#fff',border:'none',borderRadius:'50%',width:'2em',height:'2em',fontSize:'1.3em',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>＋</button>
          </div>
        </dd>
      </div>

      <div className={style.card_group}>
        <div className={style.title}>タグ</div>
        <div className={style.evaluation} style={{display:'flex',alignItems:'center',gap:'0.5rem',flexWrap:'wrap'}}>
          {tags.map((tag) => (
            <span key={tag} style={{background:'#ffe0b2',borderRadius:'1em',padding:'0.2em 0.8em',marginRight:'0.3em',display:'flex',alignItems:'center',fontSize:'0.95em'}}>
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)} style={{marginLeft:'0.3em',background:'none',border:'none',cursor:'pointer',color:'#FF8A65',fontWeight:'bold'}}>×</button>
            </span>
          ))}
          <input
            type="text"
            placeholder="タグを追加"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleTagInputKeyDown}
            style={{minWidth:'80px',flex:'1',padding:'0.4em',border:'1px solid #FF8A65',borderRadius:'0.5em'}}
          />
          <button type="button" onClick={handleAddTag} style={{background:'#FF9F61',color:'#fff',border:'none',borderRadius:'50%',width:'2em',height:'2em',fontSize:'1.3em',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>＋</button>
        </div>
        <span className={style.card_progress}>5/7</span>
      </div>

      <div className={style.card_group}>
        <div className={style.title}>コメント</div>
        <div className={style.comment}>
          <textarea
            className={style.comment_input}
            placeholder="コメントを入力してください"
          />
        </div>
      </div>

      <div className={style.card_group}>
        <div className={style.title_required}>訪問日時</div>
        <div className={style.date} style={{display:'flex',alignItems:'center',gap:'0.5rem',flexWrap:'wrap'}}>
          <input
            type="date"
            value={visitDate}
            onChange={e => setVisitDate(e.target.value)}
            className={style.input}
            style={{maxWidth:'180px'}}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
        <button
          type="button"
          className={style.submit_button}
        >
          レビューを投稿
        </button>
      </div>
    </div>
  );
}