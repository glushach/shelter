// Burger handler
import {pagination} from "../../assets/data.js";
import { dataPets } from '../../assets/data.js';

(function () {
    const body = document.querySelector('body');
    const logo = document.querySelector('.logo__block-pets');     // logo
    const burger = document.querySelector('.header__burger-pets'); // тригер
    const overlay = document.querySelector('.overlay'); // фон должен плавно появляться
    const menu = document.querySelector('.navigation'); //меню должно плвно выезжать
    const menuLinks = document.querySelectorAll('.navigation__link');

    burger.addEventListener('click', () => {
        logo.classList.toggle('logo__block-pets-active');
        burger.classList.toggle('burger-pets-active');
        overlay.classList.toggle('overlay-active');
        menu.classList.toggle('navigation-active');
        if (logo.classList.contains('logo__block-pets-active')) {
            body.style.overflow = "hidden"; // отключить вертикальный скролл
        } else {
            body.style.overflow = "";
        }
    });

    if (window.innerWidth <= 767) {
        menuLinks.forEach(item => {
            item.addEventListener('click', () => {
                logo.classList.remove('logo__block-pets-active');
                burger.classList.remove('burger-pets-active');
                overlay.classList.remove('overlay-active');
                menu.classList.remove('navigation-active');
                body.style.overflow = "";
            });
        });
    }

    // При резайзе с меньшего на большее убрать классы
    window.addEventListener(`resize`, event => {
        if (window.innerWidth >= 768) {
            logo.classList.remove('logo__block-pets-active');
            burger.classList.remove('burger-pets-active');
            overlay.classList.remove('overlay-active');
            menu.classList.remove('navigation-active');
            body.style.overflow = "";
        }
    });

    // При клике на подложку нужно закрыть меню
    overlay.addEventListener('click', (e) => {
        if (e.target.classList.contains('overlay-active')) {
            logo.classList.remove('logo__block-pets-active');
            burger.classList.remove('burger-pets-active');
            overlay.classList.remove('overlay-active');
            menu.classList.remove('navigation-active');
            body.style.overflow = "";
        }
    });
}());


//Replace footer puppy
(function () {
    const photo = document.querySelector('.footer__puppy');
    if (window.innerWidth <= 767) {
        photo.src = "../../assets/images/footer-puppy-767.png";
    }
    window.addEventListener(`resize`, () => {
        if (window.innerWidth <= 767) {
            photo.src = "../../assets/images/footer-puppy-767.png";
        } else {
            photo.src = "../../assets/images/footer-puppy.png";
        }
    });
}());

