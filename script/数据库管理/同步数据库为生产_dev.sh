cur_dir=`dirname $0`
cross-env NODE_ENV=dev node $cur_dir/../../tools/db/db_sync.js
echo "操作完成, 按回车关闭."
read a
read a
