fetch('./annunci.json').then(data => data.json())
.then(ads=>{
 
    
    function populateAds(ads) {
        const adsWrapper = document.querySelector('#ads-wrapper')
        
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
            <h3 class="mb-0 rt-size text-long data-bs-toggle="tooltip" data-bs-placement="top" title="${ad.name}"
            ">${truncateTitle(ad.name)} </h3>
            <i ad-id="${ad.id}" class="${setFavourite(ad.id)} fa-heart "></i>
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
    
    function populatePriceFilter() {
        let minInput = document.querySelector('#min-price-filter')
        let minLabel = document.querySelector('#min-price-label')
        
        let maxInput = document.querySelector('#max-price-filter')
        let maxLabel = document.querySelector('#max-price-label')
        
        let max = ads.map(ad=>ad.price).sort((a,b) => b-a)[0]
        
        
        //inizializzo il massimo e l'attributo max
        maxLabel.innerHTML = `${Math.ceil(max)} €`
        minInput.max = max
        maxInput.max = max
        maxInput.value = max
        
        minInput.addEventListener('input', (e)=>{
            if ((Number(maxInput.value) - 200) <= Number(minInput.value)) {
                e.preventDefault()
                minInput.value = Number(maxInput.value) - 200
            }            
            minLabel.innerHTML = `${minInput.value} €`
        })
        
        maxInput.addEventListener('input', (e)=>{
            if ((Number(maxInput.value) - 200) <= Number(minInput.value)) {
                e.preventDefault()
                maxInput.value = Number(minInput.value) + 200
            }
            maxLabel.innerHTML = `${maxInput.value} €`
        })
    }
    
    function filterByPrice() {
        let minInput = document.querySelector('#min-price-filter') 
        let maxInput = document.querySelector('#max-price-filter')
        
        function filterAds() {
            let filtered = ads.filter(ad => Number(ad.price) > Number(minInput.value) && Number(ad.price) <= Number(maxInput.value)+1).sort((a,b)=>b-a)
            populateAds(filtered)
        }
        
        
        minInput.addEventListener('change', filterAds)
        
        
        maxInput.addEventListener('change',filterAds)
        
    }
    
    function orderElements() {
        let priceUp = document.querySelector('.price-up')
        let priceDown = document.querySelector('.price-down')
        let wordUp = document.querySelector('.word-up')
        let wordDown = document.querySelector('.word-down')
        
        priceUp.addEventListener('input', ()=>{
            let sorted = ads.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
            populateAds(sorted)
            
            
        })
        priceDown.addEventListener('input', ()=>{
            let sorted = ads.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
            populateAds(sorted)
            
            
        })  
        wordUp.addEventListener('input', ()=>{
            let word = ads.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            populateAds(word)
            
            
        })
        wordDown.addEventListener('input', ()=>{
            let word = ads.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))
            populateAds(word)
            
            
        })  
        
    }
    
    
    populateCategoryFilterRadio()
    populateCategoryFilterSelect()
    populatePriceFilter()
    
    orderElements()
    filterByCategoryRadio()
    filterByCategorySelect()
    filterBySearch()
    filterByPrice()
    
    populateAds(ads)
})


