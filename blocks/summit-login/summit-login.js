waitForElement('.nav-sections[data-section-status="loaded"]').then((elm) => {
    var signoutButton = document.querySelector('li > a[title="Sign out"]');
    var loginButton = document.querySelector('li > a[title="Login"]');
    var cookieName = "summit-authToken";
    var cookieValue = "some-random-token";

    function logOutUser() {
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.querySelector("input[name='uname']").value = '';
        document.querySelector("input[name='psw']").value = '';
        toggleLoginButtons();
    }

    function logInUser() {
        document.cookie = cookieName + "=" + cookieValue + "; expires=Thu, 01 Jan 2970 00:00:00 UTC; path=/;";
        toggleLoginButtons();
    }

    function isLoggedIn() {
        return document.cookie.indexOf(cookieName) != -1;
    }

    function toggleLoginButtons() {
        if(isLoggedIn()) {
            // user is logged in
            loginButton.closest("li").setAttribute("hidden", "");
            signoutButton.parentElement.removeAttribute("hidden", "");
        } else {
            // user is anonymous
            loginButton.closest("li").removeAttribute("hidden", "");
            signoutButton.parentElement.setAttribute("hidden", "");
        }
    }

    function styleUpTheLimitedEdition() {
        var limitedEdition = Array.from(document.querySelectorAll("li")).filter((el) => el.innerHTML.indexOf("Limited") != -1)[0];
        limitedEdition.style.color= "red";
        limitedEdition.style.fontWeight = "bold";
    }

    function appendLoginForm() {
        var loginMarkup = '<div class="login-form">' +
                            '<form action="action_page.php" method="post">' +
                                '<div class="container">' +
                                    '<div class="user-input">' +
                                        '<label for="uname"><b>Username</b></label>' +
                                        '<input type="text" placeholder="Enter Username" name="uname" required>' +
                                        '<label for="psw"><b>Password</b></label>' +
                                        '<input type="password" placeholder="Enter Password" name="psw" required>' +
                                    '</div>' +    
                                    '<button class="login-button" type="submit">Login</button>' +
                                    '<br>' +
                                    '<label>' +
                                        '<input type="checkbox" checked="checked" name="remember"> Remember me' +
                                    '</label>' +
                                '</div>' +
                            '</form>' + 
                        '</div>';
        loginButton.parentElement.innerHTML = loginMarkup;
        loginButton = document.querySelector('.login-button');
    }

    function addEventListeners() {
        signoutButton.addEventListener('click', (event) => {
            event.preventDefault();
            logOutUser();
        });
        loginButton.addEventListener('click', (event) => {
            event.preventDefault();
            logInUser();
        });
        document.querySelector(".user-input").addEventListener("click", (event) => {
            document.querySelector('.user-input').closest(".nav-drop").click();
        });
    }

    function init() {
        styleUpTheLimitedEdition();
        appendLoginForm();
        toggleLoginButtons();
        addEventListeners();
    }

    init();

});

function waitForElement(selector) {
    return new Promise((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver((mutations) => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // Observe changes in the entire document body (including subtree)
        observer.observe(document.body, { childList: true, subtree: true });
    });
}