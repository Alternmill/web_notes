document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#signup-form');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const formData = {
        username: document.querySelector('input[name="username"]').value,
        firstName: document.querySelector('input[name="firstname"]').value,
        lastName: document.querySelector('input[name="lastname"]').value,
        email: document.querySelector('input[name="email"]').value,
        password: document.querySelector('input[name="password"]').value,
      };      
  
      if (formData.password !== document.querySelector('#confirm-password').value) {
        alert('Passwords do not match');
        return;
      }
    fetch('http://127.0.0.1:5000/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    })
      .then(response=>{
        if(!response.ok){
          return response.json().then(errorResponse => {
            const errorMessage = `HTTP error! ${errorResponse.response}`;
            throw new Error(errorMessage);
          });
        }
        console.log(response);
        alert("You are successfully registered!")
        window.location.href = 'http://127.0.0.1:5500/login.html';
        return response.json(); 
      })
      .catch((error) => {
        alert(error);
        console.error("Error:", error);
      });
      
      

  });
})