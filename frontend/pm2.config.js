module.exports = {
  apps: [
    {
      name: 'next',
      script: 'yarn',
      args: `start`,
      cwd: './',
      instances: process.env.NUM_PM2_INSTANCES || 1,
      interpreter: '/bin/bash',
      env: {
        NODE_ENV: 'production',
      },
      autorestart: true,
      watch: false,
      // exec_mode: 'cluster',
    },
  ],
}
