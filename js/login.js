document.addEventListener('DOMContentLoaded', () =>{
    
const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // prevent the default form submission behavior

    const username = loginForm.username.value;
    const password = loginForm.password.value;

    const url = 'http://127.0.0.1:5000/user/check';
    const headers = new Headers();
    headers.set('Authorization', `Basic ${btoa(`${username}:${password}`)}`);

    fetch(url, {
        method: 'GET',
        headers: headers,
    })
    .then(response => {
        if (response.ok) {
            console.log('Login successful!');
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            const url1 = 'http://127.0.0.1:5000/user/' + username;
            fetch(url1,{
                method: 'GET',
                headers: headers,
            })
            .then(response =>{
                if(response.ok){
                    return response.json();
                }
                throw Error("oigujfhndgpiusjnbpfd9n");
                //localStorage.setItem('userId', response.json().userId);
            })
            .then(ndata => {
                console.log(ndata);
                console.log(ndata.response);
                localStorage.setItem('userId', ndata.
                response.idUser);
                localStorage.setItem('isLoggedIn', '1');
                window.location.href = 'index.html';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while logging in. Please try again later.');
                return;
            })

            
        } else {
            console.log('Login failed!');
            alert('Login failed. Please check your username and password.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while logging in. Please try again later.');
    });
});
})

function logout() {
    localStorage.setItem("isLoggedIn","0")
    localStorage.setItem("password","")
    localStorage.setItem("userId","")
    localStorage.setItem("username","")
    window.location.href = "login.html";
  }
  