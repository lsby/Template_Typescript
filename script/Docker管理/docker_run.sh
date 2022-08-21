source ../Lib/获取项目名称.sh
cur_dir=$(pwd)

docker run --env-file $cur_dir/../../.env/prod.env -p 80:80 $ProName
