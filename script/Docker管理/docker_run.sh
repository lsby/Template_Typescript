cur_dir=$(pwd)
source $cur_dir/../Lib/获取项目名称.sh

docker run --env-file $cur_dir/../../.env/prod.env -p 80:80 $ProName
