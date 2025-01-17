document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get username and password values
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var rememberMe = document.getElementById('remember-me').checked;

    // Mock authentication (replace with actual authentication logic)
    if (username === 'admin' && password === 'password') {
        // Redirect to home.html upon successful login
        window.location.href = 'home.html';

        // Store username in local storage if "Remember Me" is checked
        if (rememberMe) {
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('username');
        }
    } else {
        // Display error message
        document.getElementById('error-message').innerText = 'Invalid username or password';
    }
});

// Populate username field with stored value if "Remember Me" was checked
window.addEventListener('load', function() {
    var rememberedUsername = localStorage.getItem('username');
    if (rememberedUsername) {
        document.getElementById('username').value = rememberedUsername;
        document.getElementById('remember-me').checked = true;
    }
});
