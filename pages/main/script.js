import { dataPets } from '../../assets/data.js';

// ========== Burger handler ==========
(function () {
    const body = document.querySelector('body');
    const logo = document.querySelector('.logo__block');     // logo
    const burger = document.querySelector('.header__burger'); // тригер
    const overlay = document.querySelector('.overlay'); // фон должен плавно появляться
    const menu = document.querySelector('.navigation'); //меню должно плвно выезжать

    const menuLinks = document.querySelectorAll('.navigation__link');

    burger.addEventListener('click', () => {
        logo.classList.toggle('logo__block-active');
        burger.classList.toggle('burger');
        overlay.classList.toggle('overlay-active');
        menu.classList.toggle('navigation-active');
        if (logo.classList.contains('logo__block-active')) {
            body.style.overflow = "hidden"; // отключить вертикальный скролл
        } else {
            body.style.overflow = "";
        }



        // При клике на лого главной страницы, загрыть меню
        const logoBurger = document.querySelector('.logo__block-burger a');
        logoBurger.addEventListener('click', () => {
            logo.classList.remove('logo__block-active');
            burger.classList.remove('burger');
            overlay.classList.remove('overlay-active');
            menu.classList.remove('navigation-active');
            body.style.overflow = "";
        });
    });

    if (window.innerWidth <= 767) {
        menuLinks.forEach(item => {
            item.addEventListener('click', () => {
                logo.classList.remove('logo__block-active');
                burger.classList.remove('burger');
                overlay.classList.remove('overlay-active');
                menu.classList.remove('navigation-active');
                body.style.overflow = "";
            });
        });
    }


    // При резайзе с меньшего на большее убрать классы
    window.addEventListener(`resize`, event => {
        if (window.innerWidth >= 768) {
            logo.classList.remove('logo__block-active');
            burger.classList.remove('burger');
            overlay.classList.remove('overlay-active');
            menu.classList.remove('navigation-active');
            body.style.overflow = "";
        }
    });

    // При клике на подложку нужно закрыть меню
    overlay.addEventListener('click', (e) => {
        if (e.target.classList.contains('overlay-active')) {
            logo.classList.remove('logo__block-active');
            burger.classList.remove('burger');
            overlay.classList.remove('overlay-active');
            menu.classList.remove('navigation-active');
            body.style.overflow = "";
        }

    });
}());

// Replace icons
(function () {
    const desktop = [
        "../../assets/icons/help/Vector.svg",
        "../../assets/icons/help/transportation.svg",
        "../../assets/icons/help/toys.svg",
        "../../assets/icons/help/bowls-and-cups.svg",
        "../../assets/icons/help/shampoos.svg",
        "../../assets/icons/help/vitamins.svg",
        "../../assets/icons/help/medicines.svg",
        "../../assets/icons/help/collars-or-leashes.svg",
        "../../assets/icons/help/sleeping-area.svg"
    ];
    const mobile = [
        "../../assets/icons/help-767/icon-pet-food.svg",
        "../../assets/icons/help-767/icon-transportation.svg",
        "../../assets/icons/help-767/icon-toys.svg",
        "../../assets/icons/help-767/icon-bowls-and-cups.svg",
        "../../assets/icons/help-767/icon-shampoos.svg",
        "../../assets/icons/help-767/icon-vitamins.svg",
        "../../assets/icons/help-767/icon-medicines.svg",
        "../../assets/icons/help-767/icon-collars-leashes.svg",
        "../../assets/icons/help-767/icon-sleeping-area.svg"
    ];
    const icons = document.querySelectorAll('.options__item img');
    if (window.innerWidth <= 767) {
        icons.forEach((item, idx) => {
            item.src = mobile[idx];
        });
    }
    window.addEventListener(`resize`, event => {
        if (window.innerWidth <= 767) {
            icons.forEach((item, idx) => {
                item.src = mobile[idx];
            });
        } else {
            icons.forEach((item, idx) => {
                item.src = desktop[idx];
            });
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


// +++++ ========= SLIDER =========== +++++
let unique = [];
function randomIntegers() {
    let nums = _.shuffle(_.range(0, 8)).slice(0,3); // генерация случайных чисел (0 - 7)
    if (unique.length === 0) {
        unique = nums;
        return nums;
    } else {
        let n = _.range(0, 8) // генерация массива (0 - 7)
        nums = _.shuffle(_.difference(n, unique)).slice(0,3);
        unique = nums;
        return nums;
    }
}

const petsCenter = document.querySelectorAll('.slide-center');
(function () {
    const right = document.querySelector('.carousel__right');
    const left = document.querySelector('.carousel__left');
    const slide = document.querySelector('.carousel__inners'); //////
    let indexes = randomIntegers();

    renderSlider(indexes, petsCenter); // при первоначальной загрузки страницы

    right.addEventListener('click', () => {
        left.setAttribute('disabled', 'disabled'); // на веремя онимации отключить кнопки
        right.setAttribute('disabled', 'disabled');
        slide.classList.add('transition-right');
        const petsRight = document.querySelectorAll('.slide-right');
        indexes = randomIntegers();
        renderSlider(indexes, petsRight);
    });

    left.addEventListener('click', () => {
        left.setAttribute('disabled', 'disabled'); // на веремя онимации отключить кнопки
        right.setAttribute('disabled', 'disabled');
        slide.classList.add('transition-left');
        const petsLeft = document.querySelectorAll('.slide-left');
        indexes = randomIntegers();
        renderSlider(indexes, petsLeft);
    });

    slide.addEventListener('animationend', (animationEvent) => {
        if (animationEvent.animationName === "move-left") {
            slide.classList.remove('transition-left');
            renderSlider(indexes, petsCenter); // этот indexes был сненерирован на строке 171
        } else {
            slide.classList.remove('transition-right');
            renderSlider(indexes, petsCenter); // этот indexes был сненерирован на строке 162
        }

        left.removeAttribute('disabled'); // включить кнопки после анимации
        right.removeAttribute('disabled');
    });
}());


function renderSlider(indexes, pets) {
    pets.forEach((slide, idx) => {
        slide.dataset.modal = dataPets[indexes[idx]].id; // установка нового дата атрибута
        slide.querySelector('img').src = dataPets[indexes[idx]].img;
        slide.querySelector('img').alt = dataPets[indexes[idx]].name;
        slide.querySelector('h3').textContent = dataPets[indexes[idx]].name;
    });
}



// ==================== Popup ===================
(function () {
    const body = document.querySelector('body');
    const pets = document.querySelectorAll('.slide-center');
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

// slider.innerHTML = `
//         <div class="carousel__card carousel__card-0" data-modal="${dataPets[indexes[0]].id}">
//             <img src="${dataPets[indexes[0]].img}" alt="${dataPets[indexes[0]].name}">
//             <h3 class="carousel__title">${dataPets[indexes[0]].name}</h3>
//             <button class="btn">Learn more</button>
//         </div>
//         <div class="carousel__card carousel__card-1" data-modal="${dataPets[indexes[1]].id}">
//             <img src="${dataPets[indexes[1]].img}" alt="${dataPets[indexes[1]].name}">
//             <h3 class="carousel__title">${dataPets[indexes[1]].name}</h3>
//             <button class="btn">Learn more</button>
//         </div>
//         <div class="carousel__card carousel__card-2" data-modal="${dataPets[indexes[2]].id}">
//             <img src="${dataPets[indexes[2]].img}" alt="${dataPets[indexes[2]].name}">
//             <h3 class="carousel__title">${dataPets[indexes[2]].name}</h3>
//             <button class="btn">Learn more</button>
//         </div>
//     `;



