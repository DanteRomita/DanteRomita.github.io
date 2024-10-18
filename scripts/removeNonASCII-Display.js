document.addEventListener("DOMContentLoaded", function () {
    const rnASCII_textarea = document.getElementById("RemoveNonASCII-Textarea");
    
    rnASCII_textarea.addEventListener("input", function () {
        document.getElementById("RemoveNonASCII-Output").textContent = removeNonASCII_JS(rnASCII_textarea.value)
    })
})