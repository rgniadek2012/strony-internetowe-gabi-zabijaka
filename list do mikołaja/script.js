const wish = document.querySelector("#wish");
const nameInput = document.querySelector("#name");
const saveButton = document.querySelector("#save-button");
const printButton = document.querySelector("#print-button");
const emailButton = document.querySelector("#email-button");
const emailForm = document.querySelector("#email-form");
const emailAddress = document.querySelector("#email-address");
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

emailButton.addEventListener("click", () => {
    emailForm.hidden = false;
    emailAddress.focus();
});

emailForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (typeof html2canvas !== "function") {
        status.textContent = "Nie udało się załadować narzędzia do tworzenia obrazu.";
        return;
    }

    const submitButton = emailForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    status.textContent = "Przygotowuję list jako obraz...";

    try {
        const letter = document.querySelector(".letter");
        const canvas = await html2canvas(letter, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#fffdf4",
            onclone: (clonedDocument) => {
                clonedDocument.querySelector(".letter-actions")?.remove();
                clonedDocument.querySelector(".email-form")?.remove();
                clonedDocument.querySelector("#status")?.remove();
            }
        });

        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
        if (!blob) {
            throw new Error("Nie udało się utworzyć obrazu.");
        }

        const file = new File([blob], "list-do-mikolaja.png", { type: "image/png" });
        const shareData = {
            files: [file],
            title: "List do Świętego Mikołaja"
        };

        if (navigator.canShare && navigator.canShare(shareData)) {
            await navigator.share(shareData);
            status.textContent = "List został przygotowany jako obraz do wysłania.";
            return;
        }

        const imageUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = imageUrl;
        downloadLink.download = file.name;
        downloadLink.click();

        const body = [
            "W załączniku przesyłam mój list do Świętego Mikołaja.",
            "",
            "Treść listu:",
            wish.value,
            "",
            "Pozdrawiam,",
            nameInput.value
        ].join("\n");
        const mailto = `mailto:${encodeURIComponent(emailAddress.value)}?subject=${encodeURIComponent("List do Świętego Mikołaja")}&body=${encodeURIComponent(body)}`;

        window.setTimeout(() => URL.revokeObjectURL(imageUrl), 30000);
        window.location.href = mailto;
        status.textContent = "Pobrano obraz listu i otwarto pocztę. Dodaj pobrany plik jako załącznik.";
    } catch (error) {
        if (error.name !== "AbortError") {
            status.textContent = "Nie udało się przygotować obrazka listu.";
        }
    } finally {
        submitButton.disabled = false;
    }
});