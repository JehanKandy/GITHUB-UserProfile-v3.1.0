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


var form = document.getElementById('myform');

form.addEventListener('submit', function(e){
    e.preventDefault()
    var search = document.forms["myForm"]["search"].value;
  
    if(search == ""){
        alert("Enter a valid Github username");
        return false;
    }

    var oname = search.split(' ').join()
    alert(oname);

    fetch("https://api.github.com/users/" + oname)
    .then((result) => result.json())
    .then((data) => {
        
    document.getElementById("result").innerHTML = `
        <p>Username : ${data.company}</p>  
        `

    })
})