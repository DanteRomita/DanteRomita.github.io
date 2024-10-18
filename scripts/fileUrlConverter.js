function fileUrlConverter() {
    // const Output_FileNameURL_ = document.getElementById("FileNameURL-Output")
    // Output_FileNameURL_.textContent = ``

    let InputItems
    if (document.getElementById("FileNamesOrURLs-Textarea").value.trim() !== ``) {
        InputItems = document.getElementById("FileNamesOrURLs-Textarea").value.trim().split("\n")
    } else if (document.getElementById("fileInput-FileNameURL").files[0] !== undefined) {
        let fileList = document.getElementById("fileInput-FileNameURL").files
        InputItems = []
        for (f of fileList) InputItems.push(f.name)
    } else {
        return undefined
    }

    InputItems = InputItems.map(str => str.replace(`https://`, ``))
    let ConversionType = document.getElementById("FileNameURL-ConversionType").value
    let Platform = document.getElementById("FileNameURL-Platform").value
    let OptDiscordEmb = document.getElementById("OptDiscordEmb").checked

    try {
        let OutputItems = []
        if (ConversionType === "FileName_to_URL") {
            let delimiter = `-`
            if (Platform === `Instagram`) delimiter = `~IG~`
            if (Platform === `Newgrounds`) delimiter = `~NG~`
            if (Platform === `DeviantArt`) delimiter = `~DA~`
            if (Platform === `Pixiv`) delimiter = `_`
            if (Platform === `FurAffinity`) delimiter = `.`

            InputItems = InputItems.map(str => str.split(delimiter))

            switch (Platform) {
                case `Twitter`:
                    for (file of InputItems) {
                        let account = file[0]
                        let id = file[1].split(`.`)[0]

                        let embPrefix = ``
                        if (OptDiscordEmb) embPrefix = `fixup`
                        OutputItems.push(`https://${embPrefix}x.com/${account}/status/${id}`)
                    }
                    break;
                case `Tumblr`:
                    for (file of InputItems) {
                        let account = file[0]
                        let id = file[1].split(`.`)[0]
                        OutputItems.push(`https://tumblr.com/${account}/${id}`)
                    }
                    break;
                case `Bluesky`:
                    for (file of InputItems) {
                        let account = file[0]
                        let id = file[1].split(`.`)[0]

                        let embPrefix = `bsky`
                        if (OptDiscordEmb) embPrefix = `bsyy`
                        OutputItems.push(`https://${embPrefix}.app/profile/${account}.bsky.social/post/${id}`)
                    }
                    break;
                case `Threads`:
                    for (file of InputItems) {
                        let account = file[0]
                        let id = file[1].split(`.`)[0]
                        OutputItems.push(`https://www.threads.net/${account}/post/${id}`)
                    }
                    break;
                case `Instagram`:
                    for (file of InputItems) {
                        let id = file[1].split(`.`)[0]

                        let embPrefix = ``
                        if (OptDiscordEmb) embPrefix = `dd`
                        OutputItems.push(`https://www.${embPrefix}instagram.com/p/${id}`)
                    }
                    break;
                case `Newgrounds`:
                    for (file of InputItems) {
                        let account = file[0]
                        let postName = file[1].split(`.`)[0]
                        OutputItems.push(`https://www.newgrounds.com/art/view/${account}/${postName}`)
                    }
                    break;
                case `Reddit`:
                    for (file of InputItems) {
                        let subreddit = file[1]
                        let id = file[2]
                        let postName = file[3].split(`.`)[0]
                        OutputItems.push(`https://www.reddit.com/r/${subreddit}/comments/${id}/${postName}`)
                    }
                    break;
                case `DeviantArt`:
                    for (file of InputItems) {
                        let account = file[0]
                        let postNameAndId = file[1]
                        OutputItems.push(`https://www.deviantart.com/${account}/art/${postNameAndId}`)
                    }
                    break;
                case `Pixiv`:
                    for (file of InputItems) {
                        let id = file[1]
                        let embPrefix = ``
                        if (OptDiscordEmb) embPrefix = `h`
                        OutputItems.push(`https://www.p${embPrefix}ixiv.net/en/artworks/${id}`)
                    }
                    break;
                case `FurAffinity`:
                    for (file of InputItems) {
                        let id = file[1]
                        OutputItems.push(`https://www.furaffinity.net/view/${id}`)
                    }
                    break;
                case `Pillowfort`:
                    for (file of InputItems) {
                        let id = file[1].split(`.`)[0]
                        OutputItems.push(`https://www.pillowfort.social/posts/${id}`)
                    }
                    break;
            }

        } else if (ConversionType === "URL_to_FileName") {
            InputItems = InputItems.map(str => str.split(`/`))

            switch (Platform) {
                case `Twitter`:
                    for (url of InputItems) {
                        let account = url[1]
                        let id = url[3].split(`?`)[0]
                        OutputItems.push(`${account}-${id}-TWITTER`)
                    }
                    break;
                case `Tumblr`:
                    for (url of InputItems) {
                        let account = url[1]
                        let id = url[2].split(`?`)[0]
                        OutputItems.push(`${account}-${id}-TUMBLR`)
                    }
                    break;
                case `Bluesky`:
                    for (url of InputItems) {
                        let account = url[2].split(`.`)[0]
                        let id = url[4]
                        OutputItems.push(`${account}-${id}-BLUESKY`)
                    }
                    break;
                case `Threads`:
                    for (url of InputItems) {
                        let account = url[1]
                        let id = url[3]
                        OutputItems.push(`${account}-${id}-THREADS`)
                    }
                    break;
                case `Instagram`:
                    for (url of InputItems) {
                        let id = url[2]
                        let CustomAccName = document.getElementById("CustomAccName").value
                        OutputItems.push(`${CustomAccName}~IG~${id}~IG~INSTAGRAM`)
                    }
                    break;
                case `Newgrounds`:
                    for (url of InputItems) {
                        let account = url[3]
                        let postName = url[4]
                        OutputItems.push(`${account}~NG~${postName}~NG~NEWGROUNDS`)
                    }
                    break;
                case `Reddit`:
                    for (url of InputItems) {
                        let subreddit = url[2]
                        let id = url[4]
                        let postName = url[5]

                        let CustomAccName = `UnknownAccountName`
                        if (document.getElementById("CustomAccName").value) CustomAccName = `${document.getElementById("CustomAccName").value}`
                        OutputItems.push(`${CustomAccName}-${subreddit}-${id}-${postName}-REDDIT`)
                    }
                    break;
                case `DeviantArt`:
                    for (url of InputItems) {
                        let account = url[1]
                        let postNameAndId = url[3]
                        OutputItems.push(`${account}~DA~${postNameAndId}`)
                    }
                    break;
                case `Pixiv`:
                    for (url of InputItems) {
                        let id = url[3]
                        let CustomAccName = document.getElementById("CustomAccName").value
                        OutputItems.push(`$${CustomAccName}_${id}_PIXIV`)
                    }
                    break;
                case `FurAffinity`:
                    for (url of InputItems) {
                        let id = url[2]
                        let CustomAccName = document.getElementById("CustomAccName").value
                        OutputItems.push(`${CustomAccName}.${id}.FURAFFINITY`)
                    }
                    break;
                case `Pillowfort`:
                    for (url of InputItems) {
                        let id = url[2]
                        let CustomAccName = document.getElementById("CustomAccName").value
                        OutputItems.push(`${CustomAccName}-${id}-PILLOWFORT`)
                    }
                    break;
            }
        }
        return OutputItems.join(`\n`)
    } catch (err) {
        return false
    }
}

