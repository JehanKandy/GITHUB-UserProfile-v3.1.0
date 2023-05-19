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

        if(data.hireable == true){
            var hire = "hireable";
        }
        else{
            var hire = "not hireable";
        }

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
                <div class='row'>
                    <span class='title'>Your are : <span class='data-user'>${hire}</span></span>                    
                </div> 
                <br>
                <div class='row'>
                    <span class='data-user'>Your have <span class='title'>${data.public_repos}</span> public repositories</span>                    
                </div> 
            </div>
        </div>
        <hr>
        <div class='row'>
            <h2>My Github Achievements</h2>
            <h4>in Repositories</h4>
            <h4>in Followers</h4>
        </div>
        `

    })
})