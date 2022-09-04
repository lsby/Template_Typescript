cur_dir=`dirname $BASH_SOURCE`

git pull
cross-env NODE_ENV=prod node $cur_dir/../../tools/db/db_mk.js
cross-env NODE_ENV=prod node $cur_dir/../../tools/db/db_push.js
npm run build:all:lazy
bash $cur_dir/./启动服务器_prod.sh
