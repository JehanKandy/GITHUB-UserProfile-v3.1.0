var form = document.getElementById('myform');

form.addEventListener('submit', function(e){
    e.preventDefault()

    var search = document.getElementById('search').value
    
    var oname = search.split(' ').join()
    alert(oname);
    
    fetch("https://api.github.com/users/"+oname)
    .then((result) => result.json())
    .then((data) => {

        //const follow = collect(data.followers);

        document.getElementById("result").innerHTML = `
        <div class='row first'>
            <div class='col col-lg-4'>
                <img src="${data.avatar_url}" class='profile-img'/>
            </div>
            <div class='col-7'>
                <div class='row'>                
                    <span class='title'>Username : <span class='data-user'>${data.name}</span></span>
                </div>     
                <div class='row'>
                    <span class='title'>BIO : <span class='data-user'>${data.bio}</span></span>
                </div> 
                <br><br>              
                <div class='row'>
                    <span class='data-user'>You are following <span class='title'>${data.following}</span> users</span>
                </div> 
                <div class='row'>
                    <span class='data-user'>You have <span class='title'>${data.followers}</span> Followers</span>
                </div> 
                <div class='row'>
                    <span class='title'>Your Company : <span class='data-user'>${data.company}</span></span>
                </div> 
            </div>
        </div>
        `

    })
})