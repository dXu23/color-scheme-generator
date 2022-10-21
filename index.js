
const formElem = document.querySelector('form');
const colorsChildren = document.getElementById('colors').children;

for (const colorChild of colorsChildren) {
    colorChild.addEventListener('click', async (evt) => {
        const colorToCopy = evt.currentTarget.querySelector('.color-name').textContent;
        if (!colorToCopy) {
            return;
        }
        
        if (!navigator.clipboard) {
            let textArea = document.createElement("textarea");
            textArea.value = colorToCopy;

            // Avoid scrolling to bottom
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";

            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                let successful = document.execCommand('copy');
                if (!successful) {
                    console.log('Fallback: Copying text command was ' + msg);
                }
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }

            document.body.removeChild(textArea);
        }

        try {
            await navigator.clipboard.writeText(colorToCopy);
        } catch (err) {
            console.error(`Async: could not copy text: ${err}`);
        }
    })
}

formElem.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    
    const seedColor = evt.currentTarget['seed'].value.slice(1);
    const scheme = evt.currentTarget['mode'].value;
    
    const apiUrl = `https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${scheme}&count=5`;
    const schemeData = await fetch(apiUrl);
    const schemeJson = await schemeData.json();
    
    const colors = schemeJson.colors;
    colors.forEach((color, i) => {
        colorsChildren[i].style.background = color.hex.value;
        colorsChildren[i].querySelector('.color-name').textContent = color.hex.value;
    });
});