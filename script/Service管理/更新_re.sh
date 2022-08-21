cur_dir=$(pwd)

git pull
cross-env NODE_ENV=re node $cur_dir/../../tools/db/db_push.js
npm run build:all
bash $cur_dir/./启动服务器_re.sh
