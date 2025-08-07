"use client";

import style from "./page.module.css";
export default function Page() {

    return (
        <div className={style.container}>
            <header className={style.header}></header>

            <div className={style.theme}>
                <div className={style.theme_title}>
                    テーマ
                </div>

                <div className={style.theme_card}>
                    テーマの説明
                </div>           
            </div>

            <section className={style.posts_section}>
                <nav className={style.posts_tabs}>
                    <button
                        className={`${style.tab_button} ${activeTab === 'feed' ? style.active : ''}`}
                        onClick={() => setActiveTab('feed')}
                    >
                        投稿欄
                    </button>
                    <button
                        className={`${style.tab_button} ${activeTab === 'ranking' ? style.active : ''}`}
                        onClick={() => setActiveTab('ranking')}
                    >
                        ランキング
                    </button>
                </nav>

                <div className={`${style.tab_content} ${activeTab === 'feed' ? style.active : ''}`} id="tab-feed">
                    <div id="tab-feed" className={style.tab_button_active}>
                        <ul className={style.post_list}>
                            <li className={style.post_card}>
                                <header className={style.post_card__header}>
                                    
                                    <div className={style.user_info}>
                                        <span className={style.user_role}>称号</span>
                                        <span className={style.user_name}>ユーザー名</span>
                                    </div>
                                    <h3 className={style.post_title}>タイトル</h3>
                                </header>
                                <div className={style.post_card__body}>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};