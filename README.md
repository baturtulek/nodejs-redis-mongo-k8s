<h1 align="center">Welcome to nodejs-authentication 👋</h1>

![version](https://img.shields.io/badge/version--0.2.0-blue.svg)
[![Build Status](https://travis-ci.com/baturtulek/nodejs-authentication.svg?branch=master)](https://travis-ci.com/baturtulek/nodejs-authentication)
[![dependencies Status](https://david-dm.org/baturtulek/nodejs-authentication/status.svg)](https://david-dm.org/baturtulek/nodejs-authentication)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
<br/><br/>
> nodejs-authentication is Nodejs based authentication mechanism. Users can register, login, logout, and display user profiles. The security mechanism is implemented with access tokens. Redis is responsible for holding these access tokens. When the user logged in to the system successfully, the application generates a secure access token and write to Redis with the user's data. After that application verifies the user's identity by using Redis. This increases application performance significantly.

<br/>

![diagram](https://user-images.githubusercontent.com/36362640/73137541-5a110f80-406a-11ea-81ca-7a8ad5fad6f5.png)

<br/><br/>

## Install
First of all, you have to install and start Redis Server and MongoDB on your computer. You can also use MongoDB Atlas which is a MongoDB cloud service instead of installing MongoDB to your computer.
* Redis : https://redis.io/download
* MongoDB : https://www.mongodb.com/download-center/community

Then install application dependencies using the following command

```sh
npm install
```

## Usage

```sh
npm run development
```

## Run tests

```sh
npm test
```

## Author

👤 **Ahmet Batur Tülek**

* Website: www.baturtulek.com
* Github: [@baturtulek](https://github.com/baturtulek)
* LinkedIn: [@batur-tulek](https://linkedin.com/in/batur-tulek)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_