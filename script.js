var form = document.getElementById('myform');



form.addEventListener('submit', function(e){
    e.preventDefault()

    // var search = document.getElementById('search').value
    var search = document.forms["myForm"]["search"].value;
  
    if(search == ""){
        alert("Enter a valid Github username");
        return false;
    }

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
        

        if(data.public_repos == 0){
            var repo = "I don't have any Github Public Repositories";
        }
        else if(data.public_repos >= 1 && data.public_repos < 50){
            var repo = "I have less then 50 Github Public Repositories";
        }
        else if(data.public_repos >= 50 && data.public_repos < 100){
            var repo = "<img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/bronze%20repo.png?raw=true' class='achie-img'>";
        }
        else if(data.public_repos >= 100 && data.public_repos < 250){
            var repo = "<img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/bronze%20repo.png?raw=true' class='achie-img'><img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/siler%20repo.png?raw=true' class='achie-img'>";
        }
        else if(data.public_repos >= 250){
            var repo = "<img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/bronze%20repo.png?raw=true' class='achie-img'><img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/siler%20repo.png?raw=true' class='achie-img'><img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/gold%20repo.png?raw=true' class='achie-img'>";
        }


        if(data.followers == 0){
            var your_followers = "I don't have any Github sFollowers";
        }
        else if(data.followers >= 1 && data.followers < 24){
            var your_followers = "I have less then 25 Github Followers";
        }
        else if(data.followers >= 25 && data.followers < 50){
            var your_followers = "<img src='https://github.com/JehanKandy/GITHUB-UserProfile-v0.3.2/blob/master/images/bfollowers.png?raw=true' class='achie-nimg'>";
        }
        else if(data.followers >= 50 && data.followers < 100){
            var your_followers = "<img src='https://github.com/JehanKandy/GITHUB-UserProfile-v0.3.2/blob/master/images/bfollowers.png?raw=true' class='achie-nimg'><img src='https://github.com/JehanKandy/GITHUB-UserProfile-v0.3.2/blob/master/images/silver_followers.png?raw=true' class='achie-img'>";
        }
        else if(data.followers >= 100){
            var your_followers = "<img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/bronze%20followers.png?raw=true' class='achie-nimg'><img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/siler%20followers.png?raw=true' class='achie-img'><img src='https://github.com/JehanKandy/GITHUB-UserProfile/blob/master/images/gold%20followers.png?raw=true' class='achie-img'>";
        }

        //fixing some bugs

        if(data.name == null){
            var loginName = "The name of the user can not be identify"
        }
        else{
            var loginName = data.name;
        }

        if(data.bio == null){
            var userBio = "The User doesn't have a Bio";
        }
        else{
            var userBio = data.bio;
        }

        if(data.company == null){
            var userCompany = "The User is not in a Company"; 
        }
        else{
            var userCompany = data.company;
        }

        if(data.public_repos == 0){
            var userRipo = "No";
        }
        else{
            var userRipo = data.public_repos;
        }

        //end fixing

        document.getElementById("result").innerHTML = `
        <div class='row first'>
            <div class='col col-lg-4'>
                <img src="${data.avatar_url}" class='profile-img'/>
            </div>
            <div class='col-7'>
                <div class='row'>                
                    <span class='title'>Username : <span class='data-user'>${loginName}</span></span>
                </div>     
                <div class='row'>
                    <span class='title'>BIO : <span class='data-user'>${userBio}</span></span>
                </div> 
                <br><br>              
                <div class='row'>
                    <span class='data-user'>You are following <span class='title'>${data.following}</span> users</span>
                </div> 
                <div class='row'>
                    <span class='data-user'>You have <span class='title'>${data.followers}</span> Followers</span>
                </div> 
                <div class='row'>
                    <span class='title'>Your Company : <span class='data-user'>${userCompany}</span></span>
                </div> 
                <div class='row'>
                    <span class='title'>Your are : <span class='data-user'>${hire}</span></span>                    
                </div> 
                <br>
                <div class='row'>
                    <span class='data-user'>Your have <span class='title'>${userRipo}</span> public repositories</span>                    
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
        
        `
    })

    fetch("https://api.github.com/users/"+oname+"/followers")
    .then((result_folllow) => result_folllow.json())
    .then((data_follow) => {

        var followers = document.getElementById('result2');

        let countFollowers = '<hr><h2>Some of My followers</h2>';

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

        let countfollowing = '<hr><h2>Some of I Following</h2>';
        
        for(let i = 0; i < data_following.length; i++){
            //countfollowing += '<div>' + data_following[i].login + '</div>';
            countfollowing += "<img src='" + data_following[i].avatar_url + "' class='follower-img'>";
        }

        myfollowing.innerHTML = countfollowing;
    })

    fetch("https://api.github.com/users/"+oname+"/orgs")
    .then((result_myorg) => result_myorg.json())
    .then((data_myorg) => {

        var myorg = document.getElementById('org');

        let countorg = "<hr><h2>My Organizations</h2>";

        if(data_myorg.length === 0){
            countorg += "<p>I don't Have any Organizations</p>";
        }
        else{
            for(let i = 0; i < data_myorg.length; i++){
                //countorg += '<div>' + data_myorg[i].login + '</div>';
                countorg += "<img src='" + data_myorg[i].avatar_url + "' class='follower-img'>";
            }
        }



        myorg.innerHTML = countorg;

    })

})