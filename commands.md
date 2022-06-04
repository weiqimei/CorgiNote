# Sequelize Scripts
"reseed": "npx dotenv sequelize db:seed:undo:all && npx dotenv sequelize db:migrate:undo:all && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all",
"reset": "npx dotenv sequelize db:drop && npx dotenv sequelize db:create && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all",
"create": "npx dotenv sequelize db:create && npx dotenv sequelize db:migrate && npx dotenv sequelize db:seed:all"

# Sequelize Commands
CREATE USER boba_app WITH CREATEDB PASSWORD 'boba123';
CREATE DATABASE boba_development WITH OWNER boba_app;

(go into db file before generate)
npx sequelize-cli model:generate --name Note --attributes title:string,content:text,notebookId:integer,tagId:integer
npx sequelize-cli model:generate --name Notebook --attributes name:string,userId:integer
npx sequelize-cli model:generate --name Tag --attributes name:string,userId:integer
npx dotenv sequelize-cli db:migrate

npx sequelize-cli seed:generate --name tagSeeders
npx sequelize-cli seed:generate --name notebookSeeders
npx sequelize-cli seed:generate --name noteSeeders
npx dotenv sequelize-cli db:seed:all


# Heroku
heroku login
git add .
git commit -m "message here"
git push heroku main
heroku run npm run sequelize db:migrate
heroku run npm run sequelize db:seed:all


# Reset database on Heroku
heroku run npm run sequelize db:seed:undo:all
heroku run npm run sequelize db:migrate:undo:all
heroku run npm run sequelize db:migrate
heroku run npm run sequelize db:seed:all


1. api route
2. thunk and reducer in store, add to index.js reducer combiner
3. home component
4. implement component in App.js src file



# Need to Fix
