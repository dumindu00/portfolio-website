// =====================
// LOGIN
// =====================
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Enter username and password");
        return;
    }

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
            loadProjects();
        } else {
            alert(data.msg || "Login failed");
        }
    })
    .catch(() => alert("Login error"));
}


function logout() {
    localStorage.removeItem("token")
    alert("Logged out")

    window.location.href = "/"
}




// =====================
// HELPER
// =====================
function getToken() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please login first");
        throw new Error("No token");
    }
    return token;
}


// =====================
// ADD PROJECT
// =====================
function addProject() {
    let token;
    try {
        token = getToken();
    } catch {
        return;
    }

    const name = document.getElementById("name").value;
    const desc = document.getElementById("desc").value;
    const github = document.getElementById("github").value;
    const image = document.getElementById("image").files[0];

    if (!name || !desc || !github || !image) {
        alert("All fields required");
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("githubURL", github);
    formData.append("image", image);

    fetch("/api/projects", {
        method: "POST",
        headers: { "Authorization": token },
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) return alert(data.error);
        alert("Project added");
        loadProjects();
    })
    .catch(() => alert("Error adding project"));
}


// =====================
// LOAD PROJECTS
// =====================
function loadProjects() {
    fetch("/api/projects")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("projects-list");
            container.innerHTML = "";

            data.forEach(p => {
                const div = document.createElement("div");

                div.innerHTML = `
                    <p><strong>${p.name}</strong></p>
                    <button onclick="deleteProject('${p._id}')">Delete</button>
                    <hr>
                `;

                container.appendChild(div);
            });
        })
        .catch(() => alert("Error loading projects"));
}


// =====================
// DELETE PROJECT
// =====================
function deleteProject(id) {
    let token;
    try {
        token = getToken();
    } catch {
        return;
    }

    if (!confirm("Delete this project?")) return;

    fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: { "Authorization": token }
    })
    .then(res => res.json())
    .then(() => {
        alert("Deleted");
        loadProjects();
    })
    .catch(() => alert("Delete failed"));
}


// =====================
// ADD ACHIEVEMENT
// =====================
function addAchievement() {
    let token;
    try {
        token = getToken();
    } catch {
        return;
    }

    const title = document.getElementById("title").value;
    const org = document.getElementById("org").value;
    const desc = document.getElementById("descA").value;
    const image = document.getElementById("imageA").files[0];

    if (!title || !org || !desc || !image) {
        alert("All fields required");
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("organization", org);
    formData.append("description", desc);
    formData.append("image", image);

    fetch("/api/achievements", {
        method: "POST",
        headers: { "Authorization": token },
        body: formData
    })
    .then(res => res.json())
    .then(() => alert("Achievement added"))
    .catch(() => alert("Error adding achievement"));
}


// =====================
// ADD SKILL
// =====================
function addSkill() {
    let token;
    try {
        token = getToken();
    } catch {
        return;
    }

    const name = document.getElementById("skillName").value;
    const iconURL = document.getElementById("skillIcon").value;

    if (!name || !iconURL) {
        alert("All fields required");
        return;
    }

    fetch("/api/skills", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ name, iconURL })
    })
    .then(res => res.json())
    .then(() => alert("Skill added"))
    .catch(() => alert("Error adding skill"));
}


function checkAuthUI() {
    const token = localStorage.getItem("token");

    const adminSection = document.getElementById("admin-section");

    if (!token) {
        adminSection.style.display = "none";
    } else {
        adminSection.style.display = "block";
        loadProjects();
    }
}