

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

var repoform = document.getElementById('reposearch');

form.addEventListener('submit', function(e){
    e.preventDefault()

    var git_user = document.forms["reposearch"]["repos_user"].value;
    var git_repo = document.forms["reposearch"]["repos_name"].value;

    if(git_user == "" || git_repo == ""){
        alert("Username and Repository cannot be empty..!");
    }

    fetch("https://api.github.com/repos/"+git_user+"/"+git_repo)
    .then((repo_result) => repo_result.json())
    .then((repo_data) => {

        if(repo_data.private == false){
            var repo_p = "<span class='green-b'>Public</span>";
        }
        else if(repo_data.private == true){
            var repo_p = "<span class='red-b'>Private</span>";
        }

        if(repo_data.owner.site_admin == false){
            var userAdmin = "<span class='red-b'>User</span>";
        }
        else if(repo_data.owner.site_admin == true){
            var userAdmin = "<span class='green-b'>Admin</span>";
        }

        if(repo_data.fork == false){
            var fork = "<span class='red-b'>False</span>";
        }
        else if(repo_data.fork == true){
            var fork = "<span class='green-b'>True</span>";
        }

        if(repo_data.has_issues == false){
            var issues = "<span class='red-b'>No Issues</span>";
        }
        else if(repo_data.has_issues == true){
            var issues = "<span class='green-b'>Has Issues</span>";
        }

        if(repo_data.has_projects == false){
            var project = "<span class='red-b'>No Project</span>";
        }
        else if(repo_data.has_projects == true){
            var project = "<span class='green-b'>Has Project</span>";
        }
        
        if(repo_data.has_downloads == false){
            var download = "<span class='green-b'>No Download</span>";
        }
        else if(repo_data.has_downloads == true){
            var download = "<span class='green-b'>Has Download</span>";
        }

        if(repo_data.has_wiki == false){
            var wiki = "<span class='red-b'>No Wiki</span>";
        }
        else if(repo_data.has_wiki == true){
            var wiki = "<span class='green-b'>Has Wiki</span>";
        }

        if(repo_data.has_pages == false){
            var Pages = "<span class='red-b'>No Pages</span>";
        }
        else if(repo_data.has_pages == true){
            var Pages = "<span class='green-b'>Has Pages</span>";
        }

        if(repo_data.has_discussions == false){
            var diss = "<span class='red-b'>No Discussions</span>";
        }
        else if(repo_data.has_discussions == true){
            var diss = "<span class='green-b'>Has Discussions</span>";
        }

        if(repo_data.archived == false){
            var archive = "<span class='green-b'>No Archived</span>";
        }
        else if(repo_data.archived == true){
            var archive = "<span class='red-b'>Archived</span>";
        }

        if(repo_data.disabled == true){
            var disable = "<span class='red-b'>Disabled</span>";
        }
        else if(repo_data.disabled == false){
            var disable = "<span class='green-b'>Not Disabled</span>";
        }

        if(repo_data.allow_forking == false){
            var forking = "<span class='red-b'>False</span>";
        }
        else if(repo_data.allow_forking == true){
            var forking = "<span class='green-b'>True</span>";
        }

        if(repo_data.is_template == false){
            var template = "<span class='red-b'>False</span>";
        }
        else if(repo_data.is_template == true){
            var template = "<span class='green-b'>True</span>";
        }

        if(repo_data.web_commit_signoff_required == true){
            var web_commt = "<span class='green-b'>True</span>";
        }
        else if(repo_data.web_commit_signoff_required == false){
            var web_commt = "<span class='red-b'>False</span>";
        }

        var reposs = document.getElementById('result-repo');

         let repos_all = `
            <div class='repo-card'>
                <h3><a href='${repo_data.html_url}' target='_blank'>${repo_data.name}</a></h3>
                <p class='repo-desc'>${repo_data.description}</p>
                <p><b>Topics</b></p>
                ${repo_data.topics}
                <br><br>
                <h3>Repository Status</h3>

                <h3>Watchers : ${repo_data.watchers}</h3>

                <div class='row'>
                    <div class='col-lg-6'>
                        <table class="table">
                            <thead class="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Repository State (Public/Private)</td>
                                    <td>${repo_p}</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>User State (Admin/User)</td>
                                    <td>${userAdmin}</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Repository is Fork (True/False)</td>
                                    <td>${fork}</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Repository has Issues</td>
                                    <td>${issues}</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Repository has Projects</td>
                                    <td>${project}</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Repository has Download</td>
                                    <td>${download}</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>Repository has Wiki</td>
                                    <td>${wiki}</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>Repository has Pages</td>
                                    <td>${Pages}</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>Repository has Discussions</td>
                                    <td>${diss}</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>Repository is Archive</td>
                                    <td>${archive}</td>
                                </tr>
                                <tr>
                                    <td>11</td>
                                    <td>Repository is Disable</td>
                                    <td>${disable}</td>
                                </tr>
                                <tr>
                                    <td>12</td>
                                    <td>Repository is Allow to Forking (True/False)</td>
                                    <td>${forking}</td>
                                </tr>
                                <tr>
                                    <td>13</td>
                                    <td>Repository is Template (True/False)</td>
                                    <td>${template}</td>
                                </tr>
                                <tr>
                                    <td>14</td>
                                    <td>Repository is Web Commit Signoff Required (True/False)</td>
                                    <td>${template}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

        
        `;                       
        
        fetch("https://api.github.com/repos/"+git_user+"/"+git_repo+"/stargazers")
        .then((repo_stargazers) => repo_stargazers.json())
        .then((repo_stargazers_data) => {
            repos_all += `<div class='col-lg-6'>
                <h3>Repository Stargazers</h3>
                <hr>
            `
                
            for(let i = 0; i < repo_stargazers_data.length; i++){
                repos_all += `<span>${repo_stargazers_data[i].login} <a href='${repo_stargazers_data[i].html_url}' target='_blank'><img src='${repo_stargazers_data[i].avatar_url}' class='star-img'></a></span>`;
            }

            repos_all += `</div>
                </div>`;

        })

        fetch("https://api.github.com/repos/"+git_user+"/"+git_repo+"/contributors")
        .then((repo_contributors) => repo_contributors.json())
        .then((repo_contributors_data) => {
            repos_all += `<br>
                <div class='row'>
                <div class='col-lg-6'>
                    <h3>Repository Contributors</h3>
                    <hr>
            `
                
            for(let i = 0; i < repo_contributors_data.length; i++){
                repos_all += `<h4>${repo_contributors_data[i].login} <a href='${repo_contributors_data[i].html_url}' target='_blank'><img src='${repo_contributors_data[i].avatar_url}' class='star-img'></a></h4>
                            <h5>Contributions : ${repo_contributors_data[i].contributions}</h5>
                `;
            }

            repos_all += `</div>
                `;

        })

        fetch("https://api.github.com/repos/"+git_user+"/"+git_repo+"/forks")
        .then((repo_forks) => repo_forks.json())
        .then((forks_data) => {
            repos_all += `<div class='col-lg-6'>
                <h3>Repository forkers</h3>
                <hr>
            `
                
            for(let i = 0; i < forks_data.length; i++){
                repos_all += `<span>${forks_data[i].owner.login} <a href='${forks_data[i].owner.html_url}' target='_blank'><img src='${forks_data[i].owner.avatar_url}' class='star-img'></a></span>`;
            }

            repos_all += `</div>
                </div>`;

            reposs.innerHTML = repos_all;  

        })      
    })   
})

var orgform = document.getElementById('orgsearch');

form.addEventListener('submit', function(e){
    e.preventDefault()

    var org_name = document.forms["orgsearch"]["org_name"].value;

    if(git_user == "" || git_repo == ""){
        alert("Organization Name cannot be empty..!");
    }

    fetch("hhttps://api.github.com/orgs/"+org_name)
    .then((org_result) => org_result.json())
    .then((org_data) => {
        
        var name_org = document.getElementById('result-org');

        let org_all = `
            <h1>${org_data.}</h1>
        `;

        name_org.innerHTML = org_all;


        

    }) 
})