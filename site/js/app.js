const nav = document.querySelector('.nav-bar')
fetch('nav.html')
.then(res=>res.text())
.then(data=>{
    nav.innerHTML=data
});

const footer = document.querySelector('.main-footer')
fetch('footer.html')
.then(res=>res.text())
.then(data=>{
    footer.innerHTML=data
});