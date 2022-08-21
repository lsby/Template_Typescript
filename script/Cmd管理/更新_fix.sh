cur_dir=$(pwd)

git pull
cross-env NODE_ENV=fix node $cur_dir/../../tools/db/db_push.js
npm run build:all
bash $cur_dir/./启动Cmd_fix.sh
