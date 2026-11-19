"use strict";
let avatar = document.getElementById("avatar");
let name = document.getElementById("name");
let description = document.getElementById("description");
let toggleBtn = document.getElementById("toggle-btn");

toggleBtn.addEventListener("click", function(){

    let isHero = document.body.classList.contains("hero");

    if(isHero) {
        document.body.classList.replace("hero", "villain");
        name.textContent = "Diabeł złodziej";
        description.textContent = "Tryb: 2 złodziej";
        avatar.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWh8-PjLbGTkdlQaBVdrroUNM9Fxltv6ZAfoNyqY-jEA&s=10";
    }
    else {
        document.body.classList.replace("villain", "hero");
        name.textContent = "Śmierć złodziej";
        description.textContent = "Tryb: złodziej";
        avatar.src = "https://img.magnific.com/darmowe-zdjecie/elfy-narodzily-sie-z-magii-smierci-magicznej-ilustracji-ilustracji-3d_456031-152.jpg";
    }
});
