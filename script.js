// Simpan user baru
document.getElementById("registerForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const referral = document.getElementById("referral").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Cek email sudah dipakai atau belum
  if (users.find(u => u.email === email)) {
    alert("Email sudah terdaftar!");
    return;
  }

  users.push({ fullname, email, password, referral, balance: 0 });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registrasi berhasil! Silakan login.");
  window.location.href = "index.html";
});

// Login user
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    alert("Email atau password salah!");
  }
});
