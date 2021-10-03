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
    
    
    function populateAds(ads) {
        const adsWrapper = document.querySelector('#ads-wrapper')
        
        adsWrapper.innerHTML = ''
        ads.forEach((ad , i) => {
            let card = document.createElement('div')
            
            card.classList.add('col-12', 'col-sm-6', 'col-lg-4')
            
            card.innerHTML = 
            `
            <div class="card-product mb-3"
            data-aos="flip-right" //animazione da effettuare
            data-aos-offset="100"
            data-aos-delay="30"
            data-aos-duration="1000" //durata
            data-aos-easing="ease-in-out" //velocità animazione
            data-aos-once="true" //ripetuta o meno
            data-aos-anchor-placement="top-center"
            >
            <img class="img-fluid" src="https://picsum.photos/640/360" alt="">
            <div class="card-product-body tc-white">
            <div class="d-flex flex-wrap justify-content-between align-items-center">
            <h3 class="mb-0 rt-size text-long
            ">${ad.name} </h3>
            <i  class="far fa-heart favourite"></i>
            <a class="tc-sec w-100 d-flex justify-content-start" href="">${ad.category}</a>
            </div>                    
            <p class="fs-3 pt-3 text-end rt-size">${ad.price}€</p>                    
            </div>
            
            </div>
            `
            adsWrapper.appendChild(card)
        })
        generateFavouriteButtons()
    }
    
    /* per prendere le categorie possiamo utilizzare 2 metodi */
    //Primo: map degli elementi, creando un set per eliminare le copie, e riportandolo ad Array
    /* let categories = Array.from(new Set(ads.map(ad=> ad.category))); */
    
    
    
    /* Secondo: foreach con controllo */
    
    /* let categories = []
    
    ads.map(ad=>ad.category).forEach(category => {
        if (!categories.includes(category)) {
            categories.push(category)            
        } 
    }); */
    
    
    
    function populateCategoryFilterRadio() {
        
        let categories = Array.from(new Set(ads.map(ad=> ad.category)));
        let wrapperRadio = document.querySelector('#wrapper-category-radio')
        
        categories.forEach((category, i) => {
            let input = document.createElement('div')
            input.classList.add('form-check')
            input.innerHTML = 
            `
            <input class="form-check-input filter-category" type="radio" name="category-filter" id="flexRadioDefault${i}" data-filter='${category}'>
            <label class="form-check-label" for="flexRadioDefault${i}">
            ${category}
            </label>
            `
            wrapperRadio.appendChild(input)
        })    
    }
    
    function populateCategoryFilterSelect() {
        let categories = Array.from(new Set(ads.map(ad=> ad.category)));
        let wrapperSelect = document.querySelector('#category-select')
        
        categories.forEach(category => {
            let option = document.createElement('option')
            option.innerHTML = `${category}`
            option.value = `${category}`
            wrapperSelect.appendChild(option)
        });
        {/* <option value="1">One</option> */}
    }
    
    function filterByCategoryRadio() {
        let radios = document.querySelectorAll('.filter-category')
        radios.forEach(radio =>{
            radio.addEventListener('input',()=>{
                let selected = radio.getAttribute('data-filter')
                
                if (selected === 'all') {
                    populateAds(ads)
                } else {
                    let filtered = ads.filter(ad => ad.category === selected)
                    
                    populateAds(filtered) 
                }
                
                
            })
        })
    }
    
    function filterByCategorySelect() {
        let input = document.querySelector('#category-select')
        
        input.addEventListener('change', ()=>{
            if (input.value === 'all') {
                populateAds(ads)
            } else {
                let filtered = ads.filter(ad => ad.category === input.value)
                
                populateAds(filtered) 
            }
        })
    }
    
    function filterBySearch() {
        let input = document.querySelector('#search-input')
        let lastLenght = input.value.length
        input.addEventListener('keydown', (e)=>{

            if (e.code == 'Enter') {
                let filtered = ads.filter(ad =>ad.name.toLowerCase().includes(input.value.toLowerCase()))
                
                populateAds(filtered) 
            }
            
            
        })
    }
    
    
    
    populateCategoryFilterRadio()
    populateCategoryFilterSelect()
    filterByCategoryRadio()
    filterByCategorySelect()
    filterBySearch()
    populateAds(ads)
    
})


