echo "安装全局依赖..."
npm i -g prettier
npm i -g pm2
pm2 install pm2-logrotate
pm2 set pm2-logrotate:TZ Asia/Shanghai
npm i -g cross-env
echo "创建分支..."
git branch dev
git branch re
git branch prod
git branch fix
git checkout dev
echo "操作完成, 按回车关闭."
read a
