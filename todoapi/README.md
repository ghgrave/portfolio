This API project was done for class. 

Concepts for building the To Do App:

  1) Build an HTML page that allows user to:
      * input an item to be added to the To Do List
      * mark item completed
      * delete item from the list
  2) Use Ajax and Single Page Application concepts that allow changes to be displayed in browser
  3) BEFORE displaying in browser, data changes need to be saved in a database

Once HTML page was completed, the next step was to use Ajax to allow changes to be displayed in browser. Ajax was then used 
with Node and Mongoose in order for data to be sent/saved to MongoDB. Once data was saved/updated, the new data was sent back 
to Node to be processed and sent back to browser for display.

This way, whenever the server is closed, data still exists for user to recall once server is re-started.

Mocha and Chai were used for earlier testing, but left out of final code.
