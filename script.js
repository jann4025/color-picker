'use strict'
document.addEventListener('DOMContentLoaded', start);

function start() {
    console.log('Connection between the DOM and the Script was successfull! Nice 😎');
    let scheme = "analogous";
    document.querySelector("input").addEventListener("input", selectColor);


    function selectColor(event) {
        let color = event.target.value;
        hexToRgb(color);
    }

    function hexToRgb(color) {
        let hex;
        if (color.substring(0, 1) == '#') {
            hex = color.substring(1);
        }
        const rgb = {};
        rgb.r = parseInt(hex.substring(0, 2), 16);
        rgb.g = parseInt(hex.substring(2, 4), 16);
        rgb.b = parseInt(hex.substring(4), 16);
        rgbToHsl(color, rgb);
    }

    function rgbToHsl(color, rgb) {
        const rgbConvert = {};
        rgbConvert.r = rgb.r;
        rgbConvert.g = rgb.g;
        rgbConvert.b = rgb.b;

        rgbConvert.r /= 255;
        rgbConvert.g /= 255;
        rgbConvert.b /= 255;

        let h, s, l;

        const min = Math.min(rgbConvert.r, rgbConvert.g, rgbConvert.b);
        const max = Math.max(rgbConvert.r, rgbConvert.g, rgbConvert.b);

        if (max === min) {
            h = 0;
        } else
        if (max === rgbConvert.r) {
            h = 60 * (0 + (rgbConvert.g - rgbConvert.b) / (max - min));
        } else
        if (max === rgbConvert.g) {
            h = 60 * (2 + (rgbConvert.b - rgbConvert.r) / (max - min));
        } else
        if (max === rgbConvert.b) {
            h = 60 * (4 + (rgbConvert.r - rgbConvert.g) / (max - min));
        }

        if (h < 0) {
            h = h + 360;
        }

        l = (min + max) / 2;

        if (max === 0 || min === 1) {
            s = 0;
        } else {
            s = (max - l) / (Math.min(l, 1 - l));
        }


        s *= 100;
        l *= 100;



        const hsl = `${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%`;
        showSourceColor(color, rgb, hsl);
        convertColoHsl(1, hsl);
        convertColoHsl(2, hsl);
        convertColoHsl(3, hsl);
        convertColoHsl(4, hsl);
    }

    function showSourceColor(color, rgb, hsl) {
        //Source color
        document.querySelector(".source-color .box").style.backgroundColor = color;
        document.querySelector(".source-color .info .hex-output").textContent = `HEX: ${color}`;
        document.querySelector(".source-color .info .rgb-output").textContent = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        document.querySelector(".source-color .info .hsl-output").textContent = `HSL: ${hsl}`;
        //Source color end
    }

    function showColor(id, h, s, l) {
        const colorId = id;
        const box = document.querySelector(`.color${colorId} .box`).style.backgroundColor;
        console.log(box);
        document.querySelector(`.color${colorId} .box`).style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
        // document.querySelector(`.source-color .info .hex-output`).textContent = `HEX: ${color}`;
        document.querySelector(`.color${colorId} .info .rgb-output`).textContent = box;
        document.querySelector(`.color${colorId} .info .hsl-output`).innerHTML = `HSL: ${h}, ${s}, ${l}`;
    }


    function convertColoHsl(num, hsl) {
        let id = num;
        hsl = hsl.split(" ");
        let h = hsl[0].slice(0, -1);
        h = parseInt(h, 10);
        let s = hsl[1].slice(0, -1);
        s = parseInt(s, 10);
        let l = hsl[2].slice(0, -1);
        l = parseInt(l, 10);
        if (id === 1) {
            h = h - 60;
        } else if (id === 2) {
            h = h - 30;
        } else if (id === 3) {
            h = h += 9;
        } else if (id === 4) {
            h = h += 18;
        }
        showColor(id, h, s, l);
        hslToRgb(h, s, l);
        console.log(hslToRgb(h, s, l));
    }

    function hslToRgb(h, s, l) {

    }

}