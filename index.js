// script.js

// Sample projects array — in production, we’ll fetch this from MongoDB
const projects = [
    {
        name: "Portfolio Website",
        description: "My personal portfolio built with HTML, CSS, JS",
        image: "images/1.jpg",
        github: "https://github.com/username/portfolio"
    },
    {
        name: "Weather App",
        description: "A weather forecast app using OpenWeather API",
        image: "images/project2.png",
        github: "https://github.com/username/weather-app"
    },
    {
        name: "Todo App",
        description: "Task manager app built with JS and localStorage",
        image: "images/project3.png",
        github: "https://github.com/username/todo-app"
    },
    {
        name: "Weather App",
        description: "A weather forecast app using OpenWeather API",
        image: "images/project2.png",
        github: "https://github.com/username/weather-app"
    },
    {
        name: "Todo App",
        description: "Task manager app built with JS and localStorage",
        image: "images/1.jpg",
        github: "https://github.com/username/todo-app"
    },
    {
        name: "Todo App",
        description: "Task manager app built with JS and localStorage",
        image: "images/project3.png",
        github: "https://github.com/username/todo-app"
    },
    {
        name: "Todo App",
        description: "Task manager app built with JS and localStorage",
        image: "images/project3.png",
        github: "https://github.com/username/todo-app"
    }
];

const projectsGrid = document.getElementById("projects-grid");

projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
        <img src="${project.image}" alt="${project.name}">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <button class="btn" onclick="window.open('${project.github}', '_blank')">Click</button>
    `;

    projectsGrid.appendChild(card);
});