cur_dir=$(pwd)
source $cur_dir/../Lib/获取项目名称.sh

pm2 del "fix_cmd_noAutoRestart_$ProName"
cross-env NODE_ENV=fix DEBUG=App:*,Package:* DEBUG_HIDE_DATE=true pm2 start $cur_dir/../../dist/src/Cmd.js --no-autorestart --output $cur_dir/../../logs/out.txt --error $cur_dir/../../logs/error.txt --merge-logs --log-date-format="YYYY-MM-DD HH:mm:ss Z" --name "fix_cmd_noAutoRestart_$ProName"
echo "操作完成, 按回车关闭."
read a
