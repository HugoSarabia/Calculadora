
let screenResult = document.querySelector(".screen-result");
let btnOp = document.querySelectorAll(".btn-op");
let btn = document.querySelectorAll(".btn");
let btnEqual = document.querySelector(".btn-equal");
let btnClear = document.querySelector(".btn-clear");
let result = 0;
let num1 = 0;
let num2 = 0;
let op = "";
let opActual = "";
let screenWidth = screenResult.clientWidth;

function getTextWidth(text, font) {
    const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }
  function getCssStyle(element, prop) {
    return window.getComputedStyle(element, null).getPropertyValue(prop);
}

function getCanvasFont(el = document.body) {
  const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
  const fontSize = getCssStyle(el, 'font-size') || '16px';
  const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';
  
  return `${fontWeight} ${fontSize} ${fontFamily}`;
}

localStorage.setItem('width', 0)


btnOp.forEach((el) => {
	el.addEventListener("click", (e) => {
        if(el.classList.contains("btn-op")){
            opActual = el.textContent;
            screenResult.textContent = 0;
        }
	});
});

btn.forEach((el) => {
	el.addEventListener("click", (e) => {
        console.log('opActual: ' + opActual.length);
        console.log('num1: ' + num1);
        console.log('num2: ' + num2);
		if (!(e.target.classList.contains("btn-op")) && !(e.target.classList.contains("btn-equal"))) {
            if(opActual.length > 0){
                num2 += el.textContent
            }else{
                num1 += el.textContent
            }
			if (screenResult.textContent == 0) {
				if (!(el.textContent == 0)) {
					if (el.classList.contains("dot")) {
						if (!screenResult.textContent.includes(".")) {
							screenResult.textContent += el.textContent;
						} else {
							el.disable = "true";
						}
					}else{
                        screenResult.textContent = "";
                        screenResult.textContent += el.textContent;
                    }
				}
			} else {
				if (el.classList.contains("dot")) {
					if (!screenResult.textContent.includes(".")) {
						screenResult.textContent += el.textContent;
					} else {
						el.disable = "true";
					}
				}else{
                    screenResult.textContent += el.textContent;
                }
			}
            
            if(!(screenResult.textContent.length > 11)){
                let textWidth = getTextWidth(screenResult.textContent, screenResult);
                let storage = localStorage.getItem('width')
                let screenResultStyle = window.getComputedStyle(screenResult, null).getPropertyValue('font-size')
                let screenResultFontSize = parseFloat(screenResultStyle)
                if((storage * 8) > screenWidth){  
                    screenResult.style.fontSize = (screenResultFontSize - 8) + "px" ;
                    localStorage.setItem('width', textWidth - 5)
                }else{
                    localStorage.setItem('width', textWidth)
                }
            }else{
                screenResult.textContent = screenResult.textContent.slice(0, -1);
            }
		}
	});
});


btnEqual.addEventListener("click", (e) => {
    if (screenResult.textContent != 0) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        switch (opActual) {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "x":
                result = num1 * num2;
                break;
            case "÷":
                result = num1 / num2;
                break;
        }
        screenResult.textContent = result;
        num1 = result;
        num2 = 0;
        op = opActual;
    }
})

btnClear.addEventListener("click", (e) => {
    screenResult.textContent = 0;
    num1 = 0;
    num2 = 0;
    op = "";
    opActual = "";
    localStorage.setItem('width', 0)
    screenResult.style.fontSize = "70px";
})