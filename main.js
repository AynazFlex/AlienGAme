"use strict";

document.body.style.backgroundSize = `${document.documentElement.clientWidth}px ${document.documentElement.clientHeight}px`;

let enemies;
let gun;
let flag = 0;
let point = 0;

menu.onclick = () => {
    menu.style.display = "none";
    person.style.display = "block"

    enemies = setInterval(() => {
        let enemi = document.createElement('img');
        enemi.src = "meteor.png";
        enemi.className = 'enemi';
        document.body.append(enemi);
        enemi.style.top = -40 + 'px';
        enemi.style.left = Math.random()*(document.documentElement.clientWidth - 40) + 'px';
        let attack = setInterval(() => {
            enemi.style.top = enemi.getBoundingClientRect().top + 5 + 'px';
            if(enemi.getBoundingClientRect().bottom > document.documentElement.clientHeight - 50) {
                enemi.remove();
                clearInterval(attack);
                person.style.display = '';
                clearInterval(enemies);
                clearInterval(gun);
                menu.style.display = "";
                person.ontouchstart = null;
                flag = 1;
                hightPoint();
            }
        }, 20);
    }, 500);
    
    person.ontouchstart = (event) => {
    
        gun = setInterval(() => {
            let bullet = document.createElement('div');
            bullet.className = 'bullet';
            document.body.append(bullet);
            bullet.style.top = person.getBoundingClientRect().top + 'px';
            bullet.style.left = person.getBoundingClientRect().left + 22 + 'px';
            let shot = setInterval(() => {
                bullet.style.top = bullet.getBoundingClientRect().top - 20 + 'px';
                if(bullet.getBoundingClientRect().top < 0) {
                    bullet.remove();
                    clearInterval(shot);
                }
                for(let k of document.body.querySelectorAll('.enemi')) {
                    if(bullet.getBoundingClientRect().top <= k.getBoundingClientRect().bottom && bullet.getBoundingClientRect().left > k.getBoundingClientRect().left && bullet.getBoundingClientRect().left < k.getBoundingClientRect().right) {
                        k.remove();
                        bullet.remove();
                        clearInterval(shot);
                        point += 10;
                        points.textContent = point;
                    }
                }
                if(flag == 1) {
                    bullet.remove();
                    clearInterval(shot);
                    flag = 0;
                }
            }, 20);
        }, 100);
    
        let shiftX = event.changedTouches[0].clientX - person.getBoundingClientRect().left;
    
        moveAt(event.changedTouches[0].clientX);
    
        function moveAt(clientX) {
          person.style.left = clientX - shiftX + 'px';
          if(person.getBoundingClientRect().left <= 0) {
            person.style.left = 0 + 'px';
          }
          if(person.getBoundingClientRect().right >= document.documentElement.clientWidth) {
            person.style.left = document.documentElement.clientWidth - person.getBoundingClientRect().width + 'px';
          }
        }
    
        function onMouseMove(event) {
          moveAt(event.changedTouches[0].clientX);
        }
    
        document.addEventListener('touchmove', onMouseMove);
    
        document.ontouchend = function() {
            clearInterval(gun);
            document.removeEventListener('touchmove', onMouseMove);
            document.ontouchend = null;
        };
    
    }
}

function hightPoint() {
    if(point > +record.textContent) {
        record.textContent = point;
    }
    points.textContent = '';
    point = 0;
}