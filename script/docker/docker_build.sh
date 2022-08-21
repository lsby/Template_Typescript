source ../Lib/获取项目名称.sh
cur_dir=$(pwd)

docker build -t $ProName $cur_dir/../..
