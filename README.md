# Runners
[Journal de travail](https://docs.google.com/spreadsheets/d/1hgqeCvX4L5ReS7LiYED0_Vif7j_CJ26gazMo-QjN6ss/edit?usp=sharing)
## Requis

* nodejs: 6.10.1 LTS 

## Installation

```sh
# Install cordava and ionic
npm i -g cordova ionic

# Install dependencies
npm i

# Copy config
cp src/runners.config.ts-example src/runners.config.ts
# Configure your api
vim src/runners.config.ts

# Build default folder
ionic serve

# re install cordova plugins
ionic state restore --plugins

# Configure platforms (add android platform)
ionic platform add android
```

## Run project

```sh
ionic serve --lab
```

You should have dev environment on [http://127.0.0.1:8100/ionic-lab](http://127.0.0.1:8100/ionic-lab)

## Build solutions

First build ressources
```
ionic cordova resources
```

Then build 
```
ionic cordova build android
# or 
ionic cordova build ios
```

Look [official documentation](https://ionicframework.com/docs/cli/cordova/build/) for troubleshooting

## Documentation

### Installation

```sh
# Install tools for documentation generation
npm install -g jsdoc tsdoc typedoc
```

### Generation

```sh
npm run docs
```
