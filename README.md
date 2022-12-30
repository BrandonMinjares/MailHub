# MailHub
An Email Messenging Application where users can send, receive, trash, reply to, and search for emails

## Project Structure
    .
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
