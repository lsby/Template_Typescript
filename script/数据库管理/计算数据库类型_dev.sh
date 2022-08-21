cur_dir=$(pwd)
cross-env NODE_ENV=dev node $cur_dir/../../tools/db/db_pull.js
echo "操作完成, 按回车关闭."
read a
