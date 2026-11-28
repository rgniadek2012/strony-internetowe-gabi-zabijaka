const wish = document.querySelector("#wish");
const nameInput = document.querySelector("#name");
const saveButton = document.querySelector("#save-button");
const printButton = document.querySelector("#print-button");
const status = document.querySelector("#status");

wish.value = localStorage.getItem("mikolaj-list-tresc") || "";
nameInput.value = localStorage.getItem("mikolaj-list-podpis") || "";

saveButton.addEventListener("click", () => {
    localStorage.setItem("mikolaj-list-tresc", wish.value);
    localStorage.setItem("mikolaj-list-podpis", nameInput.value);
    status.textContent = "List został zapisany.";
    window.setTimeout(() => {
        status.textContent = "";
    }, 3000);
});

printButton.addEventListener("click", () => {
    window.print();
});