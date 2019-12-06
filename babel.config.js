module.exports = {
  env: {
    production: {
      plugins: ['transform-remove-console']
    }
  },
  plugins: [
    ['module-resolver', {
      alias: {
        assets: './app/assets',
        helpers: './app/helpers',
        hooks: './app/view/hooks',
        store: './app/store',
        view: './app/view' ,
        routes: './app/routes',
       
      },
      root: ['./app']
    }]    
  ],
  presets: ['module:metro-react-native-babel-preset']
}