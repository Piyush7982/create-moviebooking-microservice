
# Express-JS Boiler-Plate-Template

A brief description of what this Template named `node-server-boilerPlate`. Main source code resides inside `node-server-boilerPlate/src`


## /src contains

- `config`: contains all configs files such as `http-status-codes` ,`.env` etc. 
- `controller`: Here controllers of your project are declared .Controllers are last middleware which connects directly to `services` folder where all business logic is written.
- `middleware`:Middlewares are used to perform validation/authentication of get/post request from client to server and vice versa
- `migrations`:This folder is created by our ORM `sequelize` ,after installling sequelize you need to install `sequelize-cli` to source folder which is kind of like a shortcut to use and control ORM.
    Here database level contraint is given which make changes directly to database

- `models`:Here we provide the javascript level database constraint. 
- `repositories`Your `CRUD` api logic and  interaction of database by express is done here.  Here we can write how client requests are going to interact with database.
- `routes`:Here we define the routes of our project.For exaomle this tempelate contains `/ai/v1` route which represents version1 routes.
- `seeders`: Here test data is written.
- `services`:Here main business logic resides.
- `util`: Here we declare utility functions if needed.
- `index.js`:This is the main index.js file where actual derver code is written.


## Deployment

To deploy this tempelate fork this repository inside text editor of your choice.

1)npm init inside terminal ,provided the path where repository is saved.

```
  npm init 
``` 
after this `node_modules` folder will appear.

2)Install `express.js` .
```
  npm i express
```
3)Install `http-status-codes` .
```
  npm i http-status-codes
```
4)Install `sequelize` inside src folder .
```
  npm install  sequelize
```
5)Install `sequelize-cli` inside src folder .
```
  npm install sequelize-cli
```
Now we are good to go.
Go inside `config/config.js` there enter your database
username and password, name of database to create a brand new database. 

6) To create database inside actual data base
```
 npx sequelize migration:generate 
```
7) To create table inside actual data base
```
 npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

