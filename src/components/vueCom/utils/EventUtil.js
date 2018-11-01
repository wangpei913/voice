function addEvent (element, eventName, func) {
    if (element.addEventListener) {
        element.addEventListener(eventName,func);
    } else {
        element.attachEvent(`on${eventName}`,func);
    }
}

function removeEvent(element, eventName, func) {
    if (element.removeEventListener) {
        element.removeEventListener(element,eventName,func);
    } else {
        element.detachEvent(`on${eventName}`,func);
    }
}

export {
    addEvent,
    removeEvent
}
  