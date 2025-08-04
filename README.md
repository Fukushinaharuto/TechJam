# 環境構築
・ ターミナルでgit cloneを行う。
```
git clone　https://github.com/Fukushinaharuto/TechJam.git
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
・.envの作成
```
docker compose exec api cp .env.example .env
```
・APP_KEYの作成
```
docker compose exec api php artisan key:generate
```
・.env.localの作成
```
docker compose exec app bash -c "echo 'NEXT_PUBLIC_API_URL=http://0.0.0.0:8006/api' >> .env.local"
```
・テーブルの作成
```
docker compose exec api php artisan migrate
```
