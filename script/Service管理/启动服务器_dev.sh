source ../Lib/获取项目名称.sh
cur_dir=$(pwd)

pm2 del "dev_service_$ProName"
cross-env NODE_ENV=dev DEBUG=App:*,Package:* DEBUG_HIDE_DATE=true pm2 start $cur_dir/../../dist/src/Service.js --output $cur_dir/../../logs/out.txt --error $cur_dir/../../logs/error.txt --merge-logs --log-date-format="YYYY-MM-DD HH:mm:ss Z" --name "dev_service_$ProName"
echo "操作完成, 按回车关闭."
read a
