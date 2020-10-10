module.exports = {
  apps : [{
    name: 'Weather app API',
    script: 'dist/main.js',
    autorestart: true,
    exec_mode: 'cluster_mode',
    instances: 'max',
    watch: false,
  }],
};
