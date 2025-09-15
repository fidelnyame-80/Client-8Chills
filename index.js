//functionalities for the site
const hamburgerMenu = document.getElementById('hamburgerMenu');
const ham1 = document.getElementById('ham1');
const ham2 = document.getElementById('ham2');
const ham0 = document.getElementById('ham0');
const hamMenuList = document.getElementById('hamMenuList');
const hamMenuList1 = document.getElementById('hamMenuList1');

hamburgerMenu.addEventListener('click',()=>{
    ham1.classList.toggle('rotate-[45deg]');
    ham2.classList.toggle('rotate-[-45deg]');
    ham2.classList.toggle('transform');
    ham2.classList.toggle('translate-y-[-10px]');
    ham0.classList.toggle('invisible');
});


hamburgerMenu.addEventListener('click',()=>{
    hamMenuList.classList.toggle('hidden')
});

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  }
});

let shopCatalogue; //shop catalogue

shopCatalogue = document.getElementById('shopCatalogue');
let catalogueItems = document.getElementById('catalogueItems');

shopCatalogue.addEventListener('click',()=>{
  catalogueItems.classList.toggle('hidden');
});








