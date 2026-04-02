// ACHIEVEMENTS
fetch("https://portfolio-website-production-8edc.up.railway.app/api/achievements")
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById("achievements-grid");
        grid.innerHTML = "";

        data.forEach(item => {
            const card = document.createElement("div");
            card.className = "achievement-card";

            card.innerHTML = `
                <img src="${item.imageURL}">
                <h3>${item.title}</h3>
                <p>${item.organization}</p>
                <small>${item.description}</small>
            `;

            grid.appendChild(card);
        });
    })
    .catch(err => console.error("ACHIEVEMENT ERROR:", err));


// SKILLS
fetch("/api/skills")
    .then(res => res.json())
    .then(data => {
        const grid = document.getElementById("skills-grid");
        grid.innerHTML = "";

        data.forEach(skill => {
            const card = document.createElement("div");
            card.className = "skill-card";

            card.innerHTML = `
                <img src="${skill.iconURL}">
                <h3>${skill.name}</h3>
            `;

            grid.appendChild(card);
        });
    })
    .catch(err => console.error("SKILL ERROR:", err));