# CS 340 - School Managment System Database

#### Authors: Mark Ser and Emmanuel Moncada

This repo is home to the front end interface of our CS 340 Databases project. It aims to replicate and simulate an admin portal for high school record keeping database.

The front end for this project uses [React](https://reactjs.org) and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The backend uses [Flask](https://flask.palletsprojects.com/en/2.1.x/) and is hosted on the Oregon State University Engineering Servers.

## Problem Statement

An old high school is still running on paper records and is looking for a 21th century solution to replace this archaic system. This high school will contain a minimum of 100 classes, where a class is an individual subject area. The database website would allow staff to add additional class offerings into the database system, e.g. additional AP/IB classes. Additionally, we propose a database driven website will help the high school staff query through thousands of records of their students, staff, and classes that are offered through a simple website. The high school staff would be able to view the website through a simple, secured, url link. This would allow them to query through a search search bar for a certain student or a certain class that they would want information. Additionally, the high school staff members would be able to get transcripts for students more easily through a simple query compared to rustling through thousands of cabinet files.

## Database Design

Our database consists of 4 entities:

-   Students
-   Staff
-   Classes
-   Locations

## ER Diagram and Schema

-   Our ER diagram can be found [here](https://drive.google.com/file/d/19j09UC1kbVsydUF7gPnftCNQnHco8gsc/view?usp=sharing)
-   Our database schema can be found [here](https://drive.google.com/file/d/1q8GQWlokviYEuj0vn-WFj1tE-fvWbvGC/view?usp=sharing)

---

## Running this app locally

If you would like to run this app yourself, first clone the repo.

From there, in the project directory run `npm install` to install the apps dependencies.
You should now be able to run `npm start`

This will run the app in the development mode.
Open [http://localhost:9191](http://localhost:9191) to view it in your browser.

The page will reload when you make changes.

## Database Configuration

```
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
export FLASK_ENV=development
python -m flask run -h 0.0.0.0 -p [select port value]
```

using pm2 [https://medium.com/idomongodb/how-to-npm-run-start-at-the-background-%EF%B8%8F-64ddda7c1f1] to keep the application alive:

```
pm2 start app.py --name flask-app --interpreter=python3
pm2 --name website start npm -- start --watch
```
