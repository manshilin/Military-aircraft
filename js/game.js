// запускаем блок старта игры
stvorutuStartBlock();

function startIgra(){
    startBlock.remove();
    stvorutuLifes(); // визиваємо блок життя
    // включаем таймер для выстрелов
    getTimer();

// задаем первый самолет в массиве
    planes [0] = {
        x : random (750),
        y : 0
    }

airforce.src = "icon/airforce.png";
snaryad.src = "icon/Bomb.png";
cursor.src = "icon/cursor.png";
buh.src = "audio/zvuk-vzryva.mp3";

// вызываем функцию создания и движения объектов
draw ();
// вызываем функцию очистки холста canvas
clearCanvas(); 
// вызываем функцию создание самолета по таймеру со случайными координатами 
sozdanieRandomPlane();
document.addEventListener("keydown",move);
        
        
        
    
 
}









  