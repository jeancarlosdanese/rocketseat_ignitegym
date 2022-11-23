# Passos para o desenvolvimento de uma APP com React Native

## Instalação do Babel Plugin Module Resolve
```
npm i --save-dev babel-plugin-module-resolver
```

### Configuração do arquivo babel.config.js
``` JS
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@dtos": "./src/dtos",
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@storage": "./src/storage",
            "@utils": "./src/utils",
            "@services": "./src/services",
            "@hooks": "./src/hooks",
            "@contexts": "./src/contexts",
            "@routes": "./src/routes",
          },
        },
      ],
    ],
  };
};
```

### Configuração dio arquivo tsconfig.json
``` JSON
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": "./",
    "paths": {
      "@dtos/*": ["src/dtos/*"],
      "@assets/*": ["./src/assets/*"],
      "@components/*": ["./src/components/*"],
      "@screens/*": ["./src/screens/*"],
      "@storage/*": ["./src/storage/*"],
      "@utils/*": ["./src/utils/*"],
      "@services/*": ["./src/services/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@contexts/*": ["./src/contexts/*"],
      "@routes/*": ["./src/routes/*"]
    }
  }
}
```

## Incluir as Google Fonts

### No React native CLI

https://dev.to/abhidatta0/add-custom-fonts-google-fonts-to-react-native-070-1773

1. Criar uma pasta para as fonts, ex; ./assets/fonts. Nesta pasta são adicionadas as fontes necessárias.

2. Criar o arquivo react-native.config.js na raiz da aplicação e adicionar o seguinte conteúdo:

``` JS
module.exports = {
    project: {
        ios:{},
        android:{}
    },
    assets:['./assets/fonts/'],
}
```

3. Executar o comando:
``` bash
npx react-native-asset
```

4. Reiniciar a aplicação

5. Utilizar conforme exemplo:

``` JS
const styles = StyleSheet.create({
  title:{
    fontFamily: 'Montserrat-Regular',
  }
})
```

npm install native-base@0.70.5 react-native-svg@12.1.1 react-native-safe-area-context@3.3.2

## Stack Navigator
### Instalação das dependências

#### React Navigation
https://reactnavigation.org/docs/getting-started/

```
npm install @react-navigation/native
```

Installing dependencies into an Expo managed project
```
npx expo install react-native-screens react-native-safe-area-context
```

#### Installing the native stack navigator library
https://reactnavigation.org/docs/hello-react-navigation
```
npm install @react-navigation/native-stack
```

## Instalação Tab Navigation

```
npm install @react-navigation/bottom-tabs
```