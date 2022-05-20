module.exports = {
    apps: [
        {
            name: 're_ql_service_ts',
            script: './dist/src/index.js',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
            out_file: './logs/out.log',
            error_file: './logs/error.log',
            merge_logs: true,
            env: {
                NODE_ENV: 'release',
            },
        },
    ],
}
