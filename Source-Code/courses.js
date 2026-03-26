let maxCredits = 20;

let courses = [
    {id: 1, name: "Linear Algebra", credit: 3},
    {id: 2, name: "Engineering Physics", credit: 3},
    {id: 3, name: "C Programming", credit: 3},
    {id: 4, name: "Data Structures", credit: 4},
    {id: 5, name: "Digital Logic", credit: 4},
    {id: 6, name: "Discrete Mathematics", credit: 4},
    {id: 7, name: "Computer Organization", credit: 3},
    {id: 8, name: "Operating Systems", credit: 3},
    {id: 9, name: "Database Management Systems", credit: 3},
    {id: 10, name: "Software Engineering", credit: 3}
];

let registered = JSON.parse(localStorage.getItem("registered")) || [];

function getTotalCredits() {
    let total = 0;
    registered.forEach(c => {
        total += c.credit;
    });
    return total;
}

function displayCourses() {
    let list = document.getElementById("courseList");
    list.innerHTML = "";

    courses.forEach(course => {
        let li = document.createElement("li");
        li.innerHTML = `${course.name} (${course.credit} credits)
        <button onclick="register(${course.id})">Register</button>`;
        list.appendChild(li);
    });
}

function displayRegistered() {
    let list = document.getElementById("registeredList");
    list.innerHTML = "";

    registered.forEach(course => {
        let li = document.createElement("li");
        li.innerHTML = `${course.name} (${course.credit} credits)
        <button onclick="drop(${course.id})">Drop</button>`;
        list.appendChild(li);
    });

    document.getElementById("credits").innerText = getTotalCredits();
    document.getElementById("maxCredits").innerText = maxCredits;
}

function register(id) {
    let course = courses.find(c => c.id === id);

    // ✅ CREDIT CHECK
    if(getTotalCredits() + course.credit > maxCredits) {
        alert("Credit limit exceeded!");
        return;
    }

    // ✅ DUPLICATE CHECK
    if(registered.some(c => c.id === id)) {
        alert("Already Registered");
        return;
    }

    registered.push(course);
    localStorage.setItem("registered", JSON.stringify(registered));

    alert("Course Registered");
    displayRegistered();
}

function drop(id) {
    registered = registered.filter(c => c.id !== id);
    localStorage.setItem("registered", JSON.stringify(registered));

    alert("Course Dropped");
    displayRegistered();
}

function logout() {
    window.location.href = "index.html";
}

displayCourses();
displayRegistered();