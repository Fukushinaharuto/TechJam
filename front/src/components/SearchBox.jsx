"use client";
import style from "./SearchBox.module.css"
import { useState } from "react";  
import Image from "next/image";

export function SearchBox({ setSearchOpen }) { 

    const [distance, setDistance] = useState("");          
    const [cost, setCost] = useState("");  
    const [openHours, setOpenHours] = useState("");            
    const [selected, setSelected] = useState([]);
    const [genre,setGenre] = useState(""); 
    const allTags = ["学割","3時間〜","テイクアウト","カード可","食べ放題","飲み放題"];
    const [top, setTop] = useState(150);


    function handleMouseDown(e) {
        e.preventDefault();
        const startY = e.clientY;
        const startTop = top;
    
        function onMouseMove(e) {
            const newTop = startTop + (e.clientY - startY);
            setTop(Math.max(newTop, 0));
        }
    
        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }
    
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    }

    const handleTouchStart = (e) => {
        e.preventDefault();
        const startY = e.touches[0].clientY;
        const startTop = top;

        const onTouchMove = (e) => {
            const newTop = startTop + (e.touches[0].clientY - startY);
            setTop(Math.max(newTop, 0));
        };

        const onTouchEnd = () => {
            document.removeEventListener("touchmove", onTouchMove);
            document.removeEventListener("touchend", onTouchEnd);
        };

        document.addEventListener("touchmove", onTouchMove, { passive: false });
        document.addEventListener("touchend", onTouchEnd);
    };
    

    const toggle = (tag) =>{
        setSelected((prev) =>
            prev.includes(tag) 
                ? prev.filter((t)=> t !==tag)
                :[...prev,tag]
            );
        };

    return(
        <div className={style.search_panel} style={{ top: `${top}px` }}>
            <div 
                className="flex justify-center items-cent bg-white"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                <div>
                    <div
                        className="flex justify-center items-center py-4 relative"
                    >
                        <Image
                            src={`/line.svg`}
                            alt="検索バーアイコン"
                            width={100}
                            height={100}
                        />
                    </div>
                    <h2 className="flex justify-center text-3xl mb-4">検索条件</h2>
                </div>
                <button 
                    className="p-2 absolute top-0 right-0"
                    onClick={() => setSearchOpen(false)}
                >
                    <Image
                        src={`/serchClose.svg`}
                        alt="検索ボックを閉じるアイコン"
                        width={50}
                        height={50}
                    />
                </button>
            </div>
            <div className={style.box}>
                <div className={style.distance}>
                    <label className={style.title}>距離</label>
                    <div className={style.distance_scroll}>
                        <select id="distance" className={style.distanceform} 
                        value={distance}
                        onChange={e => setDistance(e.target.value)}>

                            <option value="100m">100m</option>
                            <option value="200m">200m</option>
                            <option value="500m">500m</option>
                            <option value="1km">1km</option>
                            <option value="2km">2km</option>
                        </select>
                    </div>
                </div>

                <div className={style.genre}>
                    <label className={style.title}>ジャンル</label>
                    <div className={style.genrescroll}>
                        <input
                            type="text"
                            className={style.genreform}  
                            placeholder="ラーメン、焼肉"
                            value={genre}
                            onChange={e => setGenre(e.target.value)}
                        />
                    </div>
                </div>

                <div className={style.cost}>
                    <label className={style.title}>予算</label>
                    <div className={style.cost_scroll}>
                        <select id="cost" className={style.costform}
                            value={cost}
                            onChange={e => setCost(e.target.value)}>

                            <option value="0円〜1000円">0円〜1000円</option>
                            <option value="1000円〜1500円">1000円〜1500円</option>
                            <option value="1500円〜2000円">1500円〜2000円</option>
                            <option value="2000円〜2500円">2000円〜2500円</option>
                            <option value="2500円〜3000円">2500円〜3000円</option>
                            <option value="2500円〜3000円">2500円〜3000円</option>
                            <option value="3000円〜3500円">3000円〜3500円</option>
                            <option value="3500円〜4000円">3500円〜4000円</option>
                            <option value="4000円〜4500円">4000円〜4500円</option>
                            <option value="4500円〜5000円">4500円〜5000円</option>
                            <option value="5000円〜">5000円〜</option>
                        </select>
                    </div>
                </div>

                <div className={style.open_hours}>
                    <label className={style.title}>営業時間</label>
                    <div className={style.open_hours_scroll}>
                        <select id="cost" className={style.open_hoursform}
                        value={openHours}
                        onChange={e => setOpenHours(e.target.value)}>

                            <option value="">指定なし</option>
                            <option value="24時間営業">24時間営業</option>
                            <option value="朝(7:00〜11:00)">朝(7:00〜11:00)</option>
                            <option value="昼(11:00〜15:00)">昼(11:00〜15:00)</option>
                            <option value="夕(17:00〜21:00)">夕(17:00〜21:00)</option>
                            <option value="夜（21:00〜翌1:00）">夜（21:00〜翌1:00）</option>
                        </select>
                    </div>
                </div>

                <div className={style.checkboxListWrapper}>
                    <label className={style.title}>こだわり</label>
                    <div className={style.checkboxList}>
                        {allTags.map((tag,i) => (
                        <label key={`commit-${i}`}  className={style.checkboxItem}>
                            <input
                            type="checkbox"
                            value={tag}
                            checked={selected.includes(tag)}
                            onChange={() => toggle(tag)}
                            />
                            <span className={style.checkboxLabel}>{tag}</span>
                        </label>
                        ))}
                    </div>
                    </div>

                    <div className={style.checkboxListWrapper}>
                    <label className={style.title}>空間・設備</label>
                    <div className={style.checkboxList}>
                        {["ソファ席", "電源あり", "座敷"].map((tag,i) => (
                        <label key={`equip-${i}`} className={style.checkboxItem}>
                            <input
                            type="checkbox"
                            value={tag}
                            checked={selected.includes(tag)}
                            onChange={() => toggle(tag)}
                            />
                            <span className={style.checkboxLabel}>{tag}</span>
                        </label>
                        ))}
                    </div>
                </div>

                <div className={style.title}>現在選択している条件</div>

                {(
                distance || cost || openHours || genre ||selected.length > 0
                ) && (
                <div className={style.selectedWrapper}>
                    {distance && (
                    <span key="sel-distance" className={style.selectedTag}>
                        {distance}、
                    </span>
                    )}
                    {cost && (
                    <span key="sel-cost" className={style.selectedTag}>
                        {cost}、
                    </span>
                    )}
                    {openHours && (
                    <span key="sel-openHours" className={style.selectedTag}>
                        {openHours}、
                    </span>
                    )}
                    {genre && (
                    <span key="sel-genre" className={style.selectedTag}>
                        {genre}、
                    </span>
                    )}
                    {selected.map(tag => (
                    <span key={tag} className={style.selectedTag}>
                        {tag}、
                    </span>
                    ))}
                </div>
                
                )}
            </div>
        </div>
    )
}