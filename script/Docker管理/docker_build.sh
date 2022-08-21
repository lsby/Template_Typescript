cur_dir=$(pwd)
source $cur_dir/../Lib/获取项目名称.sh

docker build -t $ProName $cur_dir/../..
