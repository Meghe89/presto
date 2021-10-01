/* collegamenti */
const navbar = document.querySelector('#nav-presto')

/* event */
document.addEventListener('scroll', ()=>{
    console.log(window.scrollY);
    if (window.scrollY > 100) {
        navbar.classList.add('bg-white')
    } else{
        navbar.classList.remove('bg-white')
    }
})