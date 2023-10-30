var allUsers = []
var users = localStorage.getItem("Users")
if (users !== null) {
    allUsers = JSON.parse(users)
}




function signup() {
    var email = document.getElementById("semail")
    var password = document.getElementById("spass")

    var obj = {

        email: email.value,

        password: password.value,
    }
    allUsers.push(obj)
    localStorage.setItem('Users', JSON.stringify(allUsers))

if( email.value == '' || password.value  == ''){
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all fields',
       
      })    

}

else{
 location.href = './signin.html'
}

}



function signin() {
    var email = document.getElementById("lemail").value
    var password = document.getElementById("lpass").value
    var filterusers = allUsers.filter(function (data) {
        return data.email === email && data.password === password


    })

    
    
     if(email == '' || password == '' ){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please fill all fields',
           
          })    
    }
    else if (filterusers.length) {
        Swal.fire({
            icon: 'success',
            title: '<h3 style="color: #00AD96 ">Great! You are now Sign up. Click OK to proceed.</h3>',
            confirmButtonColor: "#00AD96",
            // iconColor: '#00AD96',
        }).then(() => {
            if (true) {
                location.href = '../index.html';
            }
        })
        // location.href=('./welcome.html')

    }


    else {

        alert('Sorry user not found')

        location.href = ("./Index.html")
    }



}

// function logout() {


//     localStorage.clear()

//     location.href = './signup.html'


// }




// var getrem2 = document.getElementById('reminder2').innerHTML="Please fill all the fields";
// if( email =! ' ' || password != ' '){
//     document.write(getrem2)
// }