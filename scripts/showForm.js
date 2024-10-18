let mostRecentForm;

function showForm(formId) {
    let allForms = document.querySelectorAll("form");
    allForms.forEach((form) => (form.style.display = "none"));

    let formToShow = document.getElementById(formId);
    if (formToShow) {
        formToShow.style.display = "block";
        localStorage.setItem("mostRecentForm", formId);
        mostRecentForm = localStorage.getItem("mostRecentForm");
        console.log(`\`formToShow\` set to '${formId}'.`);
    } else {
        console.error(`Element with ID ${formId} not found.`);
    }

    const copyButton = document.getElementById("copyButton");
    if (formId === `RemoveNonASCII-FORM`) { copyButton.style.display = "none"; }
    else { copyButton.style.display = "block"; }
}

if (localStorage.getItem("mostRecentForm")) {
    mostRecentForm = localStorage.getItem("mostRecentForm");
    showForm(mostRecentForm);
} else {
    console.log("No `mostRecentForm` found in localStorage.");
    mostRecentForm = "";
}