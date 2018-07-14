// assigns variable to root link, saves on repeat typing
const link = 'http://localhost:3000/todos';

// initiates AFTER page loads
$(document).ready( () => {
    // used for SPA 
    $.ajax({
        url: link, 
        method: 'GET'
        })
        .then((todos) => { // data is the array of todos
            todos.forEach( (todo) => {
                // sets class based on condition of true or false
                let completedClassString = todo.isComplete ? "completed" : " ";
                $('ul').append(
                    "<li data-id='" + todo.id + "' class='" + completedClassString + "'><span>X</span>" + todo.description + "</li>"
                );
            });
    });// closes ajax GET all
});


//  PUT 
$('ul').on('click', 'li', function(){
    // route based on data-id of the element
    var url = link + '/' + $(this).data('id');
    let that = this; // sets as global otherwise 'this' is local and not apssed
    $.ajax({ 
        url: url,
        dataType: 'json',
        method: 'PUT'
    })
    .fail(function(){
        console.log('fail');
    })
    .done(function() {
        // calls 'completed' class in order for  item to be scored through and red
        $(that).toggleClass('completed');
    }); // closes ajax PUT
    
});

// DELETE
$('ul').on('click', 'span', function(event){
    // handles route based on id of the parent element since user clicks on span element (no id)
    var url = link + '/' + $(this).parent().data('id');
    // using ajax for SPA
    $.ajax({ 
        url: url,
        dataType: 'json',
        method: 'DELETE',
    }); // closes ajax delete
    $(this).parent().remove(); // removes the li element of the span clicked in browser
});

// POST
$('input').keypress(function(event){
    // test to see if input is empty, otherwise, empty string entered for item each time
    // test to see if enter key is pressed to initiate ajax
    if(event.which === 13 && $(this).val() !== "") {
        var todoItem = $(this).val(); // sets var to current user input
        // using ajax fro SPA
        $.ajax({
            url: link, 
            dataType: 'json',
            method: 'POST', 
            data: {description: todoItem}, // sends user input as description to route handler
            // uses success option for callback function
            success: function(todos) {
                // emptys the ul 
                $('ul').empty();
                todos.forEach( (todo) => {
                    // sets class based on condition of true or false
                    let completedClassString = todo.isComplete ? "completed" : " ";
                    $('ul').append(
                        "<li data-id='" + todo.id + "' class='" + completedClassString + "'><span>X</span>" + todo.description + "</li>"
                    );
                });// ends forEach
            } // ends success option
        }); // end ajax POST
        // emptys input by supplying an empty string
        $('input').val(''); 
    };
});