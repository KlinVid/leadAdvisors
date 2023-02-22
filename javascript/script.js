document.addEventListener('DOMContentLoaded', function() {
    // конечная дата 31.05.2023 (в коде 2023, 4, 31;  т.к отсчет идет с 0)
    const deadline = new Date(2023, 4, 31);
    let timerId = null;
    let days, hours, minutes, seconds;

   // получаем элементы, содержащие компоненты даты
  const $days = document.querySelector('.timer--days');
  const $hours = document.querySelector('.timer--hours');
  const $minutes = document.querySelector('.timer--minutes');
  const $seconds = document.querySelector('.timer--seconds');

  // получаем элементы, содержащие текст даты
  const textDays = document.querySelector('.text--days');
  const textHours = document.querySelector('.text--hours');
  const textMinutes = document.querySelector('.text--minutes');
  const textSeconds = document.querySelector('.text--seconds');

    //Устанавливаем оставшееся времени в качестве содержимого элементов
    function countdownTimer() {

      // вычисляем разницу дат 
      const diff = deadline - new Date();
      
      if (diff <= 0) {
        clearInterval(timerId);
      }

      if (diff > 0) {
        days = Math.floor(diff / 1000 / 60 / 60 / 24);
        hours = Math.floor(diff / 1000 / 60 / 60) % 24;
        minutes = Math.floor(diff / 1000 / 60) % 60;
        seconds = Math.floor(diff / 1000) % 60;
      } else {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
      }

      //вывод даты на страницу
      if (days < 10) {
        $days.textContent = '0' + days;
      } else {
        $days.textContent = days;
      }

      if (hours < 10) {
        $hours.textContent = '0' + hours;
      } else {
        $hours.textContent = hours;
      }
      
      if (minutes < 10) {
        $minutes.textContent = '0' + minutes;
      } else {
        $minutes.textContent = minutes;
      }

      if (seconds < 10) {
        $seconds.textContent = '0' + seconds;
      } else {
        $seconds.textContent = seconds;
      }

      // Получаем размер окна
      const sizeWindow = document.documentElement.clientWidth;
      if (sizeWindow <= 768) {
        textDays.textContent = 'DD';
        textHours.textContent = 'HH';
        textMinutes.textContent = 'MM';
        textSeconds.textContent = 'SS';
      } else {
        textDays.textContent = 'Days';
        textHours.textContent = 'Hours';
        textMinutes.textContent = 'Minutes';
        textSeconds.textContent = 'Seconds';
      }
    }
    
    // вызываем функцию countdownTimer
    countdownTimer();
    // вызываем функцию countdownTimer каждую секунду
    timerId = setInterval(countdownTimer, 1000);
});



//форма ajax
let form = document.querySelector('.footer__subscribe');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__close');
let closeX = document.querySelector('.popup__x-mark');

closeBtn.addEventListener('click', clickBtn);
closeX.addEventListener('click', clickBtn);

function clickBtn() {
  popup.classList.remove('active');
}

// Добавляем обработчик к форме
form.addEventListener('submit', function(e) {
  // Предотвратить отправку формы браузером
  e.preventDefault();

  let formEmail = document.querySelector('.subscribe__input').value;
  // Создание экземпляра объекта XMLHttpRequest
  let request = new XMLHttpRequest();

  request.addEventListener('load', function() {
    // В этой части кода можно обрабатывать ответ от сервера
    // console.log(request.response);
    if (request.status !== 200) {
      popup.classList.add('active');
    } else {
      popup.classList.add('active');
      document.querySelector('.popup__title').innerHTML = 'Error!';
      document.querySelector('.popup__text').innerHTML = 'Someting went wrong';
    }
  });

  request.open(this.method, this.action, true);
  // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.send('&email=' + encodeURIComponent(formEmail));
});


// плавный скролл
const btnSmooth = document.querySelector('.footer__smooth');
const allEvents = document.querySelector('.allEvents');
const allEventsTitle = document.querySelector('.allEvents__title');

btnSmooth.addEventListener('click', function() {
  allEvents.scrollIntoView({behavior: "smooth"});
  allEventsTitle.style = `
  
  animation: appear-title 1s ease-in-out;
  
  `;
});

// прикрепление футера
document.addEventListener('scroll', function () {
  const footerPosFixed = document.querySelector('.footer__wrapper');
  const event = document.querySelector('.event');
  const footerInner = document.querySelector('.footer__inner');

  if (window.pageYOffset >= footerInner.offsetHeight) {
    footerPosFixed.style.position = 'static';
    footerPosFixed.style.marginBottom = '110px';
  } else {
    footerPosFixed.style.position = 'fixed';
    footerPosFixed.style.marginBottom = '0px';
  }
});

