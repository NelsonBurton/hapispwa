Single Page Web Application
============

Javascript project using Meteor framework that manages a list of users with their associated application tokens.

There is a live version of the site at http://hapispwa.meteor.com.

hapispwa = hAPI Single Page Web Application (programming challenge for interview process).


Running the Code
-----------
    $ curl https://install.meteor.com/ | sh
    
    # seperating client/server
    $ meteor remove autopublish
    $ meteor remove insecure

    # testing frameworks
    $ meteor add sanjo:jasmine
    $ meteor add velocity:html-reporter

    # running the code
    $ meteor deploy hapispwa.meteor.com


Understanding the code
-----------
There are 3 main files, plus some unit tests in the tests directory. All the Javascript code is in hapispwa.js (includes both server and client code). There is a small amount of templating in the html (that allows the data to be printed).
