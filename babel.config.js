module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          "app/": "./app"
        }
      }
    ],
    [
      'import',
      {
        libraryName: '@ant-design/react-native'
      }
    ],
    [
      '@babel/plugin-transform-flow-strip-types'
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true
      }
    ]
  ]
}
