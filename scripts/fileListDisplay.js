document.querySelectorAll(".fileInput").forEach(function (inputElement) {
    inputElement.addEventListener("change", function (event) {
        const files = event.target.files;
        const fileListId = inputElement.id.replace("fileInput-", "fileList-"); // Get corresponding fileList ID
        const fileList = document.getElementById(fileListId);

        fileList.textContent = ""; // Clear previous entries

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileName = file.name;

            const fileEntry = document.createElement("li");
            if (inputElement.id === `fileInput-RemoveNonASCII`) fileEntry.textContent = removeNonASCII_JS(fileName);
            else fileEntry.textContent = fileName;
            
            fileList.appendChild(fileEntry);
        }
    });
});

document.querySelectorAll(".clearFiles").forEach(function(clearBtn) {
    clearBtn.addEventListener("click", function () {
        let formType = clearBtn.id.split("-").pop();

        const fileInputElement = document.getElementById(`fileInput-${formType}`);
        const fileListElement = document.getElementById(`fileList-${formType}`);

        fileInputElement.value = "";
        fileListElement.textContent = "";
    })
})