const grid = document.getElementById("projects-grid");

fetch("/api/projects")
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
                <button onclick="window.open('${project.githubURL}', '_blank')">Click</button>
            `;

            grid.appendChild(card);
        });
    })
    .catch(err => console.error("PROJECT ERROR:", err));