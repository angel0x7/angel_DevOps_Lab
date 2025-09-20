# MySchool DevOps Labs


# Lab

## Objectives

1. Use prepared User API application and run tests
2. Using test-driven development (TDD) create GET user functionality

## Before starting

1. Install Redis database

Installation instructions:

- **Windows:** https://redis.com/ebook/appendix-a/a-3-installing-on-windows/a-3-2-installing-redis-on-window/
- **MacOS:** `brew install redis` or https://redis.io/topics/quickstart
- **Linux or MacOS:** https://redis.io/topics/quickstart

After installation, start Redis server:

- **Windows:** double click on `redis-server.exe` file (keep it open)
- **MacOS and Linux:** `redis-server`

Test if the Redis server is running:

- **Windows:** double click on `redis-cli.exe` and run the `ping` command inside the REPL
- **MacOS and Linux:** run in a new terminal window `redis-cli ping` (should answer with "PONG")

2. Install an **IDE or a text editor**, for example, [Atom](https://atom.io/) or [VS Code](https://code.visualstudio.com/)

3. Install **NodeJS**: https://nodejs.org/


## 1. Use prepared User API application and run tests

Go to [`lab`](lab) folder and explore the project:

```
cd lab
```

Install application:

```
npm install
```

Run tests:

```
npm test
```

Start application:

```
npm start
```

## 2. Using test-driven development (TDD) with GET user functionality

A REST API GET `user` method that retrieves user information from the database.

1)  `get` user controller:   
  -  **2 unit tests** (in the file `lab/test/user.controller.js`):
    - get a user by username
    - cannot get a user when it does not exist
  -  **the controller method** (in the file `lab/src/controllers/user.js`)

2)  GET user REST API method:   
  -  **2 API tests** (in the file `lab/test/user.router.js`):
    - successfully get user
    - cannot get a user when it does not exist
  -  **GET user route** (in the file `lab/src/routes/user.js`)

--
# Lab2
A simple Node.js web server built with Express for learning DevOps best practices.  
The server responds with **"Hello world!"** on the home page.

## Features

- Basic Node.js script
- Express.js web server
- Git/GitHub integration
- Project documentation with README and CHANGELOG


