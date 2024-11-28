import { svgDelete } from "./svg.js";
document.addEventListener('DOMContentLoaded', function () {
    //size
    const sidebar = document.getElementById('aside');
    const headerUpperH = document.getElementById('header-upper').clientHeight;
    const headerEl = document.getElementById('header');
    const headerH = document.getElementById('header').clientHeight;
    const body = document.body;

    body.style.paddingTop = headerH + 4 + 'px';
    sidebar.style.top = headerUpperH + 1 + 'px';



    // fixed header
    window.addEventListener("scroll", function () {
        const scrollPos = window.scrollY;

        if (scrollPos > 20) {
            headerEl.classList.add("header__scrolling")
        } else {
            headerEl.classList.remove("header__scrolling")
        }

    });

    // show sidebar
    const showSidebar = (btn, sidebarId, headerLowerId, mainId) => {
        const buttons = document.querySelectorAll(btn),
            sidebar = document.getElementById(sidebarId),
            headerLower = document.getElementById(headerLowerId),
            main = document.getElementById(mainId)


        for (let button of buttons) {
            if (button && sidebar && headerLower && main) {
                button.addEventListener('click', () => {
                    sidebar.classList.toggle('show-sidebar'),
                        headerLower.classList.toggle('left-pd'),
                        main.classList.toggle('left-pd'),
                        button.classList.toggle('btn-sidebar--active')
                })
            }
        }
    }
    showSidebar('.btn-sidebar', 'aside__content', 'header-lower', 'main')


    // sidebar links
    const sidebarLink = document.querySelectorAll('.nav__list li')

    function linkColor() {
        sidebarLink.forEach(l => l.classList.remove('nav__item--active'))
        this.classList.add('nav__item--active')
    }

    sidebarLink.forEach(l => l.addEventListener('click', linkColor))



    // tab
    let tabsBtn = document.querySelectorAll('.nav__link');
    let tabsItem = document.querySelectorAll('.tab__content');

    tabsBtn.forEach(function (element) {
        element.addEventListener('click', function (e) {
            const path = e.currentTarget.dataset.path;

            tabsBtn.forEach(function (btn) { btn.classList.remove('nav__link--active') });
            e.currentTarget.classList.add('nav__link--active');

            tabsItem.forEach(function (element) { element.classList.remove('tab__content--active') });
            document.querySelector(`[data-target="${path}"]`).classList.add('tab__content--active');
        });
    });




// tag inputbox
    function addTag(tag, container) {
        if (tag.trim() === '') return;
        const tagsContainer = container.querySelector('.tags-container');
        const tagSpan = document.createElement('li');
        const tagContent = document.createElement('p');

        tagSpan.classList.add('tag');
        tagContent.textContent = tag;

        const removeIcon = document.createElement('button');
        removeIcon.classList.add('tag__delete', 'btn-reset');
        removeIcon.innerHTML = svgDelete;
        removeIcon.addEventListener('click', function () {
            tagsContainer.removeChild(tagSpan);
        });
        tagSpan.appendChild(tagContent);
        tagSpan.appendChild(removeIcon);
       
        tagsContainer.appendChild(tagSpan);
    }

    document.querySelectorAll('.tag-input').forEach(input => {
        input.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                addTag(this.value, this.closest('.command__list'));
                this.value = '';
            }
        });
    });

    document.querySelectorAll('.btn__input-add').forEach(button => {
        button.addEventListener('click', function () {
            const inputTag = this.closest('.common__frame').querySelector('.tag-input');
            addTag(inputTag.value, this.closest('.common__frame'));
            inputTag.value = '';
        });
    });


document.querySelectorAll('.input__clean').forEach(button => {
    button.addEventListener('click', function () {
        const commandFrame = this.closest('.input__frame');
        const tagsContainer = commandFrame.querySelector('.tags-container');
        tagsContainer.innerHTML = '';
    });
});


// modal
document.getElementById("btnCreate").addEventListener("click", function() {
    body.classList.add('stop-scroll');
    document.getElementById("modal").classList.add("open");
});

document.getElementById("form-close").addEventListener("click", function () {
    body.classList.remove('stop-scroll');
    document.getElementById("modal").classList.remove("open");

  }
  );


document.getElementById("low-close").addEventListener("click", function () {
    body.classList.remove('stop-scroll');
    document.getElementById("modal").classList.remove("open");
  }
  );

  document.getElementById("form-cancel").addEventListener("click", function () {
    body.classList.remove('stop-scroll');
    document.getElementById("modal").classList.remove("open");
  }
  );


 });