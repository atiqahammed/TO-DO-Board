# TO-DO-Board
A simple application for creating to do board where user will be able to create category and tasks under several category. Each task will have title, description and expiry date. User will be able to change the category by dragging and dropping the tasks among the categories. When the user will update the task's category it will generate a new history of the task on the category change action.

### Purpose of this project
The main purpose of the project to fulfill the test requirement for Fair Pattern UI developer.

### Project requirement
Task is to Create a To-Do Board that has the following features:
#### Basic Authentication
Please make sure to apply best practices when applying the authentication mechanism for your
#### Front End & Back End
- Ability to create categories/labels.
- Ability to create Tickets that can be assigned to each category/label.
    - The board must have a drag-and-drop design Language similar Jira/Trello when assigning a ticket.
    - Do not use a library for this feature. Utilize the HTML Drag and Drop API
- A Ticket must have three properties.
    - Title
    - Description
    - Expiry Date
- The Ability to Edit all three properties.
    - If a ticket description edit is interrupted (Similar to Jira) unless a hard refresh is done the value will be drafted and will be available when the ticket is opened.
    - When Expiry Date is Near. Application should notify the user in a way that is both intuitive & user friendly.
- BONUS requirements (If you are passionate, feel free to attempt)
    - Apply Type checking using TS
    - Ability to track Update History
    - Ability to See Card Update History
        - Example output:
            i. Card 1: Has been moved to In Progress on Jan 25 2022 16:04
            ii. Card 2: Has been moved to Done on Feb 2 2022 11:04
            iii. Card 1: Has been moved to For Review on Feb 1 2022 10:04

## Technology used
1. Frontend 
    - [React](https://react.dev/learn) with [typescript](https://www.typescriptlang.org/)
    - [Tailwindcss](https://tailwindcss.com/) for styling
2. Backend
    - [Nestjs](https://nestjs.com/)
    - [Typeorm](https://typeorm.io/) as database framework 
3. Database
    - [Postgres](https://www.postgresql.org/)

## Repository Description
This Repository contains 2 major projects.

1. to-do-board-be: the backend implementation of this project with nestjs. It contains endpoints:
    ```
        GET /health
        POST /user/signup
        POST /user/login
        GET /user/profile
        POST /user/refresh-token
        POST /category/create
        GET /category/get
        POST /task/create
        POST /task/update
        GET /task/get
        GET /task/get/history/{id}
    ```
2. to-do-board-be: the UI implementation with reactjs.

## Instructions to run the code is development env
### Requirements
1. git
2. nodejs v18.10.0 or later version
3. yarn latest
4. Postgres 15 or later version

### Steps
1. Clone the repository from github
    ```
    git clone https://github.com/atiqahammed/TO-DO-Board.git
    ```
2. Go to nest-api project to run the api first
    ```
    cd nest-api
    ```
3. Install dependencies
    ```
    yarn install
    ```
4. Set environment variables in .env if necessary
    ```
    PORT=4500

    DATABASE_TYPE="postgres"
    DATABASE_HOST="localhost"
    DATABASE_PORT=5432
    DATABASE_USER="postgres"
    DATABASE_PASSWORD="postgres"
    DATABASE_NAME="to-do-board"
    DATABASE_SYNC="true"

    ACCESS_TOKEN_EXPIRES_IN_SEC=3600
    REFRESH_TOKEN_EXPIRES_IN_SEC=86400
    ```
5. Build the application
    ```
    yarn build
    ```
6. Run application
    ```
    yarn start:dev
    ```
this will run the application. In this case in port 4000. We will be able to the swagger UI in <baseurl>/api for this case it will be like http://localhost:4500/api/
![swagger](./assets/Screenshot%202023-12-09%20230426.png)

7. Go to the web_app directory to run the UI then
    ```
    cd ..
    cd to-do-board-ui
    ```
8. Install dependencies
    ```
    yarn install
    ```
9. Set environment variables in .env if necessary with api base url
    ```
    REACT_APP_API_BASE_URL=http://localhost:4500
    ```
10. Run application
    ```
    yarn start
    ```
then the application will be accessable in http://localhost:3000
![application](./assets/Screenshot%202023-12-09%20231050.png)