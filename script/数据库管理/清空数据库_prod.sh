cur_dir=$(pwd)
cross-env NODE_ENV=prod node $cur_dir/../../tools/db/db_empty.js
