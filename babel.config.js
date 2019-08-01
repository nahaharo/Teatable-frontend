module.exports = {
  presets: [
    '@vue/app',
    ["@babel/preset-env", { "targets": { "browsers": ["last 2 versions", ">= 5% in KR"] } }]
  ]
}
