git pull
npm i
npm run build:all:lazy
npm run db:push:fix
npm run pm2:stop:fix
npm run build:all
npm run pm2:start:fix
git add --all
git commit -m 重启后同步 
git push 
echo "操作完成, 按回车关闭."
read a
