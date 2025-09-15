# User API web application

It is a basic NodeJS web application exposing REST API that creates and stores user parameters in [Redis database](https://redis.io/).

## Functionality

1. Start a web server
2. Create a user

## Installation

This application is written on NodeJS and it uses Redis database.

1. [Install NodeJS](https://nodejs.org/en/download/)

2. [Install Redis](https://redis.io/download)

3. Install application

Go to the root directory of the application (where `package.json` file located) and run:

```
npm install 
```

## Usage

1. Start a web server

From the root directory of the project run:

```
npm start
```

It will start a web server available in your browser at http://localhost:3000.

2. Create a user

Send a POST (REST protocol) request using terminal:

```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"sergkudinov","firstname":"sergei","lastname":"kudinov"}' \
  http://localhost:3000/user
```

It will output:

```
{"status":"success","msg":"OK"}
```

Another way to test your REST API is to use [Postman](https://www.postman.com/).

## Testing

From the root directory of the project, run:

```
npm test
```

## Changelog (modifications récentes)

Les changements récents effectués pour l'exercice TDD "GET user" :

- Ajout de tests unitaires pour le controller (fichier `lab/test/user.controller.js`):
  - `get a user by username` (crée un user puis appelle `get`)
  - `cannot get a user when it does not exist`
- Implémentation (ou validation) de la méthode `get` dans `lab/src/controllers/user.js` (lit Redis via `hgetall`, renvoie une erreur si l'utilisateur n'existe pas).
- Ajout de tests d'API pour les routes (fichier `lab/test/user.router.js`):
  - `GET /user/:username` pour récupérer un utilisateur existant (crée l'utilisateur puis teste la route)
  - test pour un utilisateur inexistant (attend une réponse d'erreur 404/400 selon l'implémentation)
- Ajout de la route GET `/user/:username` dans `lab/src/routes/user.js` (appelle `userController.get` et renvoie 200/404 selon le cas).
- Pour faciliter les tests, le client Redis est mocké en mémoire quand `NODE_ENV=test` (fichier `lab/src/dbClient.js`) :
  - si le paquet `redis-mock` est installé, il est utilisé automatiquement,
  - sinon un fallback en mémoire fournit `flushdb`, `exists`, `hmset`, `hgetall`, `quit` et une propriété `connected: true` pour que les tests puissent s'exécuter sans Redis réel.

Tous les tests passent localement : `npm test` (exécute Mocha sur `test/*.js`).

Remarque : si vous préférez exécuter les tests contre un vrai serveur Redis, installez et démarrez Redis puis lancez `npm test` sans forcer `NODE_ENV=test`.
