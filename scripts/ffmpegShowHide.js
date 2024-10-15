function ffmpegShowHide(id) {
    let checkbox = document.getElementById(id);
    let fieldsetID = `${id}-Options`

    if (checkbox.checked) {
        document.getElementById(fieldsetID).style.display = "block";
    } else {
        document.getElementById(fieldsetID).style.display = "none";
    }
}

