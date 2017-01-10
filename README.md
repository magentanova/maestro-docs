#TIY Full Stack

##Getting started

###Install mongodb (once)

  - `brew install mongodb`
  - `sudo mkdir -p /data/db`
  - `sudo chown -R $(whoami) /data/`

  
###Install Postman (once)

  - https://www.getpostman.com/
  - this chrome extension allows you to test POST requests to your api endpoints much more easily and quickly than you could by writing JavaScript. 
  - you can set headers, write JSON into the request body, and use tabs to track multiple requests at once.

###Install MongoChef (once, optional)

  - http://3t.io/mongochef/download/core/
  - This application allows you to inspect and modify your Mongo databases allowing you to quickly read/add/edit/delete documents(records)
  - Once installed:
    1. Go to `Connect` --> `New Connection`
    2. Enter name of database (e.g. *My Localhost DB*)
    3. Enter the values for Server|Port: 
       **Server**: `localhost` | **Port**: `27017`
    4. Click `Save Connection` 
      (you should see the db available on the left panel)
    5. Click `Connect` on the bottom right to connect and inspect

###Install the build environment (every time)

  - clone this repo with `git clone git@github.com:magentanova/tiy-full-stack.git THE-LOCAL-FOLDER-YOU-WANT-TO-CREATE`
  - disconnect from my remote repo and point to your own (see [Publishing](#publishing))
  - `cd` into the local folder
  - `npm run init-dev`
  

##Workflow

  - run the database with `mongod`.
    - if your console output ends with something like "waiting for connections on port XXXXX", then your database is listening for queries. you're good to go.
    - if your connection was refused, the database may already be running. you can leave it alone, or, to be sure, you can kill all running mongo processes with `kill $(pgrep mongo)`, and then run `mongod` again.

  - `npm run go`
    - as described in [tiy-starter-kit](https://github.com/magentanova/tiy-starter-kit), this will both run your local server and set up file watchers that will auto-transpile changes to files in `./src` into files in `./dist`
    - additional actions taken here in tiy-full-stack include connecting your server to the database, which is why you have to start up the database before starting up the server
  

##Publishing

  - disconnect your local repo from this one with `git remote remove origin`
  - `hub create YOUR-APP-NAME` -- this will simultaneously (1) create you a remote repo with the given name and (2) create a local reference connecting the directory you're in to the remote you just created
  - delete this README from your project. write your own if you have time.
  - add, commit and push per usual


##Deploying 

The easiest thing to do is deploy to heroku. Once you have an account and you've installed the heroku command line tools, simply run: 
 
  - `heroku create YOUR-APP-NAME`
  - `heroku addons:create mongolab` (this prompts heroku to create an instance of mongodb for your app and run it before starting your server.)
  - `git push heroku master`

Have fun!
