/*
 Навешивает событие долгого касания
 @param {Object} elem DOM элемент на который навешивается событие
 @param {Function} func Функция, выполняемая по событию
 @param {...*} args Параметры передаваемые в функцию
 */
function longTap(elem, func, ...args) {
    let timer = null;
    let delay = 1000;

    if (!isDom(elem)){
        throw new Error(elem + " is not DOM element")
    }
    elem.addEventListener('touchstart', function(e){
        e.preventDefault();
        // первым параметром передаем объект события
        timer = setTimeout(func.bind(this, e, args), delay)
    });
    elem.addEventListener('touchmove', function (e) {
        e.preventDefault();
        clearTimeout(timer);
    });
    elem.addEventListener("touchend", function (e) {
        clearTimeout(timer);
    });
}

/**
 * @param elem
 * @returns {boolean}
 */
function isDom(elem){
    return (elem !== null && typeof elem.nodeType === "number" )
}