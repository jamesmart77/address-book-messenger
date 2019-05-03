# [Address-Book-Messenger](http://sched-aroo.herokuapp.com/)

## Description
People can create accounts to share contact info and receive emails from group admin. User accounts can be private or public to restrict contact info to others in the group. Private accounts contact info is only visible to group admins and public accounts are visible to all group users. 


## Tech Stack
- Postgres
- Node.js
- Express
- React
- Redux
- Sequelize
- Material-UI
- JWT for Authentication


## Initial Setup
 - Add a `.env` file with the tokenSecret value of your choosing. This is needed for the signing of the JWT
 - Run `createdb scheduler-dev` in the terminal. You must have Postgres installed to perform this. This will create the local database
 - Modify the ORM/config file accordingly with your credentials to connect to your local db
 - Run `sequelize db:migrate` in the terminal before launching the application. This will perform all the migrations to setup the database
 - `Yarn` && cd/client `Yarn` - node module installs for server and client dependencies
 - `Yarn dev` to launch the app locally

## Other Notes
- Shout out to jmuturi for posting a tutorial on wiring up Node, Postgres, and Express with a Sequelize ORM. [Checkout the tutorial](https://scotch.io/tutorials/getting-started-with-node-express-and-postgres-using-sequelize). For any questions referring to the setup of Sequelize, refer to the article.
- [Many-to-Many guide for Sequelize](https://medium.com/@THEozmic/how-to-create-many-to-many-relationship-using-sequelize-orm-postgres-on-express-677753a3edb5)
