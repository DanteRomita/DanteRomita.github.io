function listify() {
    let textToListify = document.getElementById("Listify-Textarea").value.trim().replace(/\s+/g, ' ')
    let delimiter = document.getElementById("Delimiter-Listify").value
    return `- ${textToListify.replaceAll(delimiter, `\n- `)}`
}

function handleChanges_Listify() {
    document.getElementById("Listify-Output").textContent = ``
    let displayText = listify().split(`\n`)
    for (line of displayText) {
        let li = document.createElement(`li`)
        li.textContent = line
        document.getElementById("Listify-Output").appendChild(li)
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const listify_textarea = document.getElementById("Listify-Textarea");
    listify_textarea.addEventListener("input", function () {
        handleChanges_Listify()
    })
    listify_delimiter = document.getElementById("Delimiter-Listify")
    listify_delimiter.addEventListener("input", function () {
        handleChanges_Listify()
    })
})