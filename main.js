$(document).ready(function () {
    function getAverageRGB(imgEl) {

        var blockSize = 5, // only visit every 5 pixels
            defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = { r: 0, g: 0, b: 0 },
            count = 0;

        if (!context) {
            return defaultRGB;
        }

        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

        context.drawImage(imgEl, 0, 0);

        try {
            data = context.getImageData(0, 0, width, height);
        } catch (e) {
            /* security error, img on diff domain */alert('x');
            return defaultRGB;
        }

        length = data.data.length;

        while ((i += blockSize * 4) < length) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i + 1];
            rgb.b += data.data[i + 2];
        }

        // ~~ used to floor values
        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);

        return rgb;

    }
    function valueToHex(c) {

        var hex = c.toString(16);

        return hex

    }
    function rgbToHex(r, g, b) {

        return '#' + valueToHex(r) + valueToHex(g) + valueToHex(b);

    }
    const hex2rgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        // return {r, g, b} 
        return { r, g, b };
    }
    $('#image1').on('change', (e) => {
        $('#img-preview-1').attr('src', URL.createObjectURL(e.target.files[0]));
        const img = document.createElement('img');
        img.src = URL.createObjectURL(e.target.files[0]);
        setTimeout(() => {
            const color = getAverageRGB(img);
            $('#color1').val(rgbToHex(color.r, color.g, color.b));
        }, 500);
    })
    $('#image2').on('change', (e) => {
        $('#img-preview-2').attr('src', URL.createObjectURL(e.target.files[0]));
        const img = document.createElement('img');
        img.src = URL.createObjectURL(e.target.files[0]);
        setTimeout(() => {
            const color = getAverageRGB(img);
            $('#color2').val(rgbToHex(color.r, color.g, color.b));
        }, 500);
    })

    $('#merge').on('click', () => {
        const color1 = hex2rgb($('#color1').val());
        const color2 = hex2rgb($('#color2').val());
        const per1 = parseInt($('#percent1').val());
        const per2 = parseInt($('#percent2').val());
        // const colorMerge = `rgb(${(color1.r + color2.r) / 2}, 
        // ${(color1.g + color2.g) / 2},
        // ${(color1.b + color2.b) / 2})`;
        const colorMerge = `rgb(${Math.floor((color1.r * per1 + color2.r * per2) / 10)},${Math.floor((color1.g * per1 + color2.g * per2) / 10)},${Math.floor((color1.b * per1 + color2.b * per2) / 10)})`;
        console.log({ color: colorMerge });
        $('#img-bg').css('background-color', colorMerge);
    });
});