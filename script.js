/* collegamenti */
const navbar = document.querySelector('#nav-presto')
const toggler = document.querySelector('.navbar-toggler')

/* event */
document.addEventListener('scroll', ()=>{
    console.log(window.scrollY);
    if (window.scrollY > 100) {
        navbar.classList.add('bg-white')
    } else{
        navbar.classList.remove('bg-white')
    }
})

toggler.addEventListener('click', ()=>{
    toggler.classList.toggle('fa-rotate-90')
})