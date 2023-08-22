$(document).ready(function(){
    $.get('/getUser', function(data){
        console.log(data);
    });
});


function postUsername(){
    var user = $("#username").val();
    var userJSON = JSON.stringify({'username': user});
    console.log(user);
    $.post('/insertUser', userJSON, function(data){
        console.log(data);
    })
}

function updateUsername(){
    var emailadd = $("#email").val();
    var user = $("#username").val();
    console.log(emailadd);
    $.post('/updateUser', {'email': emailadd, 'username': user}, function(data){
        console.log(data);
    })
}

function deleteUser(){
    var emailadd = $("#email").val();
    console.log(emailadd);
    $.post('/deleteUser', {'email': emailadd}, function(data){
        console.log(data);
    })
}


function getUsers(){
    $.get('/getSortedUsers', function(data, status){
        console.log(data);
        $("#names").empty();
        console.log(status);
        data.forEach(user => {
            $("#names").append("<li>" + user.firstName + " " + user.lastName + "</li>")
        })
    })
}