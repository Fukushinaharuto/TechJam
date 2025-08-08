"use client";

import { useState } from "react";
import style from "./page.module.css";

// サンプルデータはコンポーネント外でも OK
const sampleRankedPosts = [
  { id: 1, title: "タイトルA", author: "ユーザーA" },
  { id: 2, title: "タイトルB", author: "ユーザーB" },
  { id: 3, title: "タイトルC", author: "ユーザーC" },
];

export default function Page() {
  const [activeTab, setActiveTab] = useState("feed");
  const rankedPosts = sampleRankedPosts;

  return (
    <div className={style.container}>
      <header className={style.header}></header>

      <div className={style.theme}>
        <div className={style.theme_title}>テーマ</div>
        <div className={style.theme_card}>テーマの説明</div>
      </div>

      <section className={style.posts_section}>
        <nav className={style.posts_tabs}>
          <button
            className={
              activeTab === "feed"
                ? style.tab_button_active
                : style.tab_button
            }
            onClick={() => setActiveTab("feed")}
          >
            投稿欄
          </button>
          <button
            className={
              activeTab === "ranking"
                ? style.tab_button_active
                : style.tab_button
            }
            onClick={() => setActiveTab("ranking")}
          >
            ランキング
          </button>
        </nav>

        {activeTab === "feed" && (
          <div className={style.tab_content}>
            <ul className={style.post_list}>
              {rankedPosts.map((post) => (
                <li key={post.id} className={style.post_card}>
                  <h3 className={style.post_title_center}>{post.title}</h3>
                  <div className={style.post_card__body}></div>
                  <div className={style.user_info_footer}>
                    <span className={style.user_info_footer_left}>
                      <span className={style.post_card__avatar} />
                      <span className={style.user_name}>{post.author}</span>
                    </span>
                    <footer className={style.post_card__footer}>
                      <button className={style.like_button}>
                        <span className={style.heart_icon}>❤️</span>
                      </button>
                    </footer>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "ranking" && (
          <div className={style.tab_content}>
            <ul className={`${style.post_list} ${style.ranking}`}>
              {rankedPosts.map((post, i) => (
                <li key={post.id} className={style.post_card}>
                  <div className={style.rank_badge}>{i + 1}位</div>
                  <h3 className={style.post_title_center}>{post.title}</h3>
                  <div className={style.post_card__body}></div>
                  <div className={style.user_info_footer}>
                    <span className={style.user_info_footer_left}>
                      <span className={style.post_card__avatar} />
                      <span className={style.user_name}>{post.author}</span>
                    </span>
                    <footer className={style.post_card__footer}>
                      <button className={style.like_button}>
                        <span className={style.heart_icon}>❤️</span>
                        <span className={style.like_count}>123</span>
                      </button>
                    </footer>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <button className={style.post_button}>
        <span className={style.post_button_icon}>投稿</span>
      </button>
    </div>
  );
}
