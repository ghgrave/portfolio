// set var to url in stead of typing multiple times
const link = 'http://localhost:3000/todos';

// GET (Read) all the todos
$(document).ready( () => {
    
    // call the api
    $.ajax({
        url: link,
        method: 'GET'
    })
     // parse the payload
    .done( (data) => {
        data.forEach((todo) =>{
            let isComplete = todo.isComplete ? "completed": "";
            $('ul').append(
               `<li data-id="${todo._id}" class="${isComplete}"><span>X</span>${todo.description}</li>`  
            )})
        console.log('Success');
    })
    .fail((error)=> {
        console.error('Page did not load ', error);
    });
});

// POST (Create a new todo)
$('input').keypress(function(event){
    if(event.which === 13 && $(this).val()) {
        var todoItem = $(this).val().trim().substr(0, 40);
        $.ajax({
            url: link,
            method: 'POST',
            data: {description: todoItem}
        })
        .done((returnedTodo)=> {
            console.log('success');
            let isComplete = returnedTodo.isComplete ? "completed": "";
            $('ul').append(
                `<li data-id="${returnedTodo._id}" class="${isComplete}"><span>X</span>${returnedTodo.description}</li>`
                );
            $('input').val('');
        })
        .fail( (error) => {
            console.error('Data did not load from backend:', error);
        });  
    }
});


// PUT (Update the completion status)
$('ul').on('click', 'li', function(){
    let self = this; // sets as global otherwise 'this' is local and not assessed
    $.ajax({
        url: link + '/' + $(self).data('id'),
        method: 'PUT'
    })
    .done((changedToDo) => {
        $(self).toggleClass('completed');
        console.log(changedToDo); //TODO: delete
    })
    .fail((explosion) => {
        console.error('Hey, was not able to toggle the class? No Id?', explosion);
        alert("Error!!!!");
        return false;
    }) 
  });

// DELETE (Remove the todo)  
$('ul').on('click', 'span', function(event){
    event.stopPropagation();
    $.ajax({
        url: link + '/' + $(this).parent().data('id'),
        method: 'DELETE'
    })
    .done( () => {
        $(this).parent().remove();
    })
    .fail(()=> {
        $('#error').html('There was an issue');
    });
});