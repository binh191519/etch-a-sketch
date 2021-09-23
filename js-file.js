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
            let alpha = +bg.slice(14, 17);      
            alpha += 0.1;
            div.style.background = `rgba(0,0,0,${alpha})`;
        })   
    })
}

const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    let px = prompt('How much squares per side do you want?');
    while (!(px > 0 && px < 100)) {
        px = prompt('Invalid number! Try again:');
    }
    makeGrid(px);
})
