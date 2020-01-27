<h1 align="center">Welcome to nodejs-authentication 👋</h1>

![version](https://img.shields.io/badge/version--0.2.0-blue.svg)
[![Build Status](https://travis-ci.com/baturtulek/nodejs-authentication.svg?branch=master)](https://travis-ci.com/baturtulek/nodejs-authentication)
[![dependencies Status](https://david-dm.org/baturtulek/nodejs-authentication/status.svg)](https://david-dm.org/baturtulek/nodejs-authentication)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


> nodejs-authentication is Nodejs based authentication mechanism. Users can register, login, logout, and display user profiles. The security mechanism is implemented with access tokens. Redis is responsible for holding these access tokens. When the user logged in to the system successfully, the application generates a secure access token and write to Redis with the user's data. After that application verifies the user's identity by using Redis. This increases application performance significantly.

![diagram](https://user-images.githubusercontent.com/36362640/73137541-5a110f80-406a-11ea-81ca-7a8ad5fad6f5.png)

<br/>

## Install
First of all, you have to install and start Redis Server and MongoDB on your computer. You can also use MongoDB Atlas which is a MongoDB cloud service instead of installing MongoDB to your computer.
* Redis : https://redis.io/download
* MongoDB : https://www.mongodb.com/download-center/community

Then install application dependencies using the following command

```sh
npm install
```
## Usage

* Application can be directly run using the following command

```sh
npm run development
```

* Application can be run in the Docker container using the following command. Type the command in the application root folder to the terminal. Of course docker daemon must be running. This command creates and runs three containers. One for authentication application, one for Redis and one for MongoDB. These containers communicate with each other. You can access the authentication application using port 2000 from your host operating system. Moreover, you can connect Redis and MongoDB containers to manage and display data from port 6379 and 27017 respectively.

```sh
docker-compose up
```

* Also, the application can be run on the Serverless Architecture. Upload project to AWS Lambda. Then it is ready to handle requests. However, you have to configure Redis and MongoDB using other AWS Services. Assign the Lambda handler as shown below.

```sh
src/server.handler
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