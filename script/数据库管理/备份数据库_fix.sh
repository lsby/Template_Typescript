cur_dir=$(pwd)
cross-env NODE_ENV=fix node $cur_dir/../../tools/db/db_backup.js
