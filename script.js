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

        if(data.public_repos >= 50 && data.public_repos < 100){
            var repo = "<img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/bronze%20repo.png?raw=true' class='achie-img'>";
        }
        else if(data.public_repos >= 100 && data.public_repos < 250){
            var repo = "<img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/bronze%20repo.png?raw=true' class='achie-img'><img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/siler%20repo.png?raw=true' class='achie-img'>";
        }
        else if(data.public_repos >= 250){
            var repo = "<img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/bronze%20repo.png?raw=true' class='achie-img'><img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/siler%20repo.png?raw=true' class='achie-img'><img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/gold%20repo.png?raw=true' class='achie-img'>";
        }


        if(data.followers >= 25 && data.followers < 50){
            var your_followers = "<img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/bronze%20followers.png?raw=true' class='achie-img'>";
        }
        else if(data.followers >= 50 && data.followers < 100){
            var your_followers = "<img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/bronze%20followers.png?raw=true' class='achie-img'><img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/siler%20followers.png?raw=true' class='achie-img'>";
        }
        else if(data.followers >= 100){
            var your_followers = "<img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/bronze%20followers.png?raw=true' class='achie-img'><img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/siler%20followers.png?raw=true' class='achie-img'><img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/gold%20followers.png?raw=true' class='achie-img'>";
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
            <p>${repo}</p>
            <h4>in Followers</h4>
            <p>${your_followers}</p>
        </div>
        <hr>
        <h2>Some of My followers</h2>
        `
    })

    fetch("https://api.github.com/users/"+oname+"/followers")
    .then((result_folllow) => result_folllow.json())
    .then((data_follow) => {

        var followers = document.getElementById('result2');

        let countFollowers = '';

        for(let i = 0; i < data_follow.length; i++){
            //countFollowers += '<div>' + data_follow[i].login + '</div>';
            countFollowers += "<img src='" + data_follow[i].avatar_url + "' class='follower-img'>";
        }

        followers.innerHTML = countFollowers;
    })

    fetch("https://api.github.com/users/"+oname+"/following")
    .then((result_folllowing) => result_folllowing.json())
    .then((data_following) => {

        var myfollowing = document.getElementById('following');

    })

})