// =============== PAGINATION =================
(function () {
    const doubleLeft = document.querySelector('#double-left');
    const singleLeft = document.querySelector('#single-left');
    const number = document.querySelector('#number');
    const singleRight = document.querySelector('#single-right');
    const doubleRight = document.querySelector('#double-right');
    const cards = document.querySelectorAll('[data-modal]');
    const allPets = _.chunk(pagination, [4]).map(item => _.shuffle(item)).flat(); // обновится при только при перезагрузке
    let count = 1;
    let step = 0;

    console.log(allPets);
    // ========= ПЕРВОНАЧАЛЬНАЯ ЗАГРУЗКА =========
    firstRender(cards, allPets);
    // При резайзе с меньшего на больше вернутся на первую страницу
    window.addEventListener(`resize`, () => {
        if (
            window.screen.width >= 1280 ||
            (window.screen.width >= 768 && window.screen.width < 1280) ||
            window.screen.width < 768
        ) {
            count = 1;
            step = 0; // обнуление шага при ресайзе экрана
            number.textContent = `${count}`;
            firstRender(cards, allPets); // возврат на первую страницу
            toggleDisabledLeft(singleRight, doubleRight, singleLeft, doubleLeft);
        }
    });





    // Обработчики на кнопки пагинации
    singleRight.addEventListener('click', () => {
        // console.log(pagination)
        if (count < 6 && window.screen.width >= 1280) {
            if (count <= 5) {
                disBlock(singleRight, doubleRight, singleLeft, doubleLeft)
            }
            number.textContent = `${++count}`;
            step += 8;
            stepRender(cards, allPets, step, 8);
            if (count === 6) {
                toggleDisabledRight(singleRight, doubleRight, singleLeft, doubleLeft);
            }
        } else if (count < 8 && (window.screen.width >= 768 && window.screen.width < 1280)) { //768px <= width < 1280px
            if (count <= 7) {
                disBlock(singleRight, doubleRight, singleLeft, doubleLeft)
            }
            number.textContent = `${++count}`;
            step += 6;
            stepRender(cards, allPets, step, 6);
            if (count === 8) {
                toggleDisabledRight(singleRight, doubleRight, singleLeft, doubleLeft);
            }
        } else if (count < 16 && window.screen.width < 768) {
            if (count <= 15) {
                disBlock(singleRight, doubleRight, singleLeft, doubleLeft)
            }
            number.textContent = `${++count}`;
            step += 3;
            stepRender(cards, allPets, step, 3);
            if (count === 16) {
                toggleDisabledRight(singleRight, doubleRight, singleLeft, doubleLeft);
            }
        }
    });
    doubleRight.addEventListener('click', () => {
        if (window.screen.width >= 1280) {
            count = 6;
            number.textContent = `${count}`;
            step = 40;
            stepRender(cards, allPets, step, 8);
            toggleDisabledRight(singleRight, doubleRight, singleLeft, doubleLeft);
        } else if (count < 8 && (window.screen.width >= 768 && window.screen.width < 1280)) { //768px <= width < 1280px
            count = 8
            number.textContent = `${count}`;
            step = 42;
            stepRender(cards, allPets, step, 6);
            toggleDisabledRight(singleRight, doubleRight, singleLeft, doubleLeft);
        } else if (count < 16 && window.screen.width < 768) {
            count = 16
            number.textContent = `${count}`;
            step = 45;
            stepRender(cards, allPets, step, 3);
            toggleDisabledRight(singleRight, doubleRight, singleLeft, doubleLeft);
        }
    });
    singleLeft.addEventListener('click', () => {
        if (count > 1 && window.screen.width >= 1280) {
            if (count <= 6) {
                disBlock(singleRight, doubleRight, singleLeft, doubleLeft)
            }
            number.textContent = `${--count}`;
            step -= 8;
            stepRender(cards, allPets, step, 8);
            if (count === 1) {
                toggleDisabledLeft(singleRight, doubleRight, singleLeft, doubleLeft);
            }
        } else if (count > 1 && (window.screen.width >= 768 && window.screen.width < 1280)) { //768px <= width < 1280px
            if (count <= 8) {
                disBlock(singleRight, doubleRight, singleLeft, doubleLeft)
            }
            number.textContent = `${--count}`;
            step -= 6;
            stepRender(cards, allPets, step, 6);
            if (count === 1) {
                toggleDisabledLeft(singleRight, doubleRight, singleLeft, doubleLeft);
            }
        } else if (count > 1 && window.screen.width < 768) {
            if (count <= 16) {
                disBlock(singleRight, doubleRight, singleLeft, doubleLeft)
            }
            number.textContent = `${--count}`;
            step -= 3;
            stepRender(cards, allPets, step, 3);
            if (count === 1) {
                toggleDisabledLeft(singleRight, doubleRight, singleLeft, doubleLeft);
            }
        }
    });
    doubleLeft.addEventListener('click', () => {
        if (window.screen.width >= 1280) {
            count = 1;
            number.textContent = `${count}`;
            step = 0;
            stepRender(cards, allPets, step, 8);
            toggleDisabledLeft(singleRight, doubleRight, singleLeft, doubleLeft);
        } else if (window.screen.width >= 768 && window.screen.width < 1280) { //768px <= width < 1280px
            count = 1;
            number.textContent = `${count}`;
            step = 0;
            stepRender(cards, allPets, step, 6);
            toggleDisabledLeft(singleRight, doubleRight, singleLeft, doubleLeft);
        } else if (window.screen.width < 768) {
            count = 1;
            number.textContent = `${count}`;
            step = 0;
            stepRender(cards, allPets, step, 3);
            toggleDisabledLeft(singleRight, doubleRight, singleLeft, doubleLeft);
        }
    });
}());
function toggleDisabledRight(singleRight, doubleRight, singleLeft, doubleLeft) {
    singleRight.setAttribute('disabled', 'disabled');
    doubleRight.setAttribute('disabled', 'disabled');
    singleLeft.removeAttribute('disabled');
    doubleLeft.removeAttribute('disabled');
}
function toggleDisabledLeft(singleRight, doubleRight, singleLeft, doubleLeft) {
    singleRight.removeAttribute('disabled');
    doubleRight.removeAttribute('disabled');
    singleLeft.setAttribute('disabled', 'disabled');
    doubleLeft.setAttribute('disabled', 'disabled');
}
function disBlock(singleRight, doubleRight, singleLeft, doubleLeft) {
    singleRight.removeAttribute('disabled');
    doubleRight.removeAttribute('disabled');
    singleLeft.removeAttribute('disabled');
    doubleLeft.removeAttribute('disabled');
}
function firstRender(cards, allPets) {
    cards.forEach((card, idx) => {
        card.dataset.modal = allPets[idx].id; // установка нового дата атрибута
        card.querySelector('img').src = allPets[idx].img;
        card.querySelector('img').alt = allPets[idx].name;
        card.querySelector('.card__title').textContent = allPets[idx].name;
    });
}
function stepRender(cards, allPets, step, iterate) {
    for (let i = 0; i <= iterate; i++) {
        try {
            cards[i].dataset.modal = allPets[i + step].id; // установка нового дата атрибута
            cards[i].querySelector('img').src = allPets[i + step].img;
            cards[i].querySelector('img').alt = allPets[i + step].name;
            cards[i].querySelector('.card__title').textContent = allPets[i + step].name;
        } catch (e) {}
    }
}


