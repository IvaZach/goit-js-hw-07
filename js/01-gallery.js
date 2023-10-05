import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

/* Створи галерею з можливістю кліку по її елементах і перегляду 
повнорозмірного зображення у модальному вікні. Подивися демо відео 
роботи галереї.
    Виконуй це завдання у файлах 01-gallery.html і 01-gallery.js. 
Розбий його на декілька підзавдань:
1. Створення і рендер розмітки на підставі масиву даних 
galleryItems і наданого шаблону елемента галереї.
2. Реалізація делегування на ul.gallery і отримання 
url великого зображення.
3. Підключення скрипту і стилів бібліотеки модального вікна 
basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання 
на мініфіковані (.min) файли бібліотеки.
4. Відкриття модального вікна по кліку на елементі галереї. 
Для цього ознайомся з документацією і прикладами.
5. Заміна значення атрибута src елемента <img> в модальному вікні перед 
відкриттям. Використовуй готову розмітку модального вікна із 
зображенням з прикладів бібліотеки basicLightbox.*/

const galleryList = document.querySelector('.gallery');

const galleryMarkup = galleryItems
  .map(
    ({ preview, original, description }) =>
      `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
  
  <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  )
  .join('');

galleryList.innerHTML = galleryMarkup;

galleryList.addEventListener('click', openBigCard);

function openBigCard(evn) {
  if (!evn.target.classList.contains('gallery__image')) {
    return;
  } else {
    evn.preventDefault();

    const instance = basicLightbox.create(
      `<div class="modal">
    <img width="1400" height="900" src="${evn.target.dataset.source}">
    </div>`,
      {
        onShow: instance => {
          instance.element().querySelector('.modal').onclick = instance.close;
          document.addEventListener('keydown', clickEscape);
        },
        onClose: instance => document.removeEventListener('keydown', clickEscape),
      }
    );

    instance.show();

    function clickEscape(e) {
      e.key === 'Escape' ? instance.close() : false;
    }
  }
}
