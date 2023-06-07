const nav = document.querySelector('.nav-bar')
fetch('nav.html')
.then(res=>res.text())
.then(data=>{
    nav.innerHTML=data
});

const nav_profile = document.querySelector('.nav-profile')
fetch('nav_profile.html')
.then(res=>res.text())
.then(data=>{
    nav_profile.innerHTML=data
});

const nav_repo = document.querySelector('.nav-repo')
fetch('repo_nav.html')
.then(res=>res.text())
.then(data=>{
    nav_repo.innerHTML=data
});

const footer = document.querySelector('.main-footer')
fetch('footer.html')
.then(res=>res.text())
.then(data=>{
    footer.innerHTML=data
});

