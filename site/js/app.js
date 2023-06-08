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
            <div class='main-result'>
                <h1>Username : ${data.login} </h1>
                <div class='row result-content'>
                    <div class='col-lg-2'>
                        <img src='${data.avatar_url}' class='user-img'>
                    </div>
                    <div class='col-lg-6'>
                        <h2>My Bio :</h2>  <br>
                        <p>Hi all I am ${data.login}. and I am ${data.bio}
                    </div>
                    <div class='col-lg-4'> 
                        <p><b>Created At : </b>${data.created_at}</p>
                        <p><b>Lasr Update At : </b>${data.updated_at}</p>
                    </div>
                </div>
                
            </div>
        `

    })
})