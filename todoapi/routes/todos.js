
var express = require('express');
var router = express.Router();

// declares empty array
var myTodos = [];

// requires the underscore npm
var _ = require('underscore');

var bodyParser = require('body-parser');
// allows for more specific json parsing in routes; otherwise use app.use(...); on the app.js page
var jsonParser = bodyParser.json();

const mongoose = require('mongoose'); // calls and assigns mongoose object to var mongoose
// connects mongoose to local host
mongoose.connect('mongodb://localhost/todo_list')
    .then(() => {
        console.log("Successfully connected to MongoDB.");    
    }).catch(err => {
        console.log('Could not connect to MongoDB.');
        process.exit();
}); 

// create a schema to be used
var todoSchema = new mongoose.Schema({
    id: Number,
    description: String,
    isComplete: Boolean,
    updated_at: { type: Date, default: Date.now }
});

// create the model
var Todo = mongoose.model('Todo', todoSchema);
// creates a new Todo object
var thisTodo = new Todo();

// retrieves ALL items on to do list
router.get('/', function(req, res, next) {
    // searches for all documents in Mongo
    Todo.find({}).exec(function(err, todo){
        // if there is an error:
        if(err) {
            console.log('Error locating todo list ', err);
        // no errors?
        } else {
            // sets myTodos array to current Mongo DB documents
            myTodos = todo;
            // returns myTodos object to script.js for processing on browser
            res.json(myTodos);
        }; // ends if statement
    }); // ends .find
});

// NOTE: not needed at this time but could be used later for searching for specific list item
// // retrieves ONE specific item from todo list
// router.get('/:id', (req, res) => {
//     var thisId = parseInt(req.params.id);
//     var thisTodo = _.findWhere(myTodos, {id: thisId});
//     if(thisTodo) {
//         res.json(thisTodo);
//     } else {
//         res.json({"code" : 1001, "message" : "This todo does not exist"});
//     };
// });

// updates completed status of item on todo list
router.put('/:id', (req, res) => {
    // assigns current id to var
    var thisId = parseInt(req.params.id);
    // searches for current item with id to process as error if needed
    var thisTodo = _.findWhere(myTodos, {id: thisId});
    if(!thisTodo){
        res.json({"code" : 1002, "message" : "This todo does not exist so cannot update complete status"});
    } else {
        // toggles isComplete status (true <--> false)
        thisTodo.isComplete = !thisTodo.isComplete;
        // NOTE: findOneAndUpdate requires callback or it does not execute, only queries
        Todo.findOneAndUpdate({ id : thisId },{ $set: { isComplete : thisTodo.isComplete }},
            function(err, todo){
                if(err) {
                    console.log('My Error:', err);
                } else {
                    console.log('Data has been updated');
                }; // closes callback
        }); // closes update
        res.json(thisTodo);
    }; // end if test 
});

// POST route using body parser ONLY for this route
router.post('/', jsonParser, (req, res) => {
    // tests to see if array is empty
    if (_.isEmpty(myTodos)) {
        //  if the myTodos array is empty, this resets id = 1 for new list item
           newTodo = 1;
    } else {
        // returns the object with the largest (max) value  for id using underscore
        var maxTodo = _.max(myTodos, (myTodos) => { return myTodos.id });
        // adds 1 to highest id to create new id
        newTodo = maxTodo.id + 1;
    }; // closes if test

    // builds new object for database
    thisTodo = { 
        // sets unique id based on current item ids
        id: newTodo, 
        // allows for long string and trims white space from back and end
        description: req.body.description.trim().substr(0,40), 
        // new item is ALWAYS going to false as it has not been completed
        isComplete: false
    };

    // sends new item to mongodb
    Todo.create(thisTodo, function(err, myTodos){
        if(err) {
            console.log('My Error:', err);
        } else {
            console.log('Data has been saved');
        };
    });
    // adds new object to myTodos array
    myTodos.push(thisTodo);
    // returns myTodos to script.js for processing on browser
    res.json(myTodos);
    
}); //ends post todos

// DELETE route 
router.delete('/:id', (req, res) => {
    // sets var based on :id
    var thisId = parseInt(req.params.id);
    // assigns var to item in array based on passed :id
    var thisTodo = _.findWhere(myTodos, {id: thisId});
    // checks to make sure item exists in myTodos array
    if (!thisTodo) {
        // checks to ensure :id exists
        res.json({"code" : 1003, "message" : "This todo ID of " + thisId + " does not exist so cannot delete"});
    } else {
        // sets var using _.reject method
        var deleteTodo = _.reject(myTodos, (e) => {
            // NOTE: anything that does NOT test TRUE will be saved and passed to var deleteTodo
            return e.id == thisId;
        }); // closes deleteTodo

        // deletes document from Mongo
        Todo.deleteOne({ id: thisId }, function(err, todo){
            if(err) {
                console.log('My Error: ', err);
            } else {
                console.log('Document has been deleted');
                // resets myTodos to new array (which is old array minus specifically called :id)
                myTodos = deleteTodo; 
            };
        });
        // sends myTodos object back to script.js
        res.send(myTodos);
    }; // closes object confirmation 
}); // closes delete route

module.exports = router;
