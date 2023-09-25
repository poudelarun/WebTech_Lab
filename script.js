async function fetchProfile() {
    const profileContainer = document.getElementById("profile");
    profileContainer.innerHTML = "";
    profileContainer.style.display = "none";

    const username =
      document.getElementById("username").value ||
      document.getElementById("manualUsername").value;
    if (!username) {
      alert("Please enter a GitHub username or select an option.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.github.com/users/${username}`
      );
      if (response.status === 404) {
        profileContainer.style.display = "block";
        profileContainer.innerHTML = "<p>No GitHub user found.</p>";
        return;
      }

      const data = await response.json();
      profileContainer.style.display = "flex";
      const profile = `
      <div class="card mx-auto w-100 p-3 shadow-lg">
            <img src="${
              data.avatar_url
            }" alt="${username}'s Avatar" class="avatar mx-auto shadow-lg">
            <h2>${data.name || username}</h2>
            <p>${data.bio || "No bio available"}</p>
            <p>Followers: ${data.followers}</p>
            <p>Following: ${data.following}</p>
            <p>Public Repositories: ${data.public_repos}</p>
            <p>Location: ${data.location || "Unknown"}</p>
            <p>Company: ${data.company || "N/A"}</p>
            </div>
        `;

      profileContainer.innerHTML = profile;
    } catch (error) {
      console.error("Error fetching GitHub profile:", error);
      profileContainer.innerHTML = "<p>Failed to fetch GitHub profile.</p>";
    }
  }

  window.addEventListener('keypress',()=>{
    if(event.key === "Enter")
    {
      fetchProfile()
    }
  })