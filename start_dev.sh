git pull
npm i
npm run build:all:lazy
npm run db:push:dev
npm run pm2:stop:dev
npm run build:all
npm run pm2:start:dev
git add --all
git commit -m 重启后同步 
git push 
echo "操作完成, 按回车关闭."
read a
