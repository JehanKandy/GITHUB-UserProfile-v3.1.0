var repoform = document.getElementById('reposearch');

form.addEventListener('submit', function(e){
    e.preventDefault()

    var git_user = document.forms["reposearch"]["repos_user"].value;
    var git_repo = document.forms["reposearch"]["repos_name"].value;


    fetch("https://api.github.com/repos/"+git_user+"/"+git_repo)
    .then((result) => result.json())
    .then((data) => {

        var repo_result = document.getElementById('repo-search');

        var repo_view = `
        
        `;

        repo_result.innerHTML = repo_view;

    })
})