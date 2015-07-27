## RoomEase ##
  RoomEase provides roommates with a fair and equitable method to divide chores.

## Summary ##
    RoomEase makes it easy to organize and delegate chores amongst your roomies. It helps to remove some of the awkwardness of assigning tasks to your roommates by randomly assigning tasks when they need to be assigned.

## Problem ##
  House management can be difficult because it is awkward to assign chores to your roommates, hard to remember who was responsible for which tasks, and ultimately unfair if one person takes on more responsibilities than others.

## Solution ##
RoomEase organizes and fairly assigns house chores to your roommates automatically.

## How to Get Started ##

  Start up a nodemon server by running ```nodemon server/server.js```

  Our app runs uses postgres so make sure to run ```brew install postgres``` if you don't have it installed globally.
  Then download postgres.app for easy starting and destroying of local postgres servers. This is far easier than running the commands from the terminal. If you get an EEARDDINUSE error, make sure postgres is running! If one is, try restarting the postgres.app

  While the app is running you can type ```psql`` to enter the command shell for postgres. running psql < server/schema.sql will clear the current database so you can start fresh. This is very useful for testing. (This is also commented out in the schema.sql file.) If you want to interact with your production database (the one living on heroku), type ```psql <DATABASE_URL>```. run ```psql <DATABASE_URL> < server/schema.sql``` to reset the schema on heroku.

  Run both bower install and npm install for the correct dependencies.

  The server will likely fail because there is some authorization config to be done. navigate to the /server/config directory and create a file called auth.js. ```touch auth.js``` open this file and copy this code into it -
  ```module.exports = {

      facebookAuth : {
        'clientID'      : "", //your app ID
        'clientSecret'  : "", // your app Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
      },

      //environment variables for heroku deployments when ready
      pgData : {
        host: '',
        database: '',
        user : '',
        port : ,
        password : '',
        ssl: true
      }
    }```

  You'll notice the values of these keys are empty, that is because this information needs to be specific for your instance of RoomEase. Go to developer.facebook.com and register a new application on the website. They will consequently provide you with a clientID and a clientSecret. These go into the facebookAuth object next to their respective keys.

  The pgData stands for postgres data. When you create a new app on heroku if you want to host it live, heroku will provide you with all of the necessary config variabes to put into this object. Leave ssl as true. If you follow this format, the process.env statements throughout the serverside code should automatically work. If they don't, i.e. you run into require errors, make sure all paths are pointing to the right places.**Also, don't forget to add the auth.js file to .gitignore!** You don't want people knowing your databaseURL/facebooksecret.

  NOTE: depending what environment you want to work with, you will have to go back to the developer section of facebook and change the url on the app's settings to either a localhost address or a <app-name>.herokuapp.com so that redirects will work properly.


## Customer Quote ##
  "Before, it was difficult to remember who had what chores, and sometimes chores didn't get done. Now we can easily keep track of which chores are done and who is responsible for upcoming tasks."

## Try RoomEase Today ##
  Visit our site and organize your house chores to avoid any hassle or awkwardness that comes with telling your roommates their chores!
