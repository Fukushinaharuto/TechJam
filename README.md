# 環境構築
・ ターミナルでgit cloneを行う。
```
git clone git@github.com:Fukushinaharuto/TechJam.git
```
・フォルダの移動
```
cd TechJam
```
・dockerの作成
```
docker compose build --no-cache
```
・依存パッケージのインストール
・dockerの起動
```
docker compose up -d
```
・.envとAPP_KEYの作成
```
docker compose exec api bash
cp .env.example .env
php artisan key:generate
exit
```
・テーブルの作成
```
docker compose exec api php artisan migrate
```
