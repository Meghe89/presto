/* collegamenti */
const navbar = document.querySelector('#nav-presto')
const toggler = document.querySelector('.navbar-toggler')
const categoriesWrapper = document.querySelector('#categories-wrapper')
const swiperWrapper = document.querySelector('.swiper-last-ads-wrapper')


/* event */
// cambio colore navbar
document.addEventListener('scroll', ()=>{
    
    if (window.scrollY > 100) {
        navbar.classList.add('bg-white')
    } else{
        navbar.classList.remove('bg-white')
    }
})

//hamburger ruota
toggler.addEventListener('click', ()=>{
    toggler.classList.toggle('fa-rotate-90')
})


/* creazione elementi  */

let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

function populateCategories() {
    /* array categorie */
    let categories = [
        {'name' : 'Moto' , icon : 'fas fa-motorcycle'},
        {'name' : 'Auto' , icon : 'fas fa-car'},
        {'name' : 'Bici' , icon : 'fas fa-bicycle'},
        {'name' : 'Telefono' , icon : 'fas fa-mobile'},
        {'name' : 'Computer' , icon : 'fas fa-laptop'},
        {'name' : 'Gaming' , icon : 'fas fa-gamepad'},
        {'name' : 'Immobili' , icon : 'fas fa-home'},
        {'name' : 'Guitars' , icon : 'fas fa-guitar'},
    ]
    
    /* categories */

    if (!categoriesWrapper) {
        return
    }
    categories.forEach(category=>{
        
        let card = document.createElement('div')
        card.classList.add('col-12', 'col-md-6', 'col-lg-3','d-flex', 'justify-content-center')
        card.innerHTML = 
        `
        <div class="card-category tc-white text-center my-3">
        <h3 class="fw-bold mb-4 tc-main"> <i class="${category.icon}"></i> ${category.name}</h3>
        <button class="btn-main">Vai alla categoria</button>
        </div>
        `
        categoriesWrapper.appendChild(card)
    })
}

function populateLastAds() {
    /* array lastAds */
    let lastAds = [
        {
            "id":1,
            "name": "Huawei X5",
            "category": "Elettronica",
            "price": "120.12"
        },
        {
            "id": 2,
            "name": "Fiat 500",
            "category": "Moto",
            "price": "2000.32"
        },
        {
            "id": 3,
            "name": "Mazza da Baseball",
            "category": "Sport",
            "price": "20.15"
        },
        {
            "id": 4,
            "name": "Bilocale",
            "category": "Immobili",
            "price": "3000.54"
        },
        {
            "id": 5,
            "name": "Felpa usata",
            "category": "Abbigliamento",
            "price": "10.42"
        },
        {
            "id": 6,
            "name": "Divani due posti",
            "category": "Arredamento",
            "price":"400.64"
        },
        {
            "id": 7,
            "name": "Pala",
            "category": "Giardinaggio",
            "price":"30.45"
        }
    ]
    /* last ads */
    if (!swiperWrapper) {
        return
    }
    lastAds.forEach(ad=>{
        let slide = document.createElement('div')
        slide.classList.add('swiper-slide', 'text-center')
        slide.innerHTML = 
        `
        <div class="card-product">
        <img class="img-fluid" src="https://picsum.photos/640/360" alt="">
        <div class="card-product-body tc-white">
        <div class="d-flex flex-wrap justify-content-between align-items-center">
        <h3 class="mb-0 rt-size">${ad.name}</h3>
        <i  class="far fa-heart favourite"></i>
        <a class="tc-sec w-100 d-flex justify-content-start" href="">${ad.category}</a>
        </div>                    
        <p class="fs-3 pt-3 text-end rt-size">${ad.price}€</p>                    
        </div>
        `
        swiperWrapper.appendChild(slide)
    })
}

function generateCarousel() {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        
        loop: true,
        
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        breakpoints: {
            
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            1000: {
                slidesPerView: 2,
                spaceBetween: -30,
            },
            1424: {
                slidesPerView: 3,
                spaceBetween: -50,
            },
        },
    });
    
    
    
}

function generateFavouriteButtons() {
    let favouriteBtns = document.querySelectorAll('.fa-heart')
        
        
        
        
    favouriteBtns.forEach(btn => {
        btn.addEventListener('click', ()=>{
            
            let id = btn.getAttribute('ad-id')
            
            let storage = sessionStorage.getItem('favourite').split(',');
            
            if (storage.includes(id)) {
                storage = storage.filter(el => el != id)
            } else{
                storage.push(id)
            }
            
            
            sessionStorage.setItem('favourite', storage)
            
            console.log(sessionStorage.getItem('favourite').split(','));
            
            
            
            
            btn.classList.toggle('fas')
            btn.classList.toggle('far')
            btn.classList.toggle('tc-main')
            
        })
    })
}


populateCategories()
populateLastAds()
generateCarousel()
generateFavouriteButtons()
