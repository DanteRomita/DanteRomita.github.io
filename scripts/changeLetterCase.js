function changeLetterCase() {
    let inputStr = document.getElementById("ChangeLetterCase-Textarea").value

    let upperCase = inputStr.toUpperCase()
    let lowerCase = inputStr.toLowerCase()
    let invertCase = inputStr
        .split("")
        .map(char => {
            if (char === char.toUpperCase()) return char.toLowerCase()
            else if (char === char.toLowerCase()) return char.toUpperCase()
            else return char
        })
        .join("")
    let randomCaseList = []

    for (let i = 0; i < 20; i++) {
        let randomCase = inputStr
            .split("")
            .map(char => {
                if (Math.random() > 0.5) return char.toUpperCase()
                else return char.toLowerCase()
            })
            .join("")
        randomCaseList.push(randomCase)
    }

    let delimiters = []

    if (document.getElementById("SpaceDelim").checked) delimiters.push(` `)
    if (document.getElementById("DashDelim").checked) delimiters.push(`-`)
    if (document.getElementById("UnderscoreDelim").checked) delimiters.push(`_`)
    if (document.getElementById("CommaDelim").checked) delimiters.push(`,`)

    let customDelimiterList = document.getElementById("CustomDelims").value.trim().split(`\n`)
    delimiters = delimiters.concat(customDelimiterList)
    
    let cap1stLetterOfEachWord = ` `
    for (let i = 0; i < inputStr.length; i++) {
        let capitalized = false

        for (d of delimiters) {
            if (capitalized === false && inputStr.charAt(i-1) === d) {
                cap1stLetterOfEachWord += inputStr.charAt(i).toUpperCase()
                capitalized = true
            }
        }
        if (capitalized === false) cap1stLetterOfEachWord += inputStr.charAt(i)
    }
    cap1stLetterOfEachWord = inputStr.charAt(0).toUpperCase() + cap1stLetterOfEachWord.slice(2)

    return [
        upperCase,
        lowerCase,
        invertCase,
        randomCaseList,
        cap1stLetterOfEachWord
    ]
}

function handleChanges_ChangeLetterCase() {
    let outputItems = changeLetterCase()

    const UpperCaseOutput = document.getElementById("UpperCase-Output")
    UpperCaseOutput.textContent = outputItems[0]
    const LowerCaseOutput = document.getElementById("LowerCase-Output")
    LowerCaseOutput.textContent = outputItems[1]
    const InvertCaseOutput = document.getElementById("InvertCase-Output")
    InvertCaseOutput.textContent = outputItems[2]
    const RandomizeCaseOutput = document.getElementById("RandomizeCase-Output")
    RandomizeCaseOutput.textContent = ``
    for (let i = 0; i < 20; i++) {
        let currentItem = document.createElement(`li`)
        currentItem.textContent = outputItems[3][i]
        RandomizeCaseOutput.appendChild(currentItem)
    }

    const CapitalizeFirstLetterOutput = document.getElementById("CapitalizeFirstLetter-Output")
    CapitalizeFirstLetterOutput.textContent = outputItems[4]
}

const ChangeLetterCaseTextarea = document.getElementById("ChangeLetterCase-Textarea")
ChangeLetterCaseTextarea.addEventListener("input", handleChanges_ChangeLetterCase)
const SpaceDelim = document.getElementById("SpaceDelim")
SpaceDelim.addEventListener("change", handleChanges_ChangeLetterCase)
const DashDelim = document.getElementById("DashDelim")
DashDelim.addEventListener("change", handleChanges_ChangeLetterCase)
const UnderscoreDelim = document.getElementById("UnderscoreDelim")
UnderscoreDelim.addEventListener("change", handleChanges_ChangeLetterCase)
const CommaDelim = document.getElementById("CommaDelim")
CommaDelim.addEventListener("change", handleChanges_ChangeLetterCase)
const CustomDelims = document.getElementById("CustomDelims")
CustomDelims.addEventListener("input", handleChanges_ChangeLetterCase)