# 3on3Doer

Pomodoro app which helps to finish tasks, not getting started with tasks.

## Tech Used

- Application: React
- State Management: Redux ToolKit
- Routing: React Router
- Firebase : Authentication , Firestore Database
- CSS: Plain CSS
- Testing: Not Done

## Package Used

- react-toastify - to show toast text for actions completion

## Features

- Authentication:

  - User Signup
  - User Login (Email, Password OR Login as Guest User)
  - Logout

- Public Routes:

  - Landing Page
  - Login
  - Signup

- Private Routes:
  - All Tasks Listing Page
  - Add New Task
  - Toggle Task Status
  - Update Task
  - Delete Task
  - Single Task Page
    - Timer for completing task
    - Task description
    - Start, Pause and Restart Timer
    - Task Status Auto Completed Mark On Timer End
    - Task Status Auto Not-Completed Mark On Restart
    - Start and Pause Disable For Completed Tasks

## Responsive [✅]

## Video Preview

## Get app from here 👇

[3 on 3 Doer](https://3on3doer.netlify.app/)

## How to run app locally

- Clone the repository
  - On Terminal change directory to `3on3 Doer` directory.
  - Add .env file to the root directory
  - Place all your app related keys from the created firebase project and place it in the .env as below
  - ```
    REACT_APP_API_KEY=<your key>
    REACT_APP_AUTH_DOMAIN=<your domain>
    REACT_APP_PROJECT_ID=<your project id>
    REACT_APP_STORAGE_BUCKET=<your storage bucket>
    REACT_APP_MESSAGING_SENDER_ID=<your sender id>
    REACT_APP_APP_ID= <your app id>
    ```
  - Type npm start and hit enter.
  - Project is running locally.

## Contribution

- For folder naming convention follow camelCase naming
  convention.
- For components and pages follow PascalCase naming
  convention for files.
- For javascript code follow camelCase naming convention.
- For components and pages create file with jsx extension type, and
  if code repeats more than twice break code into hooks for modularity.
- For rest, except css use camelCase convention.

## Mention

- [Coding Artist: Circular Progress Bar](https://www.youtube.com/watch?v=YDgw6HjMCoQ)
