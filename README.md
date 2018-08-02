# Schematics React
[![Build Status](https://travis-ci.org/vitaliy-bobrov/schematics-react.svg?branch=master)](https://travis-ci.org/vitaliy-bobrov/schematics-react)
[![npm version](https://badge.fury.io/js/schematics-react.svg)](https://badge.fury.io/js/schematics-react)
[![npm](https://img.shields.io/npm/dt/schematics-react.svg)](https://github.com/vitaliy-bobrov/schematics-react)

Schematics generators for React 🎊

## Features
- 📜 Generates boilerplate
- 🎛️ Configurable
- 🛠️ Supports JavaScript & TypeScirpt
- 📦 Works with [`create-react-app`](https://github.com/facebook/create-react-app)
- 📌 Follows best pratices

## Installation
- npm:
  ```bash
  npm install -g @angular-devkit/schematics-cli
  npm install --save-dev schematics-react
  ```

- yarn:
  ```bash
  yarn global add @angular-devkit/schematics-cli
  yarn add -D schematics-react
  ```

## Usage

```bash
schematics schematics-react:<generator name> <arguments>
```

## Available generators

### Component
Creates a React component.

Example:
```bash
schematics schematics-react:component /src/components/myComponent
```

with alias:
```bash
schematics schematics-react:c /src/components/myComponent
```

#### Parameters
| Type | Name | Description | Default |
|------|:----:|------------:|--------:|
| *required* {string} | name | The name of the component. | none |
| {string} | path | The path to create the component | none |
| {string} | styleext | The file extension to be used for style files | 'css' |
| {boolean} | noSpec | Specifies if a spec file is generated | false |
| {boolean} | subfolder | Flag to indicate if a dir is created | false |
| {boolean} | propTypes | Specifies if a propTypes used | false |
| {boolean} | stateful | Specifies if a state used | false |
| {boolean} | ts | Specifies whether to use TypeScript | false |

### Functional component
Creates a React component.

Example:
```bash
schematics schematics-react:functional-component /src/components/myComponent
```

with alias:
```bash
schematics schematics-react:fc /src/components/myComponent
```

#### Parameters
| Type | Name | Description | Default |
|------|:----:|------------:|--------:|
| *required* {string} | name | The name of the component. | none |
| {string} | path | The path to create the component | none |
| {string} | styleext | The file extension to be used for style files | 'css' |
| {boolean} | noSpec | Specifies if a spec file is generated | false |
| {boolean} | subfolder | Flag to indicate if a dir is created | false |
| {boolean} | propTypes | Specifies if a propTypes used | false |
| {boolean} | ts | Specifies whether to use TypeScript | false |
