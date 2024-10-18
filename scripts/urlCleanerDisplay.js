function urlCleaner() {
    let URLsToClean = document.getElementById("UrlCleaner-Textarea").value.trim().split("\n")
    let urlType = document.getElementById("UrlCleaner-UrlType").value

    for (url of URLsToClean) {
        url = url.replace(`www.`, ``)
        url = url.split(`?`)[0]
    }

    let newURLs = []
    for (url of URLsToClean) {
        let tempURL = ``
        switch (urlType) {
            case `Article`:
                tempURL = url.split(`#:~:text=`)[0]
            case `Tumblr`:
                let splitURL = url.split(`/`)
                tempURL = ``
                if (!/^[\u0030-\u0039]*$/.test(splitURL[splitURL.length - 1])) {
                    // If non-numeric character exists in last part of URL, then...
                    splitURL.pop()
                    for (part of splitURL) tempURL += `${part}/`
                    tempURL = url.slice(0, -1)    // Removes final slash
                } else tempURL = url
            default:
                tempURL = url
        }
        newURLs.push(tempURL)
    }
    return newURLs
}

function handleChanges_UrlCleaner() {
    const urlCleanerOutput = document.getElementById("UrlCleaner-Output")
    urlCleanerOutput.textContent = ``
    let urls = urlCleaner()
    for (url of urls) {
        let li = document.createElement(`li`)
        let a = document.createElement(`a`)
        a.href = url
        a.textContent = url
        li.appendChild(a)
        urlCleanerOutput.appendChild(li)
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const urlCleanerTextarea = document.getElementById("UrlCleaner-Textarea")
    urlCleanerTextarea.addEventListener("input", function() {
        handleChanges_UrlCleaner()
    })
    const urlType = document.getElementById("UrlCleaner-UrlType")
    urlType.addEventListener("change", function() {
        handleChanges_UrlCleaner()
    })
})