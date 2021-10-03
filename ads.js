fetch('./annunci.json').then(data => data.json())
.then(ads=>{
    
    function generateFavouriteButtons() {
        let favouriteBtns = document.querySelectorAll('.fa-heart')
        
        
        
        /* favourite btns */
        favouriteBtns.forEach(btn => {
            
            btn.addEventListener('click', function(){
                
                btn.classList.toggle('fas')
                btn.classList.toggle('far')
                btn.classList.toggle('tc-main')
                
            })
        })
        
    }

    
    function populateAds() {
        const adsWrapper = document.querySelector('#ads-wrapper')
        ads.forEach(ad => {
            let card = document.createElement('div')
            
            card.classList.add('col-12', 'col-sm-6', 'col-lg-4')
            
            card.innerHTML = 
            `
            <div class="card-product mb-3">
            <img class="img-fluid" src="https://picsum.photos/640/360" alt="">
            <div class="card-product-body tc-white">
            <div class="d-flex flex-wrap justify-content-between align-items-center">
            <h3 class="mb-0 rt-size">${ad.name}</h3>
            <i  class="far fa-heart favourite"></i>
            <a class="tc-sec w-100 d-flex justify-content-start" href="">${ad.category}</a>
            </div>                    
            <p class="fs-3 pt-3 text-end rt-size">${ad.price}€</p>                    
            </div>
            
            </div>
            `
            adsWrapper.appendChild(card)
        })
    }

    populateAds()
    generateFavouriteButtons()
})
