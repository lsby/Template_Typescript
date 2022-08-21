cur_dir=$(pwd)
cross-env NODE_ENV=dev node $cur_dir/../../tools/db/db_pull.js
