document.getElementById('githubForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    getUser(username);
    getRepos(username);
});

async function getUser(username) {
    const url = `https://api.github.com/users/${username}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.status === 200) {
            const userDetails = `
                <div class="profile">
                    <img src="${data.avatar_url}" alt="Avatar" width="80" height="80">
                    <div>
                        <h2>${data.name}</h2>
                        <p>${data.bio ? data.bio : 'No bio available'}</p>
                        <p><a href="${data.html_url}" target="_blank">View Profile on GitHub</a></p>
                        <p>Public Repos: ${data.public_repos}</p>
                        <p>Followers: ${data.followers}</p>
                        <p>Following: ${data.following}</p>
                    </div>
                </div>
            `;
            document.getElementById('userDetails').innerHTML = userDetails;
        } else {
            document.getElementById('userDetails').innerHTML = `<p>User not found</p>`;
        }
    } catch (error) {
        document.getElementById('userDetails').innerHTML = `<p>Failed to fetch user details. Please try again later.</p>`;
    }
}

async function getRepos(username) {
    const url = `https://api.github.com${username}/repos`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (response.status === 200 && data.length > 0) {
            let repos = '<h3>Repositories:</h3>';
            data.forEach(repo => {
                repos += `
                    <div class="repo">
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        <p>${repo.description ? repo.description : 'No description'}</p>
                    </div>
                `;
            });
            document.getElementById('repos').innerHTML = repos;
        } else {
            document.getElementById('repos').innerHTML = `<p>No repositories found</p>`;
        }
    } catch (error) {
        // document.getElementById('repos').innerHTML = `<p>Failed to fetch repositories. Please try again later.</p>`;
    }
}

