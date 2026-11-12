"use strict";

let counter = 0;
let items =["Gandalf","Geralt z Rivii","Yennefer z Vengerbergu","Jaina Proudmoore","Merlin"];

function addPoint() {
    counter++;
    document.getElementById("counter-display").innerText = counter;
}
function resetCounter() {
    counter=0;
    document.getElementById("counter-display").innerText = counter;
}

function drawItem() {
    let randomIndex = Math.floor(Math.random() * items.length);
    document.getElementById("random-display").innerText = items[randomIndex];
}


// TODO: napisz funkcję drawItem, która losuje element z tablicy i wyświetla go
