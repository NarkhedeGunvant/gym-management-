// Mock Database
let users = [
    { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { id: 2, email: 'member@example.com', password: 'member123', role: 'member' },
    { id: 3, email: 'user@example.com', password: 'user123', role: 'user' },
];

let members = [];
let bills = [];
let notifications = [];
let reports = [];

// Handle Login
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        redirectToDashboard(user.role);
    } else {
        document.getElementById('error-message').textContent = 'Invalid email or password';
    }
});

// Redirect to Dashboard based on Role
function redirectToDashboard(role) {
    if (role === 'admin') {
        window.location.href = 'admin.html';
    } else if (role === 'member') {
        window.location.href = 'member.html';
    } else {
        window.location.href = 'user.html';
    }
}

// Logout
document.getElementById('logout').addEventListener('click', function () {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
});

// Admin Functions
function addMember() {
    const name = prompt("Enter member's name:");
    const email = prompt("Enter member's email:");
    const member = { id: members.length + 1, name, email };
    members.push(member);
    alert('Member added successfully!');
}

function viewMembers() {
    let memberList = members.map(m => `ID: ${m.id}, Name: ${m.name}, Email: ${m.email}`).join('\n');
    alert(`Members:\n${memberList}`);
}

function createBill() {
    const memberId = prompt("Enter member ID:");
    const amount = prompt("Enter bill amount:");
    const bill = { id: bills.length + 1, memberId, amount, date: new Date() };
    bills.push(bill);
    alert('Bill created successfully!');
}

function assignPackage() {
    const memberId = prompt("Enter member ID:");
    const package = prompt("Enter fee package:");
    const member = members.find(m => m.id == memberId);
    if (member) {
        member.package = package;
        alert('Package assigned successfully!');
    } else {
        alert('Member not found!');
    }
}

function sendNotification() {
    const message = prompt("Enter notification message:");
    notifications.push({ id: notifications.length + 1, message, date: new Date() });
    alert('Notification sent successfully!');
}

function exportReport() {
    const report = `Report ID: ${reports.length + 1}, Date: ${new Date()}`;
    reports.push(report);
    alert(`Report exported:\n${report}`);
}

function supplementStore() {
    alert('Supplement store functionality not implemented.');
}

function dietDetails() {
    alert('Diet details functionality not implemented.');
}

// Member Functions
function viewBillReceipts() {
    const member = JSON.parse(localStorage.getItem('loggedInUser'));
    let billList = bills.filter(b => b.memberId == member.id).map(b => `Bill ID: ${b.id}, Amount: ${b.amount}, Date: ${b.date}`).join('\n');
    alert(`Bills:\n${billList}`);
}

function viewNotifications() {
    let notificationList = notifications.map(n => `Notification: ${n.message}, Date: ${n.date}`).join('\n');
    alert(`Notifications:\n${notificationList}`);
}

// User Functions
function viewDetails() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    alert(`User Details:\nID: ${user.id}\nEmail: ${user.email}`);
}
