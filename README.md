# subject-picker
Subject picker for night students from ESPM-TECH

## Setup
```
npm install
npm start
```
If using VS Code, you can start the application in the debug tab.
If you like tests, run them!
```
npm test
```
Database setup is still complicated, you can do it through environment variables `DB_HOST`, `DB_USER` and `DB_PASSWORD` but we still don't have migration support. (See Todo list)

## Structure
Application has three main pages:
- Home page: displays welcome messages, has field meant to fill with student ID sending to Choose page.
- Choose page: has subject table, student can update chosen subjects and save them. Should contain subject info, docs and validation.
- Thanks page: Sends the student off with a smile.


## Todo
- Add Travis CI
- Setup Azure deploy
- Add DI support and restructure application
- Replace MySQL for Mongo+Mongoose
- Refactor front-end to a React application