// Setting vars
const express = require('express');
const logger = require('morgan');
const app = express();
const _ = require('underscore');
const bodyParser  = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost/todo_list'

app

mongoose.connect(mongoUrl, { useNewUrlParser: true }) // returns a promise
    .then( ()=> {
        console.log('Connected to Mongo dB at ', mongoUrl);
    })
    .catch( (err)=> {
        console.log('Could not connect to database', err);
        process.exit();
    });

let todoSchema = mongoose.Schema({
    description: String,
    isComplete: Boolean
});

let Todo = mongoose.model('TodoModel', todoSchema);



// TODO: how to connect to Mongo
// 1) Require mongoose - DONE
// 2) Connect mongoose to current dB - DONE
//     a) success? - DONE
//     b) fail? - DONE
// 3) Build schema - DONE
// 4) Create model - DONE
// 5) Create new object
// 6) Read - find ALL in dB
// 7) Post - create new object in dB
//     a) set toDoArray as empty array
//     b) add new posts to dB
// 8) Delete - deleteOne based on id
// 9) Put - findOneAndUpdate based on id



const port = process.env.PORT || 3000;

// NOTE: body-parser is a middleware that acts between the req and res
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(logger('dev'));
app.use(express.static('public'));

// provides security protocols
app.use(cors());

var toDoArray = [
    // {
    //     id: 1,
    //     description: 'Call mom',
    //     isComplete: false
    // },
    // {
    //     id: 2,
    //     description: 'Buy groceries',
    //     isComplete: true
    // },
    // {
    //     id: 3,
    //     description: 'Go to movies',
    //     isComplete: false
    // }
]

// Route Handling

// app.get('/', (req, res) =>{
//     res.send()
// })

// GET route
app.get('/todos', (req, res) => {
    Todo.find({}, (err, todos) => {
        if(err) {
            console.log('Error: ', err);
            res.statusCode(400).send({code: 1234, message: 'Cannot send data from dB'});
        };
        res.send(todos);
    })
});



// Post route
app.post('/todos', (req, res) => {
    let newDescription = req.body.description;
    if(!newDescription) {
        res.statusCode(400).send({code: 1235, message: 'Empty item received'});
    } else {
        Todo.create({description: newDescription, isComplete: false}, (err, todo)=> {
            if(err) {
                res.statusCode(400).send({code: 1236, message: 'Cannot post new item to dB'});
            };
            res.send(todo);
        })
    };
});

// // DELETE route old code!!!!!
// app.delete('/todos/:id', (req, res) => {

//     Todo.findByIdAndRemove({_id: req.params.id}, (err, todos)=> {
        
//     })
    
//     let newToDos = _.filter(toDoArray, (data) => {
//         return data.id != req.params.id;
//     });

//     if(newToDos.length != toDoArray.length) {
//         toDoArray = newToDos;
//         res.send(toDoArray);
//     }
//     res.status(404).send({code: 404, message: `Id ${req.params.id} is incorrect.`});
    
// });

// NOTE: DELETE route
app.delete('/todos/:id', (req, res) => {    
    Todo.findByIdAndDelete(req.params.id, (err, todo) => {
        if(err) {
            res.status(400).send({
                code: 1234, 
                message: 'There is an error finding item with matching id', 
                err: err
            });
        } else {
            res.send();
        }
    });
});

// // UPDATE route old code????
// app.put('/todos/:id', (req, res) => {
//     let thisId = parseInt(req.params.id);
//     let thisTodo = _.findWhere(toDoArray, {id: thisId });
//     thisTodo.isComplete = !thisTodo.isComplete;
//     res.send(thisTodo);
// });

// NOTE: UPDATE route
app.put('/todos/:id', (req, res) => {
    Todo.findById(req.params.id, (err, todo) => {
        if(err) {
            res.status(400).send({
                code: 1236, 
                message: 'There is an error finding item with matching id', 
                err: err
            });
        } else {
            // here todo is a mongoose document object and hence has
            // all the methods of mongoose including save.
            if(todo) todo.isComplete = !todo.isComplete;
            todo.save((err, todo)=>{
                if(err) res.send({code: 123, message: 'Hallelujah', err:err})
                res.send(todo);
            })
        }
    });
});


// Server is running
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
