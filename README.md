# proctoring-extension

### developed full end application using MERN stack
## How to run ?

clone the repo 
and install the dependencies in each folder namely admin-panel, extension, and the backend


once all the dependencies has been installed run
```
npm run build in the extension folder
```

this will create the build folder which later can be loaded to the extensions

## Features

* admins can login or register themselves in the admin panel
* admins can create tests with unique testcodes
* Registered Users can start their test with their email and with the testcode they provided
* Users can register on the platform 
* Once user starts test the DB will get updated that a user started test 
* Once test begins with the specified time by us (eg., for every 3 min) will collect images of the users
* once user submitted test we will stop collecting the images and will update same on the Data Base
* Admins can see the tests and can go to specific test and see the users attempted or attempting by clicking the card will redirect to theimages of the users captured

## Tech Stack
* Database MongoDb
* Frontend React
* Backend Express.js, Node.js

## Future Scope:
* work on UI 
* added start time and end time feature, but can make the users only give in the active time
