source ../Lib/获取项目名称.sh

docker run --env-file ../../.env/prod.env -p 80:80 $ProName
