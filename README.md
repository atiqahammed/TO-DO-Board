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