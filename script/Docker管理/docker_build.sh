cur_dir=`dirname $0`
source $cur_dir/../Lib/获取项目名称.sh

docker build -t $ProName $cur_dir/../..
