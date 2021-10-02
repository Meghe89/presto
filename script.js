/* collegamenti */
const navbar = document.querySelector('#nav-presto')
const toggler = document.querySelector('.navbar-toggler')
const categoriesWrapper = document.querySelector('#categories-wrapper')



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


/* creazione elementi  */

categories.forEach(category=>{
    console.log(category);
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

