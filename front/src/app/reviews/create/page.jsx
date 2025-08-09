"use client";

import { useState, useEffect } from "react";
import style from "./page.module.css";
import { Footer } from "@/components/Footer";
import { Head } from "@/components/Head";
import { RestaurantSelect } from "@/api/RestaurantSelect";
import { DishSelect } from "@/api/DishSelect";
import { ReviewSelect } from "@/api/ReviewSelect";
import { ReviewStore } from "@/api/ReviewStore";

export default function Page() {
  // 仮の選択肢データ
  const [storeOptions, setStoreOptions] = useState([]);
  const [dishOptions, setDishOptions] = useState([]);

  const [selectedStore, setSelectedStore] = useState("");
  const [selectedDish, setSelectedDish] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const [ratings, setRatings] = useState({
    appearance: 0,
    taste: 0,
    cost: 0,
  });
  const [tags, setTags] = useState([]);
  const [visitDate, setVisitDate] = useState("");
  const [ratingInput, setRatingInput] = useState("");
  const [customRatings, setCustomRatings] = useState([]);
  const [previewUrl, setPreviewUrl] = useState("");

  const getReviewScores = () => {
    const basic = [
      { category: "appearance", score: ratings.appearance },
      { category: "taste", score: ratings.taste },
      { category: "cost", score: ratings.cost }
    ];
    const custom = customRatings.map(r => ({
      category: r.label,
      score: r.value
    }));
    return [...basic, ...custom];
  };

  const handleSubmit = async () => {
    const reviewScores = getReviewScores();
    const response = await ReviewStore({ selectedStore, selectedDish, inputDescription, reviewScores, tags, imageFile });
  
    if (!response.success) {
      alert("成功");
    } else {
      alert("失敗");
    }
  };

  useEffect(() => {
    const Index = async() => {
      const restaurant = await RestaurantSelect(); 
      const dish = await DishSelect();
      const review = await ReviewSelect();
      setStoreOptions(restaurant.restaurants);
      setDishOptions(dish.dishes);
      const reviews = review.reviews; // [{id:1,name:"美味しい"}, ...]
      const rawArray = reviews.map(tag => [tag.id, tag.name]);
      setTagOptions(rawArray)
      console.log(review.reviews)
    }
    Index()
  }, []);

  const handleStarClick = (type, value) => {
    setRatings((prev) => ({ ...prev, [type]: value }));
  };

  const [tagOptions, setTagOptions] = useState(["id","name"]);
  
  // state には id を保存
  const [selectedTag, setSelectedTag] = useState(""); 
  // tags も id を保存する配列にする
  
  // 選択可能タグ（まだ選んでないもの）
  const selectableTags = tagOptions.filter(([id]) => !tags.includes(id));
  
  const handleAddTag = () => {
    if (selectedTag && !tags.includes(selectedTag)) {
      setTags([...tags, selectedTag]); // id を追加
      setSelectedTag("");
    }
  };
  
  const handleRemoveTag = (removeId) => {
    setTags(tags.filter((id) => id !== removeId));
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
    <div>
      <div className="w-full">
          <Head
            title={"仕事"}
          />
      </div>
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
              {storeOptions && storeOptions.map((store) => (
                <option key={store.id} value={store.id}>{store.name}</option>
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
              onChange={(e) => setSelectedDish(e.target.value)}
            >
              <option value="" disabled>料理を選択</option>
              {dishOptions && dishOptions.map((dish) => (
                <option key={dish.id} value={dish.id}>{dish.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={style.card_group}>
          <div className={style.title_required}>写真</div>
            <div className={style.photo}>
              <input
                type="file"
                accept="image/*"
                className={style.input}
                onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                  setPreviewUrl(URL.createObjectURL(file));
                }
              }}
            />
            {previewUrl && (
              <div style={{ marginTop: '10px' }}>
                <img src={previewUrl} alt="プレビュー" style={{ maxWidth: '100%', maxHeight: '300px' }} />
              </div>
            )}
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
          {tags.map((tagId) => {
  const tagName = tagOptions.find(([id]) => id === tagId)?.[1];
  return (
    <span key={tagId} style={{background:'#ffe0b2',borderRadius:'1em',padding:'0.2em 0.8em',marginRight:'0.3em',display:'flex',alignItems:'center',fontSize:'0.95em'}}>
          {tagName}
          <button
            type="button"
            onClick={() => handleRemoveTag(tagId)}
            style={{marginLeft:'0.3em',background:'none',border:'none',cursor:'pointer',color:'#FF8A65',fontWeight:'bold'}}
          >×</button>
        </span>
      );
    })}
            <select
              value={selectedTag}
              onChange={e => setSelectedTag(Number(e.target.value))}
              style={{minWidth:'80px',flex:'1',padding:'0.4em',border:'1px solid #FF8A65',borderRadius:'0.5em'}}
            >
              <option value="">タグを選択</option>
              {selectableTags.map(([id, name]) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
            <button type="button" onClick={handleAddTag} style={{background:'#FF9F61',color:'#fff',border:'none',borderRadius:'50%',width:'2em',height:'2em',fontSize:'1.3em',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>＋</button>
          </div>
          <span className={style.card_progress}>{tags.length}/7</span>
        </div>


        <div className={style.card_group}>
          <div className={style.title}>コメント</div>
          <div className={style.comment}>
            <textarea
              className={style.comment_input}
              placeholder="コメントを入力してください"
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
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
            onClick={handleSubmit}
          >
            レビューを投稿
          </button>
        </div>
        <div className="mb-10">

        </div>
        <div className='fixed bottom-0 left-0 w-full z-50'>
          <Footer/>
        </div>
      </div>
    </div>
  );
}