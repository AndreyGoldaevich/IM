const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  },
  // css: {
  //   loaderOptions: {
  //     stylus: {
  //       use: [require('nib')()],
  //       import: ['~nib/lib/nib/index.styl']
  //     }
  //   }
  // },
});
// module.exports = {
//   publicPath: '/vue-app/'
// }