function handleChanges_FileNameURL() {
    outputElement = document.getElementById("FileNameURL-Output")
    outputElement.textContent = ``

    let output
    try {
        output = fileUrlConverter().split(`\n`)
        if (output) {
            for (item of output) {
                new_li = document.createElement("li")
                if (item.startsWith(`https://`)) {
                    new_a = document.createElement("a")
                    new_a.href = item
                    new_a.textContent = item
                    new_li.appendChild(new_a)
                } else new_li.textContent = item
                outputElement.appendChild(new_li)
            }
        } else outputElement.textContent = ``
    } catch { }
}

const fileInput_FileNameURL_Element = document.getElementById("fileInput-FileNameURL")
const FileNamesOrURLs_Textarea_Element = document.getElementById("FileNamesOrURLs-Textarea")
const DiscordEmb_Element = document.getElementById("OptDiscordEmb")
const ConversionType_Element = document.getElementById("FileNameURL-ConversionType")
const Platform_Element = document.getElementById("FileNameURL-Platform")
const CustomAccName_Element = document.getElementById("CustomAccName")

fileInput_FileNameURL_Element.addEventListener('change', handleChanges_FileNameURL);
FileNamesOrURLs_Textarea_Element.addEventListener('input', handleChanges_FileNameURL);
DiscordEmb_Element.addEventListener('change', handleChanges_FileNameURL);
ConversionType_Element.addEventListener('change', handleChanges_FileNameURL);
Platform_Element.addEventListener('change', handleChanges_FileNameURL);
CustomAccName_Element.addEventListener('input', handleChanges_FileNameURL);