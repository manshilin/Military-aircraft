// заносим в переменную наше игровое поле
var igraPole = document.querySelector('#igra');

// переменная для создания жизней
var lifes = null;

// задаем начальное значение колличества жизней
var kilkistLifes = 3;

// блок і кнопка старт на ігровому полі
var startBlock = null;

// переменная для стартовой кнопки
var startKnopka = null;

// задаем переменную куда будем записывать счет игрока
var score = 0;

// создаем холст канвас
var cvs = document.getElementById("canvas");

// задаем значение канвасу 2d 
var ctx = cvs.getContext("2d");

// массив случайных вражеских самолетов
var planes = [];

// задаем массив снарядов 
var snarad = [];

// начальная позиция нашего самолета
var xPos = 400;
var yPos = 600;

// задаем изображение вражескому самолету
var airforce = new Image();
// указываем путь к изображению самолета
airforce.src = "icon/airforce.png";

// указываем путь к изображению снаряда
var snaryad = new Image();
// указываем путь к изображению снаряда
snaryad.src = "icon/Bomb.png"; 

// задаем изображение нашему самолету
var cursor = new Image();
// указываем путь к изображению нашего самолета
cursor.src = "icon/cursor.png";

// задаем звук взрыва вражеского самолета
var buh = new Audio();
// указываем путь к звуку выстрела
buh.src = "audio/zvuk-vzryva.mp3";
// переменная для создания таймера
var timer = 0;