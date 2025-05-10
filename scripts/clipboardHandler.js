const removeNonASCII_PS_CONST = `Get-ChildItem -File | ForEach-Object { Rename-Item -LiteralPath $_ -NewName ( [RegEx]::Replace($_.Name, '[^\\x00-\\x7F]','')) }\n`
let removeNonASCII_PS = ``

function removeNonASCII_JS(str) { return str.replace(/[^\x00-\x7F]/g, ''); }

function removeExt(fileName) {
    fileStrList = fileName.split(`.`)
    fileStrList.pop()
    let fileNoExt = ``
    for (str of fileStrList) { fileNoExt += str }
    return fileNoExt
}

function powerOp(PowerOp) {
    if (PowerOp === `Hibernate`) return `shutdown /h\n`
    if (PowerOp === `Shut Down`) return `Stop-Computer\n`
    return `\n`
}

function ytdlpHelper(Thumbnail, Subtitles, Comments, Cookies) {
    let str = ``
    if (Thumbnail) str += `--write-thumbnail --convert-thumbnails png `
    if (Subtitles) str += `--write-subs --sub-langs 'en.*,ja' `
    if (Comments) str += `--write-comments `
    if (Cookies) str += `--cookies cookies.txt `
    return str
}

const finalLine = `\n# ---REACHED END OF SCRIPT---\n`
let outputStr = ``
function outputStrBuilder() {
    let iOS_Mode = document.getElementById("iOS_Mode").checked
    console.log(`iOS_Mode: ${iOS_Mode}`)
    if (iOS_Mode) {removeNonASCII_PS = `# ${removeNonASCII_PS_CONST}`}
    else removeNonASCII_PS = removeNonASCII_PS_CONST

    outputStr = ``

    if (mostRecentForm === `YT-DLP_GUI-FORM`) {
        let URLs = document.getElementById("textarea-YT-DLP_GUI").value.trim().split("\n")

        let Video = document.getElementById("Video-YT-DLP").checked
        let Audio = document.getElementById("Audio-YT-DLP").checked
        let Thumbnail = document.getElementById("Thumbnail-YT-DLP").checked
        let Subtitles = document.getElementById("Subtitles-YT-DLP").checked
        let Comments = document.getElementById("Comments-YT-DLP").checked

        let VidRes = document.getElementById("VideoResolution-YT-DLP").value

        let Channel = document.getElementById("Channel-YT-DLP").checked
        let VidID = document.getElementById("VideoID-YT-DLP").checked
        let Cookies = document.getElementById("UseCookies-YT-DLP").checked

        let PowerOp = document.getElementById("PowerOptions-YT-DLP").value

        // Guard clauses
        if (URLs[0] === "") { alert("No URLs entered."); return false }
        if (!Video && !Audio && !Thumbnail && !Subtitles && !Comments) {
            alert("No content selected."); return false
        }

        let baseStr = `yt-dlp -o `
        if (Channel && VidID) baseStr += `'%(uploader)s - %(title)s [VidID~%(id)s].%(ext)s'`
        else if (Channel) baseStr += `'%(uploader)s - %(title)s.%(ext)s'`
        else if (VidID) baseStr += `'%(title)s [VidID~%(id)s].%(ext)s'`
        else baseStr += `'%(title)s.%(ext)s'`

        let convertType = `recode`
        if (document.getElementById("RemuxFiles-YT-DLP").checked) convertType = `remux`
        for (URL of URLs) {
            if (Video) {
                if (VidRes === `Best`) {
                    outputStr += `${baseStr} '${URL}' -f bestvideo[ext=mp4]+bestaudio/best/best[ext=mp4]/best --embed-chapters --${convertType}-video mp4 ${ytdlpHelper(Thumbnail, Subtitles, Comments, Cookies)}\n`;
                } else {
                    outputStr += `${baseStr} '${URL}' -f bestvideo[height=${VidRes}][ext=mp4]+bestaudio/best[height=${VidRes}]/best[ext=mp4]/best --embed-chapters --${convertType}-video mp4 ${ytdlpHelper(Thumbnail, Subtitles, Comments, Cookies)}\n`;
                }
            }

            if (Audio) {
                outputStr += `${baseStr} '${URL}' -x --audio-format mp3 `;
                if (!Video) outputStr += `${ytdlpHelper(Thumbnail, Subtitles, Comments, Cookies)} `;
                outputStr += `\n`;
            }

            if (!(Video || Audio)) {
                outputStr += `${baseStr} '${URL}' ${ytdlpHelper(Thumbnail, Subtitles, Comments, Cookies)} --skip-download\n`;
            }
        }

        outputStr += removeNonASCII_PS
        outputStr += powerOp(PowerOp)
        outputStr += finalLine
        return true
    }

    if (mostRecentForm === `FFMPEG_GUI-FORM`) {
        outputStr += removeNonASCII_PS

        const textareaFileList = document.getElementById("textarea-FFMPEG").value.trim().split(`\n`);
        const files = document.getElementById("fileInput-FFMPEG").files;

        if (files.length === 0 && textareaFileList[0] === ``) { alert("No file names found."); return false }

        let selectedFiles = []
        if (textareaFileList[0] !== ``) for (f of textareaFileList) selectedFiles.push(removeNonASCII_JS(f))
        else for (f of files) selectedFiles.push(removeNonASCII_JS(f.name))

        let GraphicsCardOp = document.getElementById("GraphicsCardOp").value

        let InputFileNames = document.getElementById("InputFileNames").value.split("\n").filter(item => item !== '')
        let TempOutputItems = InputFileNames.map((fileName, index) => {
            let parts = fileName.split('.');
            let fileNameWithoutExtension = parts.slice(0, parts.length - 1).join('.');
            let extension = parts[parts.length - 1];
            return `(TRIMMED) ${fileNameWithoutExtension} {${index + 1}}.${extension}`;
        });
        let StartTimes = document.getElementById("StartTimes").value.split("\n").filter(item => item !== '')
        let EndTimes = document.getElementById("EndTimes").value.split("\n").filter(item => item !== '')

        let OutputExtensions = document.getElementById("OutputExtensions").value.split("\n").filter(item => item !== "")

        let AudioFilterOp = document.getElementById("AudioFilterOp").value

        let VideoAudioMapping = document.getElementById("VideoAudioMapping").checked
        let VideoMapping = document.getElementById("VideoMapping").checked
        let AudioMapping = document.getElementById("AudioMapping").checked

        let CopyCodecs = document.getElementById("CopyCodecs").checked
        let CopyVideoCodec = document.getElementById("CopyVideoCodec").checked
        let CopyAudioCodec = document.getElementById("CopyAudioCodec").checked

        let CustomBitrate = document.getElementById("CustomBitrate").checked
        let CustomBitrateNum = document.getElementById("CustomBitrateNum").value

        let CustomFramerate = document.getElementById("CustomFramerate").checked
        let CustomFramerateNum = document.getElementById("CustomFramerateNum").value

        let CustomResolution = document.getElementById("CustomResolution").checked
        let TypeOfScaling
        if (document.getElementById("16x9_AspectRatios").checked) {
            TypeOfScaling = "16x9"
        } else if (document.getElementById("CustomScaling").checked) {
            TypeOfScaling = "CustomScaling"
        }
        let Preset_16x9_Dimensions = document.getElementById("Preset_16x9_Dimensions").value
        let ScaleType = document.getElementById("ScaleType").value
        let ScaleMultiplier = document.getElementById("ScaleMultiplier").value

        let ChangeSpeed = document.getElementById("ChangeSpeed").checked
        let SpeedMultiplier = document.getElementById("SpeedMultiplier").value

        let LoopMedia = document.getElementById("LoopMedia").checked
        let NumLoops = document.getElementById("NumLoops").value

        let ReverseMedia = document.getElementById("ReverseMedia").checked

        let PowerOp = document.getElementById("PowerOptions-FFMPEG").value

        // Trim media first if selected (Least Computationally Expensive)
        if (document.getElementById("TrimMedia").checked) {
            if (InputFileNames.length !== StartTimes.length || InputFileNames.length !== EndTimes.length) {
                alert("TRIM MEDIA: Number of input files, start times, and end times must be the same.")
                return false
            }
            for (let i = 0; i < InputFileNames.length; i++) {
                if (selectedFiles.includes(InputFileNames[i])) {
                    outputStr += `ffmpeg -ss "${StartTimes[i]}" -to "${EndTimes[i]}" -i "${InputFileNames[i].replaceAll(`$`, `\`$`)}" -c:v copy -c:a copy -map 0:v -map 0:a "${TempOutputItems[i].replaceAll(`$`, `\`$`)}"\n`
                }
            }
            selectedFiles = TempOutputItems
        }

        let hwAccelStr = ``
        if (GraphicsCardOp === `h264_nvenc`) hwAccelStr = `-hwaccel cuda -hwaccel_output_format cuda`

        let loopStr = ``
        if (LoopMedia && NumLoops !== ``) loopStr = `-stream_loop ${NumLoops}`

        // Handle modification parameters for output files
        let modifications = ``

        if (GraphicsCardOp !== `None_UseCPU`) modifications += `-c:v ${GraphicsCardOp} `
        if (GraphicsCardOp === `h264_nvenc`) modifications += `-preset slow -cq 28 -b:v 0 `

        if (CopyCodecs && CopyVideoCodec) modifications += `-c:v copy `
        if (CopyCodecs && CopyAudioCodec) modifications += `-c:a copy `

        if (VideoAudioMapping && VideoMapping) modifications += `-map 0:v `
        if (VideoAudioMapping && AudioMapping) modifications += `-map 0:a `

        let vfFilters = ``
        let afFilters = ``

        if (AudioFilterOp === `NormalizeAudio`) afFilters += `loudnorm,`

        if (CustomResolution) {
            if (TypeOfScaling === `16x9`) {
                vfFilters += `scale=${Preset_16x9_Dimensions},`
            } else if (TypeOfScaling === `CustomScaling`) {
                vfFilters += `scale=iw*${ScaleMultiplier}:ih*${ScaleMultiplier}:-1`
                if (ScaleType !== `None`) vfFilters += `:flags=${ScaleType},`
            }

            if (OutputExtensions.includes(`gif`)) vfFilters += `split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse,`
        }

        if (ReverseMedia) {
            vfFilters += `reverse,`
            afFilters += `areverse,`
        }

        if (ChangeSpeed && SpeedMultiplier !== ``) {
            vfFilters += `setpts=PTS/${SpeedMultiplier},`
            afFilters += `atempo=${SpeedMultiplier},`
        }

        // Remove the trailing comma from the filters if they are not empty
        vfFilters = vfFilters.replace(/(^,)|(,$)/g, ``)
        afFilters = afFilters.replace(/(^,)|(,$)/g, ``)

        let vfStr = `-vf "${vfFilters}" `
        let afStr = `-af "${afFilters}" `

        if (!CopyVideoCodec && vfFilters != ``) modifications += vfStr
        if (AudioFilterOp === `RemoveAudio`) modifications += `-an `
        else if (!CopyAudioCodec && afFilters != ``) modifications += afStr

        if (CustomBitrate && CustomBitrateNum !== ``) modifications += `-b:v ${CustomBitrateNum}k -bufsize ${CustomBitrateNum}k `
        if (CustomFramerate && CustomFramerateNum !== ``) modifications += `-r ${CustomFramerateNum} `

        modifications = modifications.trim()

        for (inFile of selectedFiles) {
            inFile.replaceAll(`$`, `\`$`)

            let outFile
            if (document.getElementById("ConvertFileType").checked && OutputExtensions.length > 0) { // Use corresponding extensions in OutputExtensions
                for (ext of OutputExtensions) {
                    if (document.getElementById("AppendToEnd").checked) outFile = `${removeExt(inFile)} (OUTPUT).${ext}`
                    else outFile = `(OUTPUT) ${removeExt(inFile)}.${ext}`
                    outputStr += `ffmpeg ${hwAccelStr} ${loopStr} -i "${inFile}" ${modifications} "${outFile}"\n`
                }
            } else {
                let ext = inFile.split(`.`).pop();
                if (document.getElementById("AppendToEnd").checked) outFile = `${inFile} (OUTPUT).${ext}`
                else outFile = `(OUTPUT) ${inFile}`
                outputStr += `ffmpeg ${hwAccelStr} ${loopStr} -i "${inFile}" ${modifications} "${outFile}"\n`
            }
        }

        if (document.getElementById("TrimMedia").checked) {
            outputStr += `# Remove Temporary Files\n`
            for (tempFile of TempOutputItems) {
                outputStr += `Remove-Item -LiteralPath "${tempFile}"\n`
            }
        }

        // Finalize Script
        outputStr += powerOp(PowerOp);
        outputStr += finalLine;
        return true
    }

    if (mostRecentForm === `AudioAndImageToVideo-FORM`) {
        outputStr += removeNonASCII_PS

        const textareaFileList = document.getElementById("textarea-AAITV").value.trim().split(`\n`);
        const files = document.getElementById("fileInput-AAITV").files;

        if (files.length === 0 && textareaFileList[0] === ``) { alert("No file names found."); return false }

        let selectedFiles = []
        if (textareaFileList[0] !== ``) for (f of textareaFileList) selectedFiles.push(removeNonASCII_JS(f))
        else for (f of files) selectedFiles.push(removeNonASCII_JS(f.name))

        NormalizeAudio = document.getElementById("NormalizeAudio-AAITV").checked
        UseBlackImage = document.getElementById("UseBlackImage").checked

        for (f of selectedFiles) {
            inFile = removeExt(f)
            f.replaceAll(`$`, `\`$`)
            if (f.split(`.`).pop() == `mp3`) {
                pngStr = UseBlackImage ? `_black.jpg` : `${inFile}.png`
                normalizeStr = NormalizeAudio ? `-af "loudnorm"` : ``
                outputStr += `ffmpeg -loop 1 -i "${pngStr}" -i "${inFile}.mp3" ${normalizeStr} -pix_fmt yuv420p -shortest "${inFile}.mp4"\n`
            } else {
                alert(`Ensure that ONLY MP3 files are uploaded/entered.`)
                return false
            }
        }

        let PowerOp = document.getElementById("PowerOptions-AAITV").value
        outputStr += powerOp(PowerOp);
        outputStr += finalLine

        return true
    }

    if (mostRecentForm === `AddMP3CoverImages-FORM`) {
        outputStr += removeNonASCII_PS

        const textareaFileList = document.getElementById("textarea-MP3Cover").value.trim().split(`\n`);
        const files = document.getElementById("fileInput-MP3Cover").files;

        if (files.length === 0 && textareaFileList[0] === ``) { alert("No file names found."); return false }

        let selectedFiles = []
        if (textareaFileList[0] !== ``) for (f of textareaFileList) selectedFiles.push(removeNonASCII_JS(f))
        else for (f of files) selectedFiles.push(removeNonASCII_JS(f.name))

        for (mp3File of selectedFiles) {
            if (mp3File.split(`.`).pop() == `mp3`) {
                outputStr += `ffmpeg -i "${mp3File}" -i "${removeExt(mp3File)}.png" -c copy -map 0 -map 1 -metadata:s:v comment="Cover (Front)" "(COVER-ADDED) ${mp3File}"\n`
            } else {
                alert(`Ensure that ONLY MP3 files are uploaded/entered.`)
                return false
            }
        }

        let PowerOp = document.getElementById("PowerOptions-MP3Cover").value
        outputStr += powerOp(PowerOp);
        outputStr += finalLine

        return true
    }

    if (mostRecentForm === `RemoveLineBreaks-FORM`) {
        rlbOutput = document.getElementById("RemoveLineBreaks-Output").textContent;
        if (rlbOutput.trim() === ``) {
            alert("Output cannot be empty!");
            return false
        }

        outputStr = rlbOutput
        return true
    }

    if (mostRecentForm === `FileName_UrlConverter-FORM`) {
        let fileUrlOutput = fileUrlConverter()
        if (fileUrlOutput === undefined) {
            alert("No input provided.");
            return false
        }
        else if (!fileUrlOutput) {
            alert(`Ensure that your file names adhere to the valid format for your specified platform.`)
            return false
        }

        outputStr = fileUrlOutput
        return true
    }

    /*
    if (mostRecentForm === `RemoveNonASCII-FORM`) {
        // Handled in HTML file
    }
    */

    // if (mostRecentForm === `ChangeLetterCase-FORM`) {
    //     // Handled in HTML file
    // }

    if (mostRecentForm === `Listify-FORM`) {
        outputStr = listify_basic()
        return true
    }
}

