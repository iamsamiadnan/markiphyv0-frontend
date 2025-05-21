module.exports = {
    apps: [
        {
            name: 'markiphyv0-frontend-staging',
            cwd: '/usr/local/src/frontends/markiphyv0-frontend',
            script: 'node_modules/next/dist/bin/next',
            exec_mode: 'cluster',
            args: 'start',
            instances: '1',
            watch: false,
            autorestart: true,
            max_memory_restart: '800M',
            env: {
                NODE_ENV: 'production',
                PORT: 7000,
            },
        },
    ],
};
