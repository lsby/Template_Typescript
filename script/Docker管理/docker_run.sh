cur_dir=`dirname $BASH_SOURCE`
source $cur_dir/../Lib/获取项目名称.sh

docker run -d --name $ProName --env-file $cur_dir/../../.env/prod.env -p 80:80 $ProName
docker logs -f $ProName
