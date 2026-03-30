function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.token) {
            localStorage.setItem("token", data.token);
            alert("Login successful");
            window.location.href = "/admin";
        } else {
            alert("Login failed");
        }
    });
}



window.onload = function () {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Unauthorized");
        window.location.href = "/login.html";
        return;
    }

    loadProjects();
};

function addProject() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first");
        return;
    }

    const name = document.getElementById("name").value;
    const desc = document.getElementById("desc").value;
    const github = document.getElementById("github").value;
    const file = document.getElementById("image").files[0];

    if (!name || !desc || !github || !file) {
        alert("All fields are required");
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("githubURL", github);
    formData.append("image", file);

    fetch("/api/projects", {
        method: "POST",
        headers: {
            "Authorization": token
        },
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
            return;
        }

        alert("Project added");
        loadProjects();
    })
    .catch(err => {
        console.error(err);
        alert("Error adding project");
    });
}

function loadProjects() {
    fetch("/api/projects")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("projects-list");
            container.innerHTML = "";

            data.forEach(project => {
                const div = document.createElement("div");

                div.innerHTML = `
                    <p><strong>${project.name}</strong></p>
                    <button onclick="deleteProject('${project._id}')">Delete</button>
                    <hr>
                `;

                container.appendChild(div);
            });
        })
        .catch(err => {
            console.error(err);
            alert("Error loading projects");
        });
}


function deleteProject(id) {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Unauthorized");
        return;
    }

    if (!confirm("Are you sure?")) return;

    fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": token
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
            return;
        }

        alert("Deleted");
        loadProjects();
    })
    .catch(err => {
        console.error(err);
        alert("Delete failed");
    });
}