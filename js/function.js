function stvorutuStartBlock() {
  startBlock = document.createElement('div'); //створюємо блок div
  startBlock.id = "start-block"; //присвоюємо id
    startKnopka = document.createElement('button');//створюємо кнопку
    startKnopka.id = "start-knopka"; //присвоюємо id
  //додаємо старт-кнопку в стартовий блок
  startBlock.appendChild(startKnopka);
  //додаємо стартовий блок в ігрове поле
  igraPole.appendChild(startBlock);
  startKnopka.onclick = startIgra; 
}

// функция задания рендомного числа
function random (max) {
  var rand = 1 + Math.random () * (max+1);
      rand = Math.floor (rand);
  return rand;
}

// функция движения нашего самолета
 function move() {
  // если нажата клавиша влево то смещаем самолет на 10px вправо
    if(event.code == "ArrowLeft"&&xPos > 0) {
      xPos -=10;
    }
    // если нажата клавиша вправо то смещаем самолет на 10px вправо
    if(event.code == "ArrowRight"&&xPos < 770) {
      xPos +=10;
    }
   
    // если нажата клавиша пробел то стреляем и задаем задержку выстрела
    if(event.code == "Space"&& timer > 0){
      snarad.push({
        x : xPos,
        y : yPos
      });
      // обнуляем таймер
      timer = 0;
    }
}

function stvorutuLifes() {
    lifes = document.createElement("div");//створюємо блок життя
    lifes.id = "lifes"; //добавляєм id
      var kilkistLifes2 = 0;//змінна в якій зберігаєм наявну к-ть життів
        while(kilkistLifes2 < kilkistLifes) { // цикл
          var span = document.createElement("span");//створюємо життя 1
              span.id = "spanLifes"
              lifes.appendChild(span);//додаєм тег span в блок life
          kilkistLifes2 = kilkistLifes2 + 1;//збільшуємо к-ть життя на 1 
        }
    igraPole.appendChild(lifes);//вставляєм блок життя в блок ігрове поле
}

    // блок конца игры
function gameover(){
  var end = document.createElement("div");//створюємо елемент div
    end.id = "gameover"; //присвоюємо id
    // створюємо блок <h2> ви набрали ...очків  
  var h2 = document.createElement("h2");
    h2.innerText = "you destroyed:" + score + " planes";
    end.appendChild(h2); //додаємо h2 в блок div
    // додаємо блок на ігрове поле
    igraPole.appendChild(end);   
  }

// функция прорисовки самолета и снаряда на холсте 
function draw () {
  ctx.drawImage(cursor, xPos, yPos);
    //блок счета сбитых самолетов 
    ctx.fillStyle = "#000";
    ctx.font = "18px Verdana";
    ctx.fillText ("Сбитые самолеты : " + score, 10, 30);
  // запускаем функцию движения вражеских самолетов
  vragMove();

  // запускаем функцию дфижения снаряда
  snaradMove();

  // запускаем функцию проверки на столкновение снаряда и врага
  proverkaStolknovenie();

 // обновляем нашу функцию прорисовки объектов
requestAnimationFrame(draw);
}

// функция очистки холста canvas чтобы не осталвлся шлейф от самолетов при их движении
function clearCanvas(){
  setInterval(function() {
      ctx.clearRect(0, 0, 800, 700);
      }, 10);
}

// функция создания вражеского самолета   
function sozdanieRandomPlane(){
 // интервал создания самолета каждую секунду 
  setInterval(function() { 
        // заносим самолет в массив со случайными координатами
      planes.push ({
            x : random (750),
            y : 0 
      })
      

  }, 1000);

}

function vragMove(){
  // Цикл прорисовки самолета в движении
  for (var i = 0; i< planes.length; i++) {
   ctx.drawImage(airforce, planes[i].x, planes[i].y);

      // изменение координаты самолета по у                  
      planes[i].y = planes[i].y +1 ;

        // удаляем самолет пролетевший игровое поле
        if (planes[i].y > 650) {
          planes.splice (i, 1);
          // добавляю уменьшение жизней 
          kilkistLifes = kilkistLifes - 1;
          // удаляем удну жизнь
          lifes.remove();
            // условие нового создания жизни за -1
              if (kilkistLifes > 0 ){
                stvorutuLifes();
              }
              // условие если жизни закончились, заканчивать игру
                if (kilkistLifes == 0){
                  gameover();
                }

        }
  }
}

function snaradMove(){
   // Цикл прорисовки снаряда в двиении 
  for (var i = 0; i< snarad.length; i++) {
           ctx.drawImage(snaryad, snarad[i].x, snarad[i].y);

          // изменение координаты снаряда по у 
            snarad[i].y = snarad[i].y -3 ;

            // удаление снаряда улетевшего за поле
            if (snarad[i].y <= 0) {
                            snarad.splice (i,1);} 
        }
}
// функция проверки столкновения снаряда и вражеского самолета
function proverkaStolknovenie(){
        // перебираем наши самолеты
        for (var j = planes.length - 1; j >= 0; j--) {
              // перебираем каждый снаряд для каждого самолета по очереди 
                for (var i = snarad.length - 1; i>= 0; i--) {
                        //проверка пересечения координат самолета и снаряда
                      
                    if (planes[j].x + 65 >= snarad[i].x  &&
                             snarad[i].x >= planes[j].x && 
                        planes[j].y + 5 >=  snarad[i].y)  {
                            planes.splice (j, 1);
                            snarad.splice (i, 1); 
                            score++;
                            buh.play();   
                    }                  
                } 
                
        }
}

// функция таймера игры для задержки между выстрелами
function getTimer(){
    setInterval(function() { 
        // ирибавляем счетчик таймера на +1
        timer++;
        // условие если жизни закончились, заканчивать игру
          if (kilkistLifes == 0){
              clearInterval();
                    
          }
    }, 400);
}

