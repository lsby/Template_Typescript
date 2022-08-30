cur_dir=`dirname $0`
ProName='';
re="\"(name)\": \"([^\"]*)\"";
while read -r l; do
    if [[ $l =~ $re ]]; then
        value="${BASH_REMATCH[2]}";
        ProName="$value";
    fi
done < $cur_dir/../../package.json;
