# my-workouts

My Personal Workouts: Written in React

## Introduction

A full stack CRUD (Create, Read, Update, Delete) application built with React and Node.js for users to keep track of workout routines

## Technologies Used

- React.js 16
- Node.js 10
- Express.js 4
- Webpack 4
- Bootstrap 4
- CSS 3
- HTML 5
- npm 6
- Postgresql 10
- AWS EC2

## Live Demo

Try the application live at [my portfolio website](https://my-workouts.kierantallingerdevwork.com)

## Features

- User can create new exercises 
- User can view all exercises created in a list and update them
- User can create new routines
- User can view all routines created in a list and update them
- User can add exercises with unique sets and reps values to routines 
- User can view all exercises added to a selected routine and update them
- User can delete an exercise from the exercise list
- User can delete a routine from the routines list
- User can delete any exercise from a selected routine

## Preview

![My Workouts](my-workouts-preview.gif)

## Development
#### System Requirements

- Node.js 10+
- npm 6+
- Postgresql 10+

#### Getting Started
1. Clone the repository
   ```shell
   git clone https://github.com/kieran-tallinger/my-workouts.git
   cd my-workouts
   ```
2. Install the dependencies with npm
   ```shell
   npm install
   ```
3. Import the example database to Postgres with npm
   ```shell
   npm run db:import
   ```
4. Start the project
   ```shell
   npm run dev
   ```
 You are now able to view the application by opening http://localhost:3000 in your choice of browser!
