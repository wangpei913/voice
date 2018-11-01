function getPosition(el) {
    let position = {};
    position.x = el.offsetLeft;
    position.y = el.offsetTop;
    while (el = el.offsetParent) {
        position.x += el.offsetLeft;
        position.y += el.offsetTop;
    }
    return position;
}

function windowScrollTop() {
    return document.body.scrollTop || document.documentElement.scrollTop;
}

export {getPosition, windowScrollTop};
  