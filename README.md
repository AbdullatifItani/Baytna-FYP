<h1 align="center">🏠 Baytna</ha>

<h3 align="center">The leading real estate marketplace. Search thousands of for-sale homes and connect with local professional real estate agents.</h3>

<p align="center"><a  href="https://baytna-app.herokuapp.com">Baytna Live Demo</a></p>

### Splash Page

<img width="909" alt="Screen Shot 2022-06-15 at 7 57 20 AM" src>

### Google Map Search and filter

<img width="904" alt="Screen Shot 2024-12-11 at 7 58 25 PM" src>

### Browse Properties and Schedule Appointments

<img width="901" alt="Screen Shot 2022-12-11 at 7 59 13 PM" src>

### Manage Appointments

<img width="899" alt="Screen Shot 2022-12-11 at 8 00 27 PM" src>

### Search and Review Agents

<img width="898" alt="Screen Shot 2022-12-11 at 8 01 03 PM" src>

<img width="899" alt="Screen Shot 2022-12-11 at 8 01 15 PM" src>

## Baytna at a Glance

Baytna is a full stack application that allows users to search and filter for properties. A user does not need to log in to use the search property and agent feature, but if they choose to setup an account with Baytna, they can also schedule appointment to tour the properties, and review their experience with the agent.

## Getting Started

1. Clone the repository

```
git clone https://github.com/AbdullatifItani/Baytna-FYP.git

```

2. Install dependencies

- In root folder, install Python server.

```
pipenv install
```

- Navigate to React-app folder, install React

```
cd React-app
npm install
```

3. Setup your PostgreSQL user, password and database

```
psql -U 'user'
CREATE USER baytna_app WITH PASSWORD 'password';
CREATE DATABASE baytna_app WITH OWNER baytna_app;

```

4. create a .env file in root folder, based on the .env.example with proper settings for your development environment

5. Migrate and seed your database in root folder

```
pipenv run flask db upgrade
pipenv run flask seed all

```

6. Start the server

- In root folder

```
pipenv run flask run
```

- Navigate to React-app folder

```
export NODE_OPTIONS=--openssl-legacy-provider
npm start
```

7. Have fun!

## Application Architecture

Baytna is built on React and Redux frontend with Python Flask backend, using PostgresSQL as a database.

### Technologies Used

- [Docker](https://www.docker.com/)
- [React.js](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [Javascript](https://www.javascript.com/)
- [Google Map API](https://developers.google.com/maps)
- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/en/2.1.x/)
- [Flask SQL Alchmeny](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
- [Flask Alembic](https://flask-alembic.readthedocs.io/en/stable/)
- [PostgresSQL](https://www.postgresql.org/)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)

## Conclusion and Next Steps

Baytna is not only a communication platform for regular users, also for agents. The next step for Baytna is to implement the agent interface, porfolio page, manage appointments, and communicate with client users through chat channels(web socket).

## Conatact

- Abdullatif Itani - Abdullah Itani - Mohammad Salam <a href="https://www.linkedin.com">Linkedin</a> | <a href="https://github.com">Github</a>
