# Quizzyy

Complete Quiz Application, which allows users to create, attend quizzes, and share their results.

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`
9. Go to `http://localhost:8080/login/1` to login as a user 1

## Screenshots
!["Home page"](https://github.com/glebshkut/midterm/blob/master/docs/home-page.png?raw=true)

!["Quiz Creation"](https://github.com/glebshkut/midterm/blob/master/docs/quiz-creation.png?raw=true)

!["Quiz Questions Adding"](https://github.com/glebshkut/midterm/blob/master/docs/quiz-questions.png?raw=true)

!["Quizzes List"](https://github.com/glebshkut/midterm/blob/master/docs/quizzes-list.png?raw=true)

!["Quiz"](https://github.com/glebshkut/midterm/blob/master/docs/quiz.png?raw=true)

!["Quiz Result"](https://github.com/glebshkut/midterm/blob/master/docs/result.png?raw=true)


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
