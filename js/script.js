
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const showSignupBtn = document.getElementById('showSignup');
const showLoginBtn = document.getElementById('showLogin');
const loginContainer = document.querySelector('.auth-container');
const signupContainer = document.getElementById('signupContainer');

if (showSignupBtn) {
    showSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.classList.add('hidden');
        signupContainer.classList.remove('hidden');
    });
}

if (showLoginBtn) {
    showLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        signupContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
    });
}


if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (validateEmail(email) && validatePassword(password)) {
          
            localStorage.setItem('user', JSON.stringify({ email }));
            window.location.href = 'dashboard.html';
        } else {
            alert('Please check your email and password');
        }
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        if (validateName(name) && validateEmail(email) && validatePassword(password)) {
          
            localStorage.setItem('user', JSON.stringify({ name, email }));
            window.location.href = 'dashboard.html';
        } else {
            alert('Please check your input fields');
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

function validateName(name) {
    return name.length >= 2;
}


function checkAuth() {
    const user = localStorage.getItem('user');
    const protectedPages = ['dashboard.html', 'planner.html', 'profile.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage) && !user) {
        window.location.href = 'login.html';
    }
}


checkAuth();