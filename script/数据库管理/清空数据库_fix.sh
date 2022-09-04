cur_dir=`dirname $BASH_SOURCE`
cross-env NODE_ENV=fix node $cur_dir/../../tools/db/db_empty.js
echo "操作完成, 按回车关闭."
read a
read a
