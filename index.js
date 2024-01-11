const colorPicker = document.getElementById("color-picker")
const colorMode = document.getElementById("select-color-mode")
const getColorSchemeBtn = document.getElementById("get-color-scheme-btn")
let cleanHexColorValue = ""
let colorModeValue = ""

window.onload = () => {
    setColorValues()
    getColorScheme() // Load default color scheme
}
colorPicker.addEventListener("change", setColorValues)
colorMode.addEventListener("change", setColorValues)

function setColorValues() {
    const hexColorValue = colorPicker.value // Needs to be placed within the function in order to load schemes
    cleanHexColorValue = hexColorValue.slice(1) // Remove the "#" from the hex color value
    colorModeValue = colorMode.value
}

getColorSchemeBtn.addEventListener("click", getColorScheme)

function getColorScheme() {
    fetch(
        `https://www.thecolorapi.com/scheme?hex=${cleanHexColorValue}&mode=${colorModeValue}&count=5`
    )
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("Network response was not ok")
            }
            return resp.json()
        })
        .then((data) => {
            const colorScheme = document.getElementById("color-scheme")
            const colorsArray = data.colors
            colorScheme.innerHTML = ""
            colorsArray.forEach((color) => {
                const divEl = document.createElement("div")
                divEl.className = "color-col"
                divEl.dataset.hexColor = color.hex.value
                divEl.style.backgroundColor = color.hex.value
                divEl.innerHTML = `<p class="color-label" data-hex-color="${color.hex.value}">${color.hex.value}</p>`
                colorScheme.appendChild(divEl)
            })
            copyColorValueToClipboard()
        })
        .catch((error) => {
            // Display a notification to the user
            alert(
                "There was an issue retrieving the color scheme. Please try again later."
            )
            console.error("Error fetching color scheme:", error)
        })
}

function copyColorValueToClipboard() {
    const colorCols = document.querySelectorAll(".color-col")
    colorCols.forEach((colorCol) => {
        colorCol.addEventListener("click", (e) => {
            const targetCol = e.target
            navigator.clipboard.writeText(targetCol.dataset.hexColor)
            alert("Copied to clipboard: " + targetCol.dataset.hexColor)
        })
    })
}



