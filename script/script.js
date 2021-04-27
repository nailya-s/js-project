window.addEventListener('DOMContentLoaded', function(){
    'use strict';

    //Timer

    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

    function getTimeRemaining(){
        let dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) /1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining, hours, minutes, seconds};
    }

    function formatTime(time){
        if (time < 10){
            time = '0' + time;
        }
        return time;
    }
    
    function updateClock(){
        let timer = getTimeRemaining();

        timerHours.textContent = formatTime(timer.hours);
        timerMinutes.textContent = formatTime(timer.minutes);
        timerSeconds.textContent = formatTime(timer.seconds);
        if(timer.timeRemaining > 0){
            setInterval(updateClock, 1000);
        } else {
            clearTimeout(timer);
            timerHours.textContent = "00";
            timerMinutes.textContent = "00";
            timerSeconds.textContent = "00";

        }
    }



    updateClock();
    }

    countTimer('13 april 2021');

    // menu

    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

            const handlerMenu = () => {
               menu.classList.toggle('active-menu');
            };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach((elem)=> elem.addEventListener('click', handlerMenu));

    };

    toggleMenu();

    //popup
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popUpClose = document.querySelector('.popup-close');

        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
            });
        });

        popUpClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });


    };

    togglePopUp();

    //service tabs

    const serviceTabs = () => {
        const tabsBtns = Array.from(document.querySelectorAll('.service-header-tab')),
        serviceTabs = Array.from(document.querySelectorAll('.service-tab'));

        tabsBtns.forEach((elem, i) => {
            elem.addEventListener('click', () => {            
                tabsBtns.forEach ((buttons) => {
                    buttons.classList.remove('active');
                });
                serviceTabs.forEach((el) => {
                            el.classList.add('d-none');
                    });
                    serviceTabs[i].classList.toggle('d-none');
                    elem.classList.add('active');         
            });

        });



    };

    serviceTabs();

    // portfolio
    const slider = () => {
        const slide = Array.from(document.querySelectorAll('.portfolio-item')),
        btn = document.querySelectorAll('.portfolio-btn'),
        dot = document.querySelectorAll('.dot'), 
        slider = document.querySelector('.portfolio-content');
        
        let currentSlide = 0,
        interval;

        let prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        let nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };
    

        const autoPLaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;

            if (currentSlide >= slide.length){
            currentSlide = 0;
        }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = () => {
           interval = setInterval(autoPLaySlide, 1000);

        };

        

        const stopSlide = () => {
            clearInterval(interval);


        };
        
        slider.addEventListener('click', (event) =>{
            event.preventDefault();
            let target = event.target;
            if (!target.matches('.dot, #arrow-left, #arrow-right')){
                return;
            }
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            if(target.matches('#arrow-right')){
                currentSlide++;
            } else if( target.matches("#arrow-left")) {
                currentSlide--;
            } else if(target.matches('.dot')){
                dot.forEach((element, index) =>{
            if(element === target){
                currentSlide = index;
            }
        });
    }
    if (currentSlide >= slide.length){
        currentSlide = 0;
    }

    if (currentSlide < 0) {
        currentSlide = slide.length -1;

    }
    nextSlide(slide, currentSlide, 'portfolio-item-active');
    nextSlide(dot, currentSlide, 'dot-active');

});

    slider.addEventListener('mouseover', (event) =>{
        if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
            stopSlide();
        }
    });

    slider.addEventListener('mouseout', (event) =>{
        if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
            startSlide();
        }
    });

        startSlide();
    };
        
      
    slider();

    // calculator

    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcDay = document.querySelector('.calc-day'),
        calcCount = document.querySelector('.calc-count'),
        totalValue = document.getElementById('total'),
        speed = 200;
    
   
    const countSum = () => {
        let total = 0,
        countValue = 1,
        dayValue = 1;
        const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;

        if (calcCount.value >1){
            countValue += (calcCount.value -1)/10;

        }

        if (calcDay.value && calcDay.value <5){
            dayValue *=2;
        } else if (calcDay.value && calcDay.value <10){
            dayValue *= 1.5;
        }

        if (typeValue && squareValue){
            total = price* typeValue *squareValue * countValue * dayValue;
        } 
        
        const animateNum = () =>{
            const target = +total;
            let count = +totalValue.innerText;
    
            const inc = target/speed;
    
            if (count<target){
                totalValue.textContent = Math.ceil(count + inc);
                setTimeout(animateNum, 1);
            } else {
                count.innerText = target;
            }
        };
    
        animateNum();

    };

    


    calcBlock.addEventListener('change', (event) =>{
        const target = event.target;
        if(target.matches('.calc-type') || target.matches('.calc-square') || 
        target.matches('.calc-day') || target.matches('.calc-count')){
            countSum();
        }

    });
    



    };

    calc(100);

        // send-ajax-form

        const sendForm = () => {
            const errorMessage = 'Something went wrong....',
                  loadMessage = 'Processing...',
                  successMessage = 'Thank you. We will contact you soon!';
    
                const form = document.getElementById('form1');
    
                const statusMessage = document.createElement('div');
                statusMessage.style.cssText = 'font-size: 2 rem;';

                
    
                form.addEventListener('submit', (event) => {
                    event.preventDefault();
                    form.appendChild(statusMessage);
                    statusMessage.textContent = loadMessage;
                    const formData = new FormData(form);
                    let body = {};
                    formData.forEach((key, val) => {
                        body[key] = val;
                    });
                    postData(body, 
                        () => {
                        statusMessage.textContent = successMessage;
                    }, 
                    (error) =>{
                        statusMessage.textContent = errorMessage;
                        console.error(error);
                    });
                    
                });


                const postData = (body, outputData, errorData) =>{
                    const request = new XMLHttpRequest();
                    request.addEventListener('readystatechange', ()=>{                  
                    if(request.readyState !== 4){
                        return;
                    }
                    if (request.status === 200){
                        outputData();                     
                    } else{
                        errorData(request.status);
                        
                    }

                });

                    request.open('POST', './server.php');
                    request.setRequestHeader('Content-Type', 'application/json');
                    request.send(JSON.stringify(body));
                    
                };
        };
    
        sendForm();

});