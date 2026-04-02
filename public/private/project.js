const grid = document.getElementById("projects-grid");

fetch("http://localhost:5000/api/projects")
    .then(res => res.json())
    .then(data => {
        grid.innerHTML = "";

        data.forEach(project => {
            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <img src="${project.imageURL}">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <button   style="background-color: #28a745; color: white; border-radius: 8px; padding: 5px 15px; cursor: pointer;"
                onclick="window.open('${project.githubURL}', '_blank')">Click</button>
            `;

            grid.appendChild(card);
        });
    })
    .catch(err => console.error("PROJECT ERROR:", err));