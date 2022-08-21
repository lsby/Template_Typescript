source ../Lib/获取项目名称.sh

pm2 del "prod_cmd_$ProName"
cross-env NODE_ENV=prod DEBUG=App:*,Package:* DEBUG_HIDE_DATE=true pm2 start ../../dist/src/Cmd.js --output ../../logs/out.txt --error ../../logs/error.txt --merge-logs --log-date-format="YYYY-MM-DD HH:mm:ss Z" --name "prod_cmd_$ProName"
echo "操作完成, 按回车关闭."
read a
