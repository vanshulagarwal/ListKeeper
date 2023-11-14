let cursor = document.querySelector('.cursor');
let cursorinner = document.querySelector('.cursor2');

document.addEventListener('mousemove', function (e) {
    let x = e.clientX;
    let y = e.clientY;
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function (e) {
    let x = e.clientX;
    let y = e.clientY;
    cursorinner.style.left = x + 'px';
    cursorinner.style.top = y + 'px';
});