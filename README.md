# MailHub
An Email Messenging Application where users can send, receive, trash, reply to, and search for emails

# Technologies
This project uses Node.js, Express, ReactJS, and has a RESTful E-Mail API backed by a PostgreSQL database with associated tests to demonstrate it works.

## Project Structure
    ├── frontend                    # Front End Folder structure (React)
    │   ├── node_modules            # Holds all downloaded NPM packages
    │   ├── public                  # Holds other data (icons, images, txt, etc.)
    │   ├── src                     # Holds main code
    │   │   ├── index.js            # the js code executed when front end is booted up
    │   │   ├── __tests__           # Front End tests
    │   │   ├── components          # Front End Components
    │   │   ├── App.jsx             # Main Front End Component
    │   ├── package.json            # Dependency, script, version, etc. data
    ├── backend                     # Back End Folder structure (Node.js + ExpressJS)
    │   ├── api                     # Contains openapi.yaml schema
    │   ├── data                    # Contains sensitive environment variables 
    │   ├── node_modules            # Holds all downloaded NPM packages
    │   ├── sql                     # Contains sql scripts
    │   ├── src                     # Contains Back End JavaScript functions
    │   ├── .env                    # Contains sensitive environment variables for sql 
    │   ├── docker-compose.yml      # Contains openapi schema for PostGres
    ├── e2e                         # End to End tests
    │   ├── node_modules            # Holds all downloaded NPM packages
    │   ├── tests                   # Contains end to end testing functions
    │   ├── .env                    # Contains sensitive environment variables for sql
    │   ├── package.json            # Dependency, script, version, etc. data
    ├── node_modules                # Holds all downloaded NPM packages
    ├── .gitignore                  # Hides node_modules
    └── README.md


# Getting Started
## Step 1:
  Download and install node.js LTS for your operating system: https://nodejs.org/en/download/
  
  Once installed, open a terminal / console session and run the following command:
    ```
      $ node –-version
    ```
    
  Which should return this version number: v16.17.1
    
  Now run the following command:
    ```
      $ node –-version
    ```
    
  Which should return this version number: 8.19.2

## Step 2:
  Download and install Docker Desktop: https://www.docker.com/products/docker-desktop

## Step 3:
  Navigate to the development environment 'backend' and run this command:
    ```
      $ npm install
    ```
    
## Step 4:
  Start the development database:
    ```
      $ docker-compose up -d
    ```
  then
    ```
      $ docker-compose up
    ```
    
   To stop the development database:
    ```
      $ docker-compose down
    ```
   
   To start the dev server, run the following command:
    ```
      $ npm start
    ```

   To execute tests run the following command:
    ```
      $ npm test
    ```
    
   To run the linter against your code, run the following command:
    ```
     $ npm run lint
    ```
