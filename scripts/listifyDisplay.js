function listify_basic(textToListify, delimiter) {
    console.log(textToListify)
    return `- ${textToListify.replaceAll(delimiter, `\n- `)}`
}

function listify_newLine(textToListify) {
    lines = textToListify.split(`\n`)
    return lines.map(line => `- ${line}`)
}

function handleChanges_Listify() {
    let textToListify = document.getElementById("Listify-Textarea").value.trim()//.replace(/\s+/g, ' ')

    document.getElementById("Listify-Output").textContent = ``
    let delimiter = document.getElementById("Delimiter-Listify").value
    let displayText

    if (delimiter === `NewLine`) displayText = listify_newLine(textToListify)
    else displayText = listify_basic(textToListify, delimiter).split(`\n`)

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