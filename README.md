# Aplicativo Coronavirus - SUS

O app visa conscientizar a população sobre o coronavírus (Covid-19), trazendo informativos de diversos tópicos como os sintomas, como se prevenir, o que fazer em caso de suspeita e infecção, mapa indicando unidades de saúde próximas, etc.

# Requerimentos
- Xcode >= 8 (Disponível na App Store: https://developer.apple.com/xcode/ide/)
- Node >= 12 (https://nodejs.org/dist/latest-v12.x/)
- NPM >= 5.6.0
- Cordova 8 
- Android Studio - SDK API 28 (https://developer.android.com/studio)
- Git (https://git-scm.com/downloads)

# Instalação e configuração do ambiente
1. Instale o cordova globalmente: `npm install -g cordova@8`
2. Instale o ionic globalmente: `npm install -g ionic@5`
5. Abrir o Android Studio -> Configure -> SDK Manager:
   - SDK Android 9.0 (API 28)
   - Android SDK Tools
   - Platforms-Tools
   - Android Emulator
   
# Passos iniciais
1. Clonar o projeto para o diretório desejado
2. Trocar o diretório corrente para o novo diretório
4. Dentro do diretório, execute o comando  `npm install` 

# Executando o projeto localmente para fins de desenvolvimento
1. Execute o comando `ionic serve` 
2. Ao final, será iniciado um servidor local de desenvolvimento no endereço http://localhost:8100

# Build para Android

Utilizar o seguinte comando: 
```
ionic cordova build android --prod
```
Ao final da execução, o caminho contendo o pacote `apk` será informado.

**Atenção**: antes de gerar uma nova versão para publicação (interna ou pública), editar o arquivo `config.xml` e incrementar o valor `version` na chave `<widget>`.

# Build para Android com apk assinado

Necessário que a keystore da loja de destino esteja na raiz do projeto e a alteração do arquivo `build.json` da seguinte maneira:

```
"android": {
    "release": {
      "keystore": "NOME DO AQUIVO KEYSTORE",
      "alias": "ALIAS UTILIZADO DURANTE A CRIAÇÃO DA KEYSTORE",
      "password": "SENHA UTILIZADA DURANTE A CRIAÇÃO DA KEYSTORE",
      "storePassword": "SENHA UTILIZADA DURANTE A CRIAÇÃO DA KEYSTORE"
    }
  }
```

Utilizar o seguinte comando: 
```
ionic cordova build android --prod --release
```
Ao final da execução, o caminho contendo o pacote `apk` será informado.

**Atenção**: antes de gerar uma nova versão para publicação (interna ou pública), editar o arquivo `config.xml` e incrementar o valor `version` na chave `<widget>`.


# Build para iOS
**Atenção:** para os passos a seguir, é necessário um ambiente com o sistema operacional `Mac OSX` e a suíte de desenvolvimento `Xcode` instalado e configurado. 

Utilizar o seguinte comando: 
```
ionic cordova build ios --prod
```
Mesmo que esse comando termine em falha, abra o arquivo com extenção `.xcworkspace` em `platforms/ios` no XCode para finalizar a construção do projeto.

Ajuste as informações de assinatura e certificados para geração do IPA. Clique em Product -> Archive.

**Atenção**: antes de gerar uma nova versão para publicação (interna ou pública), editar o arquivo `config.xml` e incrementar o valor `version` na chave `<widget>`.
