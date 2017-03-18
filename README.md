# Runners

## Installation

```sh
# Install cordava and ionic
npm install -g cordova ionic

# Install dependencies
npm install

# re install cordova plugins
ionic state restore --plugins

# Configure platforms (add android platform)
ionic platform add android
```

## Run project

```sh
ionic serve --lab
```

## Documentation generation

```sh
# Install tools for documentation generation
npm install -g jsdoc tsdoc typedoc
```

### Generate documention

```sh
npm run docs
```