// ==================== Popup ===================
const pets = document.querySelectorAll('[data-modal]');

(function () {
    const body = document.querySelector('body');
    const overlay = document.querySelector('.overlay-modal');
    const modal = document.querySelector('.modal');
    const close = document.querySelector('.modal__close');
    let index = null; // to be 0, 1, 2

    pets.forEach((item, idx) => { // раставить обработчики открытия модалки
        item.addEventListener('click', () => { // клик по коктретному питомцу
            body.classList.add('hidden') // отключить вертикальный скролл

            const pet = dataPets[item.dataset.modal]; // получение инфо о конкретном питомце по дата атрибуту конкретной карточки
            modal.lastElementChild.innerHTML = `
                <div class="modal__photo">
                    <img src="${pet.img}" alt="${pet.name}">
                </div> <!-- end left -->
                <div class="modal__content">
                    <div class="modal__title">Jennifer</div>
                    <div class="modal__subtitle">${pet.type} - ${pet.name}</div>
                    <div class="modal__description">${pet.description}</div>
                    <ul class="modal__list">
                        <li class="modal__list-item"><b>Age:</b> <span>${pet.age}</span></li>
                        <li class="modal__list-item"><b>Inoculations:</b> <span>${pet.inoculations}</span></li>
                        <li class="modal__list-item"><b>Diseases:</b> <span>${pet.diseases}</span></li>
                        <li class="modal__list-item"><b>Parasites:</b> <span>${pet.parasites}</span></li>
                    </ul>
                </div> <!-- end right -->
            `;


            item.style.cursor = 'default';
            index = idx;
            overlay.classList.add('overlay-modal-active');
        });
    });


    modal.addEventListener('mouseout', (e) => { // усли курсор ушел с блока modal на overlay или modal__close
        overlay.style.cursor = 'pointer';
        modal.firstElementChild.style.background = '#F1CDB3';
    });
    modal.addEventListener('mouseover', (e) => { // усли курсор на блоке modal
        if (e.target.classList.contains('modal__close')) {
            overlay.style.cursor = 'pointer';
            modal.firstElementChild.style.background = '#F1CDB3';
        } else {
            overlay.style.cursor = 'default';
            modal.firstElementChild.style.background = 'transparent';
        }
    });

    overlay.addEventListener('click', (e) => { // закрыть при клике на подложку
        if (e.target.classList.contains('overlay-modal')) {
            body.classList.remove('hidden') // отключить вертикальный скролл
            overlay.classList.remove('overlay-modal-active');
            overlay.style.cursor = 'default';
            pets[index].style.cursor = 'pointer';
        }
    });

    close.addEventListener('mouseover', (e) => {
        e.target.style.cursor = 'pointer';
    });
    close.addEventListener('click', () => {
        body.classList.remove('hidden') // отключить вертикальный скролл
        overlay.classList.remove('overlay-modal-active'); // закрыть модалку при клике на крестик
        close.style.cursor = 'default';
        pets[index].style.cursor = 'pointer';
    });
}());