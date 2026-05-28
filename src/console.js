const teks = "I LOVE YOU ❤️";
let index = 0;

for (let y = 25; y > -25; y--) {
    let baris = "";

    for (let x = -30; x < 30; x++) {
        let xh = x * 0.04;
        let yh = y * 0.1;

        let rumus =
            Math.pow(xh * xh + yh * yh - 1, 3) -
            xh * xh * Math.pow(yh, 3);

        if (rumus <= 0) {
            baris += teks[index % teks.length];
            index++;
        } else {
            baris += " "; // WAJIB spasi
        }
    }

    console.log(baris);
}