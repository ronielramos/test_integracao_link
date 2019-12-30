module.exports = {
  apps: [{
    name: 'app',
    script: './dist/app.js',
    instances: 1,
    exec_mode: 'cluster',
    watch: true,
  }]
}
