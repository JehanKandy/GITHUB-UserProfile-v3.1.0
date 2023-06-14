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

const nav_org = document.querySelector('.nav-org')
fetch('org_nav.html')
.then(res=>res.text())
.then(data=>{
    nav_org.innerHTML=data
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
        

    if(data.hireable == true){
        var hire = "Hireable";
    }
    else if(data.hireable == false){
        var hire = "Not Hireable";
    }


    document.getElementById("result").innerHTML = `
           
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
                        <p><b>Last Update At : </b>${data.updated_at}</p>
                    </div>
                </div>
                <hr>                
                <div class='row result-content'>
                    <div class='col-lg-3'>
                        <h3>Location</h3>
                        <p>I am currently live in ${data.location}.</p>
                    </div>
                    <div class='col-lg-3'>
                        <h3>My Company</h3>
                        <p>${data.company}.</p>
                    </div>
                    <div class='col-lg-3'> 
                        <h3>My Blog</h3>
                        <p><a href='${data.blog}' target='_blank'>${data.blog}</a></p>

                    </div>
                    <div class='col-lg-3'> 
                        <h3>I am</h3>
                        <p>${hire}</p>
                    </div>
                </div>
                <hr>
                <div class='row result-content'>
                    <div class='col-lg-3'>
                        <h3>I am in Twitter</h3>
                        <p><a href='https://twitter.com/${data.twitter_username}' target='_blank'>@${data.twitter_username}</a></p>
                    </div>
                    <div class='col-lg-3'>
                        <h3>I have Created </h3>
                        <p>${data.public_repos} Public Repositories</p>
                    </div>
                    <div class='col-lg-3'> 
                        <h3>I Have</h3>
                        <p>${data.followers} Followers</p>

                    </div>
                    <div class='col-lg-3'> 
                        <h3>I am Following</h3>
                        <p>${data.following} Users</p>
                    </div>
                </div>
                <hr>

                                
            </div>
        `

    })

    
    fetch("https://api.github.com/users/"+oname+"/followers")
    .then((result_folllow) => result_folllow.json())
    .then((data_follow) => {

        var followers = document.getElementById('followers');

        let countFollowers = "<h2>Some of My followers</h2>";

        for(let i = 0; i < data_follow.length; i++){
            //countFollowers += '<div>' + data_follow[i].login + '</div>';
            countFollowers += "<span><a href='" + data_follow[i].html_url + "' target='_blank'><img src='" + data_follow[i].avatar_url + "' class='follower-img'></a> "+ data_follow[i].login +"</span><br>";
        }

        followers.innerHTML = countFollowers;

    })

    fetch("https://api.github.com/users/"+oname+"/following")
    .then((result_folllowing) => result_folllowing.json())
    .then((data_following) => {

        var myfollowing = document.getElementById('following');

        let countfollowing = '<h2>Some of I Following</h2>';
        
        for(let i = 0; i < data_following.length; i++){
            //countfollowing += '<div>' + data_following[i].login + '</div>';
            countfollowing += "<a href='"+ data_following[i].html_url +"' target='_blank'><img src='" + data_following[i].avatar_url + "' class='follower-img'></a> "+ data_following[i].login +"</span><br>";
        }

        myfollowing.innerHTML = countfollowing;
    })

    fetch("https://api.github.com/users/"+oname+"/orgs")
    .then((result_org) => result_org.json())
    .then((data_org) => {

        var myorg = document.getElementById('result-org');

        let countorg = '<h2>My Organizations</h2>';
        
        for(let i = 0; i < data_org.length; i++){
            //countorg += '<div>' + data_following[i].login + '</div>';

            countorg += `<span><img src='${data_org[i].avatar_url}' class='org-img'>
                        <span class='org-name'>${data_org[i].login}</span></span>
            <br>
            <hr style='width:50%;'>`;


        }
        countorg += "<hr>"
        myorg.innerHTML = countorg;
    })

})

var form = document.getElementById('repoForm');

form.addEventListener('submit', function(e){
    e.preventDefault()

    var git_user = document.forms["repoForm"]["userName"].value;
    var git_repo = document.forms["repoForm"]["repoName"].value;

    fetch("https://api.github.com/repos/"+git_user+"/"+git_repo)
    .then((repo_result) => repo_result.json())
    .then((repo_data) => {

        document.getElementById('repo-search').innerHTML = `
            <u><h1><b>Repository Full Name</b> : ${repo_data.full_name}</h1></u>
            <h2>Repository Owner</h2>            
            <div class='repo-owner'>
                <b>Name : </b> <a href='${repo_data.owner.html_url}' target='_blank'>${repo_data.owner.login}</a><br>
                <img src='${repo_data.owner.avatar_url}' class='repo-owner-img'>
            </div>
            <h2>Repository Data</h2> 
            <div class='repo-data'>
                <b>Repository Name : </b> <a href='${repo_data.html_url}' target='_blank'>${repo_data.name}</a><br>
            </div>
        
        `;        

    })
})