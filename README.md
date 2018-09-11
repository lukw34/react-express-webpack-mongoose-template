# react-express-webpack-mongoose-template [![Build Status](https://travis-ci.com/lukw34/react-express-webpack-template.svg?branch=develop)](https://travis-ci.com/lukw34/react-express-webpack-template)
### 1. Description
React-express-webpack-mongoose-template (rewt) is a project with basic setup for web applications, which contain web application created in React and REST API created with express.js library. The main purpose to create this project is to creae base for future projects with as latest as possible version of js packages.
In this rojeect I am using:
- React (16.4)
- mongodb
- express.js
- webpack
- unit tests (mocha, chai)

In this project I applied CI/CD with Travis. Development process based on [GitFlow](https://datasift.github.io/gitflow/IntroducingGitFlow.html). Every pull request should pass all jobs defined in travis.yml. Application is released and deployed to two environments created wit heroku:
- [rewt-staging](https://rewt-staging.herokuapp.com/) (Merge to develop)
- [rewt-production](https://rewt-production.herokuapp.com/) (Merge to master)

This project is konteneryzwany with Docker. Application run on port 8080. Every push of tag from master branch create new docker image with tag which is actual version of application, taken from package.json. If docker create image without error, it will be pushed to docker hub [lukv26/rewt](https://hub.docker.com/r/lukv26/rewt/)

### 2. Installation
```bash
npm install
```
### 3. Running (defined in package.json)
- build react application with webpack
```bash
npm run build 
```
- start webpack server with development mode
```bash
npm run dev:server
```
- run node server
```bash
npm run start:server
```
- execute unit tests
```bash
npm run test:client
npm run test:server
```
- execute eslint check
```bash
npm run eslint
```
