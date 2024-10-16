document.addEventListener("DOMContentLoaded", function () {
    const rlbTextarea = document.getElementById("RemoveLineBreaks-Textarea");
    
    rlbTextarea.addEventListener("input", function () {
        document.getElementById("RemoveLineBreaks-Output").textContent = rlbTextarea.value.replace(/\n/g, " ")
    })
})