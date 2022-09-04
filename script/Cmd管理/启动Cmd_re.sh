cur_dir=`dirname $BASH_SOURCE`
source $cur_dir/../Lib/获取项目名称.sh

pm2 del "re_cmd_$ProName"
cross-env NODE_ENV=re DEBUG=App:*,Package:* DEBUG_HIDE_DATE=true DEBUG_DEPTH=999 pm2 start $cur_dir/../../dist/src/Cmd.js --output $cur_dir/../../logs/out.txt --error $cur_dir/../../logs/error.txt --merge-logs --log-date-format="YYYY-MM-DD HH:mm:ss Z" --name "re_cmd_$ProName"
echo "操作完成, 按回车关闭."
read a
