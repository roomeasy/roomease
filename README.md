## Description ##
  Roomease is an application which makes the logistics of shared living much simpler. Daily chores can be scheduled 
  and assigned. Common documents, e.g. receipts and the lease, can be uploaded to the shared "dwelling" online. 
  Furthermore, a common calendar allows for reserving household space and equipment as well as planning events.

## How to Get Started ##
  Start up a nodemon server by running ```nodemon server/server.js```

  Our app runs uses postgres so make sure to run ```brew install postgres``` if you don't have it installed globally.
  Then download postgres.app for easy starting and destroying of local postgres servers. This is far easier than running the commands from the terminal. If you get an EEARDDINUSE error, make sure postgres is running! If one is, try restarting the postgres.app

  While the app is running you can type ```psql``` to enter the command shell for postgres. running ```psql < server/schema.sql``` will clear the current database so you can start fresh. This is very useful for testing. (This is also commented out in the schema.sql file.) If you want to interact with your production database (the one living on heroku), type ```psql <DATABASE_URL>```. run ```psql <DATABASE_URL> < server/schema.sql``` to reset the schema on heroku.

  Run both bower install and npm install for the correct dependencies.

  The server will likely fail because there is some authorization config to be done. navigate to the /server/config directory and create a file called auth.js. ```touch auth.js``` open this file and copy this code into it

  ```
  module.exports = {
    facebookAuth : {
      'clientID'      : "", //your app ID
      'clientSecret'  : "", //your app Secret
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
  }
  ```

  In order set the authentication, you will need to register the app with developer API server: facebook, twitter, 
  google, and github. They will consequently provide you with a clientID and a clientSecret, or something similarly 
  named. These go into the facebookAuth object next to their respective keys.

  The pgData stands for postgres data. When you create a new app on heroku if you want to host it live, heroku will provide you with all of the necessary config variabes to put into this object. Leave ssl as true. If you follow this format, the process.env statements throughout the serverside code should automatically work. If they don't, i.e. you run into require errors, make sure all paths are pointing to the right places. **Also, don't forget to add the auth.js file to .gitignore!** You don't want people knowing your databaseURL/facebooksecret.

  NOTE: depending what environment you want to work with, you will have to go back to the developer section of facebook and change the url on the app's settings to either a localhost address or a <app-name>.herokuapp.com so that redirects will work properly.

## Client Side Notes
### Naming Conventions for States, URLS, and Controllers
For any top level state/view
- Name state in camel case
- Name url in lowercase
- Append controller with Ctrl

SEE EXAMPLE BELOW:
```javascript
  .state('inviteRoomies', {
    url: '/inviteroomies',
    templateUrl: '/js/controllers/inviteRoomies/inviteRoomies.html',
    controller: 'inviteRoomiesCtrl'
  })
```
### Adding New States
In app.js add your new state name to the appViews array. If you need to create a nested view follow the way that dashboard state is handled in the app.js file.

### All HTTP Requests
Most come from services/utils.js in the Request factory; additionally, auth requests are handled in auth.js and 
calendar events in calendarEvents.js

### CSS Styling
- Bootstrap CSS was only used for the grid
- All custom styling is in main.css

### Font Awesome
Font Awesome was imported via cdn and linked in the index.html file. Icons are created with fa fa-classnames like fa fa-check throughout the code. Please reference [FontAwesome](www.fontawesome.io) for new fonts and class names to use.

### Animations
We used ng-animate along with animate.css to add transitions throughout the site. The grow animation that you see on the sidebar and roomie search pages is custom css in the main.css file class.
- .grow used on sidebar and roomie search (main.css, .grow .grow:hover)
- fade in used when tasks are added or removed (ng-animate, animate.css)

### New Features
- Implement Roomie Rating System
