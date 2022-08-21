cross-env NODE_ENV=dev DEBUG=App:*,Package:* DEBUG_HIDE_DATE=true pm2 start ../dist/src/Service.js --output ../logs/out.txt --error ../logs/error.txt --merge-logs --log-date-format="YYYY-MM-DD HH:mm:ss Z"
echo "操作完成, 按回车关闭."
read a