document.getElementById("copyButton").addEventListener("click", function () {
    if (outputStrBuilder()) {
        navigator.clipboard.writeText(outputStr);
        alert("Output copied to clipboard!");
    }
})

// document.getElementById("downloadButton").addEventListener("click", function () {
//     if (scriptBuilder()) {
//         const blob = new Blob([commandStr], { type: "text/plain" });
//         const url = URL.createObjectURL(blob);

//         const a = document.createElement("a");
//         a.style.display = "none";
//         a.href = url;
//         a.download = "file_paths.ps1";
//         document.body.appendChild(a);
//         a.click();
//         URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//     }


//     // const files = document.getElementById("fileInput").files;
//     // if (files.length === 0) {
//     //     alert("No files selected.");
//     //     return;
//     // }

//     // scriptBuilder()

//     // for (let i = 0; i < files.length; i++) {
//     //     const file = files[i];
//     //     const fileName = file.name;
//     //     commandStr += `File Name: ${fileName}`;
//     // }

//     // const blob = new Blob([commandStr], { type: "text/plain" });
//     // const url = URL.createObjectURL(blob);

//     // const a = document.createElement("a");
//     // a.style.display = "none";
//     // a.href = url;
//     // a.download = "file_paths.ps1";
//     // document.body.appendChild(a);
//     // a.click();
//     // URL.revokeObjectURL(url);
//     // document.body.removeChild(a);

//     // alert('Your file has been downloaded!');
// });