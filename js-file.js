let isRed = false;
let isGreen = false;
let isBlue = false;

const container = document.getElementById('container');

function makeGrid(n) {
    container.style.cssText = `grid-template-columns: repeat(${n}, 1fr)`
    for (let i = 1; i <= n*n; i++) {
        const div = document.createElement('div');
        div.innerText = i;
        container.appendChild(div).className = "div";
        div.innerText = "";
    }
    mouseOver();
}
makeGrid(16);

function mouseOver() {
    const divs = document.querySelectorAll('.div');
    divs.forEach((div) => {
        div.addEventListener('mouseover', () => {
            const bg = div.style.background;

            console.log(bg);

            let red = 0;
            let green = 0;
            let blue = 0;
            let alpha;
            if (!bg) alpha = 0;
            else if (!alpha) alpha = 1;

            //update rgba
            let count = 0;
            for(let i = 0; i < bg.length; i++) {
                if (bg[i] == ',') count++;

                if (count == 0 && bg[i] == '(') {
                    for (let j = i+1; j < bg.length; j++) {
                        if (bg[j] == ',') break;
                        red = red*10 + +bg[j];
                    }
                }

                if (count == 1 && bg[i] == ',') {
                    for (let j = i+2; j < bg.length; j++) {
                        if (bg[j] == ',') break;
                        green = green*10 + +bg[j];
                    }
                }

                if (count == 2 && bg[i] == ',') {
                    for (let j = i+1; j < bg.length; j++) {
                        if (bg[j] == ',' || bg[j] == ')') break;
                        blue = blue*10 + +bg[j];
                    }
                }

                if (count == 3 && bg[i] == ',') {
                    alpha = +bg.slice(i+2, i+5);
                }
            }

            if (isRed) red += 26;
            if (isGreen) green += 26;
            if (isBlue) blue += 26;
            if (alpha >= 0 && alpha < 1) {
                alpha += 0.1;
            }

            div.style.background = `rgba(${red},${green},${blue},${alpha})`;  
        })   
    })
}

const clearBtn = document.getElementsByClassName('name');
clearBtn[0].addEventListener('click', () => {
    console.clear();

    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    let px = prompt('How much squares per side do you want?');
    
    while (!(px > 0 && px < 100)) {
        if (px == '') {
            px = 16;
        }
        else px = prompt('Invalid number! Try again:');
    }
    makeGrid(px);
})

const colors = document.querySelectorAll('.color');
colors.forEach((color) => {
    color.addEventListener('click', () => {
        console.log(color.className) 

        if (color.className == 'color red') isRed = !isRed;
        else if (color.className == 'color green') isGreen = !isGreen;
        else if (color.className == 'color blue') isBlue = !isBlue;

        if (color.style.border != 'solid black') color.style.border = 'solid black';
        else color.style.border = 'solid #eee';
    })
})

