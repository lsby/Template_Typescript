cur_dir=`dirname $0`
cross-env NODE_ENV=fix node $cur_dir/../../tools/db/db_backup.js
echo "操作完成, 按回车关闭."
read a
