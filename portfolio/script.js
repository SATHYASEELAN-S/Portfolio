const iconMenu = document.querySelector("#icon-menu");
const submitBtn = document.querySelector("#submit");
const darkmode = document.querySelectorAll(".dark-mode");
const slideBar = document.querySelector(".slidebar")
const closeMenu = document.querySelector(".close-menu");
const lightLogo = document.querySelectorAll(".light");
const darkLogo = document.querySelectorAll(".dark");
const body = document.querySelector("body");
const header = document.querySelector("header");
const backgroundBlur = document.querySelector(".dark-navbar-blur");
const alert = document.getElementById('alert');

let isNavbarActive = false;
let isDarkThemeActive = false;
let timeoutId;
let isHovering = false;

// navbar toggle
iconMenu.addEventListener("click", function () {
    slideBar.classList.add("active");
    backgroundBlur.classList.add("active");

})
closeMenu.addEventListener("click", function () {
    slideBar.classList.remove("active");
    backgroundBlur.classList.remove("active");

})

//darkmode

darkmode.forEach(e => {
    e.addEventListener("click", function () {
        body.classList.toggle("dark-theme");
        header.classList.toggle("dark-theme");

        lightLogo.forEach(light => {
            if (!isDarkThemeActive) {
                light.classList.remove("hide");
            }
            else {
                light.classList.add("hide");
            }
        })
        
        darkLogo.forEach(dark => {
            if (!isDarkThemeActive) {
                dark.classList.add("hide");
            }
            else {
                dark.classList.remove("hide");
            }
        })
        isDarkThemeActive = !isDarkThemeActive;


    })
})

//alert message

function showAlert(message) {
    console.log("inner html", alert);

    if(message!==404)
    {
        if(message==200)
        {
            alert.innerHTML = `<p class='medium semibold'>message sent successfully</p>`;
        }
        else{
            alert.innerHTML = `<p class='medium semibold'>sending</p>`;
        }
        alert.style.backgroundColor = 'var(--default)';
        alert.style.Color = 'var(--color-200)';
    }else if (message==404){
        alert.innerHTML = "<p class='medium semibold'>each field is required</p>";
        alert.style.backgroundColor = '#f44336';
        alert.style.Color = 'white';
    }

    alert.style.right = '10px';
    alert.addEventListener('mouseenter', () => {
        isHovering = true;
        clearTimeout(timeoutId);
    });
    alert.addEventListener('mouseleave', () => {
        isHovering = false;
        startCloseTimer();
    });

    startCloseTimer();
}

function startCloseTimer() {
    timeoutId = setTimeout(() => {
        if (!isHovering) {
            const alert = document.getElementById('alert');
            alert.style.right = '-300px';
        }
    }, 3000);
}

// mail 

submitBtn.addEventListener("click", function sendMail(e) {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    console.log(name, email, message);
    if (name !=="" && email !=="" && message !== "")
    {
    showAlert(300);
    var params = {
        name, email, message,
    };
    const serviceID = "service_wrxxp1o";
    const templateID = "template_a5kcq0s";
    emailjs.send("service_wrxxp1o", "template_a5kcq0s", params).then(function (res) {
        alert.style.right = '-300px';
        setTimeout(()=>showAlert(200),500);
        console.log(alert.style.right);
        
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("message").value = "";
    })

}else{
    showAlert(404);
}
})
