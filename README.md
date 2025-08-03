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
・dockerの起動
```
docker compose up -d
```
・テーブルの作成
```
docker compose exec api php artisan migrate
```
