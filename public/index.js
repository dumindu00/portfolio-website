const projectsGrid = document.getElementById("projects-grid");

fetch("/api/projects")
    .then(res => res.json())
    .then(data => {
        projectsGrid.innerHTML = "";

        data.forEach(project => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${project.imageURL}" alt="${project.name}">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <button class="btn" onclick="window.open('${project.githubURL}', '_blank')">Click</button>
            `;

            projectsGrid.appendChild(card);
        });
    })
    .catch(err => console.error(err));



    // Add Projects

function addProject() {
    const formData = new FormData();

    formData.append("name", document.getElementById("name").value);
    formData.append("description", document.getElementById("desc").value);
    formData.append("githubURL", document.getElementById("github").value);
    formData.append("image", document.getElementById("image").files[0]);

    fetch("/api/projects", {
        method: "POST",
        headers: {
            "Authorization": localStorage.getItem("token")
        },
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        alert("Project added");
        loadProjects();
    })
    .catch(err => console.error(err));
}