function truncateTitle(title) {
            
            
    if (title.length < 18) {
        return title
    } else{
        return title.substr(0 ,17) + '...'
    }
    /* let splitted = title.split(' ')
    if(splitted.length > 1){
        return `${splitted[0]}...`
    }else{
        return splitted[0]
    } */
}

function setFavourite(id) {
    if (sessionStorage.getItem('favourite')) {
        let storage = sessionStorage.getItem('favourite').split(',');
        
        if (storage.includes(id.toString())) {
            return `fas tc-main`
        } else{
            return `far`
        }
    }else{
        sessionStorage.setItem('favourite', '')
        return `far`
    }
    
}

function generateFavouriteButtons() {
let favouriteBtns = document.querySelectorAll('.fa-heart')



/* favourite btns */
favouriteBtns.forEach(btn => {
    btn.addEventListener('click', ()=>{
        
        let id = btn.getAttribute('ad-id')
        
        let storage = sessionStorage.getItem('favourite').split(',');

        console.log(storage);
        
        if (storage.includes(id)) {
            storage = storage.filter(el => el != id)
        } else{
            storage.push(id)
        }
        
        sessionStorage.setItem('favourite', storage)

        let slide = document.querySelector(`.ad-${id}`)
        slide.parentNode.removeChild(slide)        
        
        console.log(sessionStorage.getItem('favourite').split(','));
        
        btn.classList.toggle('fas')
        btn.classList.toggle('far')
        btn.classList.toggle('tc-main')
        
    })
})

}
fetch('./annunci.json').then(data => data.json())
.then( ads =>{
    let storage = sessionStorage.getItem('favourite').split(',')
    let favourites = ads.filter(ad => storage.includes(ad.id.toString()))
    
    let wrapper = document.querySelector('.favourites-wrapper')
    
    favourites.forEach(ad =>{
        let slide = document.createElement('div')
        slide.classList.add('swiper-slide', 'text-center', `ad-${ad.id}`)
        slide.innerHTML = 
        `
        <div class="card-product">
            <img class="img-fluid" src="https://picsum.photos/640/360" alt="">
            <div class="card-product-body tc-white">
                <div class="d-flex flex-wrap justify-content-between align-items-center">
                    <h3 class="mb-0 rt-size text-long data-bs-toggle="tooltip" data-bs-placement="top" title="${ad.name}"
                    ">${truncateTitle(ad.name)} </h3>
                    <i ad-id="${ad.id}" class="${setFavourite(ad.id)} fa-heart "></i>
                    <a class="tc-sec w-100 d-flex justify-content-start" href="">${ad.category}</a>
                </div>                    
                <p class="fs-3 pt-3 text-end rt-size">${ad.price}€</p>                    
            </div>                   
        </div>
        `
        wrapper.appendChild(slide)
    })
    const swiper = new Swiper('.swiper-favourite', {
        
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
    generateFavouriteButtons()
})