#TIY Full Stack

##Getting started

###Set up the build system
  - clone this repo with `git clone git@github.com:magentanova/tiy-full-stack.git THE-LOCAL-FOLDER-YOU-WANT-TO-CREATE`
  - disconnect from my remote repo and point to your own (see [Publishing](#publishing))
  - `cd` into the local folder
  - `npm install`
  - `npm run go`
  - visit [localhost:3000](http://localhost:3000) to make sure it's working
  
###Set up mongo db 

  - install (only need to do this once)
    - `brew install mongodb`
    - `sudo mkdir -p /data/db`
    - `sudo chown -R $(whoami) /data/`
  
  - run the database
    - `mongod`
    - if your console output ends with something like "waiting for connections on port XXXXX", then your database is listening for queries. you're good to go.

###Install postman

  - https://www.getpostman.com/
  - this chrome extension allows you to test POST requests to your api endpoints much more easily and quickly than you could by writing JavaScript. 
  - you can set headers, write JSON into the request body, and use tabs to track multiple requests at once.
  
##Workflow
  
  - you'll *only* write code in the files in the `src/` folder
  - every time you save in that folder, your code will be read and transpiled into the `dist/` folder. only files in `dist/` will be served up to the browser.
  - view and test your app at localhost:3000
  
##Publishing

  - disconnect your local repo from this one with `git remote remove origin`
  - `hub create YOUR-APP-NAME` -- this will simultaneously (1) create you a remote repo with the given name and (2) create a local reference connecting the directory you're in to the remote you just created
  - add, commit and push per usual

##Deploying 

The easiest thing to do is deploy to heroku. Once you have an account and you've installed the heroku command line tools, simply run: 
 
  - `heroku create YOUR-APP-NAME`
  - `heroku addons:create mongolab`
  - `git push heroku master`

Have fun!
