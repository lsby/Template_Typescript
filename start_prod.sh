git pull
npm i
npm run build:all:lazy
npm run db:push:prod
npm run pm2:stop:prod
npm run build:all:lazy
npm run pm2:start:prod
echo "操作完成, 按回车关闭."
read a
