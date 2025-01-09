// Handle Login Form Submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem('authToken', data.token); // Store the JWT token
            window.location.href = '/dashboard'; // Redirect to dashboard
        } else {
            alert('Login failed: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});

// Handle Signup Form Submission
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Account created successfully!');
            window.location.href = '/login.html'; // Redirect to login page after successful signup
        } else {
            alert('Signup failed: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});