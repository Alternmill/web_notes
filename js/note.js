document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#add-note-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const url = 'http://127.0.0.1:5000/note/';
       
        console.log(localStorage.getItem('userId'))
        // console.log(localStorage.getItem('idUser'));
        const data = {
            ownerId: localStorage.getItem('userId'),
            title: document.querySelector('input[name="title"]').value,
            isPublic: true,
            text: document.querySelector('textarea[name="text"]').value,
            tags: [],
        };
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');

        const headers = new Headers();
        headers.set('Authorization', `Basic ${btoa(`${username}:${password}`)}`);
        headers.append('Content-Type', 'application/json');
        console.log(headers, 'ffdfdsfd');

        fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        })
            .then(response => {
                console.log(response.status);
                return response.json();
            })
            .then(data => {
                console.log(data);
                displayNote();
            })
            .catch(error => {
                console.error(error);
            });
    })
})
function displayNote(){

    if (localStorage.getItem('isLoggedIn')=='0') {
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('loginButton').style.display = 'block';
        document.getElementById('signupButton').style.display = 'block';
    } else {
        document.getElementById('loginButton').style.display = 'none';
        document.getElementById('signupButton').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'block';
    }

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    console.log(`Username: ${username}, Password: ${password}`);

    const headers = new Headers();
    headers.set('Authorization', `Basic ${btoa(`${username}:${password}`)}`);
    
    console.log(headers);
    fetch('http://127.0.0.1:5000/note/all', { headers })
      .then(response => response.json())
      .then(data => {
        // Here, you can use the data to create HTML elements
        const container = document.getElementById('note-container');
        while(container.firstElementChild) {
            container.firstElementChild.remove();
         }
        console.log(data);
        data.response.forEach(new_note => {
            console.log(new_note);
                // Get a reference to the HTML element where you want to display the data
            
            
            // Create a new HTML element to display the note data
            const note = document.createElement('div');
            note.classList.add('note');
            note.innerHTML = `
            <h2 class="note-title">${new_note.title}</h2>
            <p class="note-text">${new_note.text}</p>
            <ul class="note-tags">
                ${new_note.tags.map(tag => `<li>${tag.text}</li>`).join('')}
            </ul>
            <p class="note-last-updated">Last updated on ${new Date(new_note.dateOfEditing).toLocaleDateString()}</p>
            `;
            container.appendChild(note);
        });
      })
      .catch(error => console.error(error));
    
}