cur_dir=$(pwd)
cross-env NODE_ENV=fix node $cur_dir/../../tools/db/db_mk.jscur_dir=$(pwd)
cross-envcur_dir=$(pwd)
cross-env NODE_ENV=fix node $cur_dir/../../tools/db/db_push.js
cross-env
cur_dir=$(pwd) NODE_ENV=fix node $cur_dir/../../tools/db/db_pull.js
