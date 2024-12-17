// Simulate admin login and project management
let users = [];
let admin = { username: 'admin', password: 'admin123' }; // Hardcoded admin credentials
let auctionProjects = [];  // To store auction projects

// Handle user registration
document.getElementById('register')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    users.push({ username, password, email });
    alert('Registration successful!');
    window.location.href = 'login.html';
});

// Handle user login
document.getElementById('login')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert('Login successful!');
        window.location.href = 'index.html';
    } else {
        alert('Invalid credentials!');
    }
});

// Handle admin login
document.getElementById('admin-login')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    if (username === admin.username && password === admin.password) {
        alert('Admin login successful!');
        window.location.href = 'admin-panel.html';
    } else {
        alert('Invalid admin credentials!');
    }
});

// Handle project creation in admin panel
document.getElementById('add-project-form')?.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const projectName = document.getElementById('project-name').value;
    const projectDescription = document.getElementById('project-description').value;
    const projectDeadline = document.getElementById('project-deadline').value;
    
    // Create a new project with the deadline calculated
    const deadlineTime = new Date().getTime() + (projectDeadline * 24 * 60 * 60 * 1000);  // Convert days to milliseconds

    const project = {
        name: projectName,
        description: projectDescription,
        deadline: deadlineTime,
        products: []  // Initially, no products
    };
    
    auctionProjects.push(project);
    alert('Project added successfully!');
    updateProjectList();
});

// Update project list in the admin panel
function updateProjectList() {
    const projectListDiv = document.getElementById('project-list');
    projectListDiv.innerHTML = '';  // Clear current list
    
    auctionProjects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-item');
        projectDiv.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <p>Deadline: ${new Date(project.deadline).toLocaleString()}</p>
            <button onclick="viewProjectDetails(${index})">View Project Details</button>
            <button onclick="deleteProject(${index})">Delete Project</button>
        `;
        projectListDiv.appendChild(projectDiv);
    });
}

// View project details (for users)
function viewProjectDetails(projectIndex) {
    const project = auctionProjects[projectIndex];
    alert(`Project Name: ${project.name}\nDescription: ${project.description}\nDeadline: ${new Date(project.deadline).toLocaleString()}`);
    // You can add a new page or redirect users to a detailed page
}

// Delete a project from the admin panel
function deleteProject(projectIndex) {
    auctionProjects.splice(projectIndex, 1);
    updateProjectList();
}

// Display active projects to users
function displayActiveProjects() {
    const projectsListDiv = document.getElementById('projects-list');
    projectsListDiv.innerHTML = '';  // Clear the existing list

    auctionProjects.forEach((project, index) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project-item');
        projectDiv.innerHTML = `
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <p>Deadline: ${new Date(project.deadline).toLocaleString()}</p>
            <button onclick="viewProjectDetails(${index})">View Details</button>
        `;
        projectsListDiv.appendChild(projectDiv);
    });
}

// Call this function when the page loads to display active projects
displayActiveProjects();

// Set up timers for each auction item
let timers = [
    { id: 1, timeLeft: 60 },
    { id: 2, timeLeft: 60 },
    { id: 3, timeLeft: 60 }
];

function startTimers() {
    timers.forEach(timer => {
        const timerElement = document.getElementById(`timer${timer.id}`);
        const interval = setInterval(() => {
            if (timer.timeLeft > 0) {
                timer.timeLeft--;
                const minutes = Math.floor(timer.timeLeft / 60);
                const seconds = timer.timeLeft % 60;
                timerElement.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            } else {
                clearInterval(interval);
                document.getElementById(`bidInput${timer.id}`).disabled = true;
                document.getElementById(`buttonBid${timer.id}`).disabled = true;
                alert(`Bidding for item ${timer.id} has ended!`);
            }
        }, 1000);
    });
}

function placeBid(itemId, currentBid) {
    const bidInput = document.getElementById(`bidInput${itemId}`);
    const newBid = parseFloat(bidInput.value);

    if (newBid > currentBid) {
        document.getElementById(`bid${itemId}`).innerText = newBid;
        alert('Bid placed successfully!');
    } else {
        alert('Bid must be higher than the current bid.');
    }
}

// Start the timers when the page loads
window.onload = startTimers;

