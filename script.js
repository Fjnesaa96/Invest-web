// Simulasi database pakai LocalStorage
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

// Register
function registerUser(event) {
  event.preventDefault();
  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const referral = document.getElementById("referral").value;

  let users = JSON.parse(localStorage.getItem("users"));

  if (users.find(u => u.email === email)) {
    alert("Email sudah terdaftar!");
    return;
  }

  const newUser = {
    fullname,
    email,
    password,
    referral,
    balance: 0,
    history: []
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registrasi berhasil, silakan login!");
  window.location.href = "index.html";
}

// Login
function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users"));
  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Login gagal, periksa email/password!");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "dashboard.html";
}

// Logout
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Cek Login di Dashboard
if (window.location.pathname.includes("dashboard.html")) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    alert("Belum login, silakan login dulu!");
    window.location.href = "index.html";
  } else {
    document.getElementById("welcomeName").innerText = currentUser.fullname;
    document.getElementById("userBalance").innerText = "Rp " + currentUser.balance;
  }
}

// Deposit
function deposit(event) {
  event.preventDefault();
  const amount = parseInt(document.getElementById("depositAmount").value);

  let users = JSON.parse(localStorage.getItem("users"));
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  let user = users.find(u => u.email === currentUser.email);
  user.balance += amount;
  user.history.push("Deposit Rp " + amount);

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(user));

  alert("Deposit berhasil!");
  window.location.href = "dashboard.html";
}

// Withdraw
function withdraw(event) {
  event.preventDefault();
  const amount = parseInt(document.getElementById("withdrawAmount").value);

  let users = JSON.parse(localStorage.getItem("users"));
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let user = users.find(u => u.email === currentUser.email);

  if (user.balance < amount) {
    alert("Saldo tidak cukup!");
    return;
  }

  user.balance -= amount;
  user.history.push("Withdraw Rp " + amount);

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(user));

  alert("Withdraw berhasil!");
  window.location.href = "dashboard.html";
    }
