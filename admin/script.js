// ---- Admin Login ----
function loginAdmin(event) {
  event.preventDefault();
  const user = document.getElementById("adminUser").value;
  const pass = document.getElementById("adminPass").value;

  // akun admin default
  if (user === "admin" && pass === "admin123") {
    localStorage.setItem("isAdmin", "true");
    window.location.href = "admin-dashboard.html";
  } else {
    alert("Username/Password admin salah!");
  }
}

// ---- Admin Logout ----
function logoutAdmin() {
  localStorage.removeItem("isAdmin");
  window.location.href = "admin.html";
}

// ---- Load User di Panel Admin ----
if (window.location.pathname.includes("admin-dashboard.html")) {
  if (localStorage.getItem("isAdmin") !== "true") {
    alert("Harus login sebagai admin!");
    window.location.href = "admin.html";
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const table = document.getElementById("userTable");

  users.forEach((u, index) => {
    let row = `
      <tr>
        <td>${u.fullname}</td>
        <td>${u.email}</td>
        <td>Rp ${u.balance}</td>
        <td>${u.referral || "-"}</td>
        <td>
          <button onclick="topUpUser(${index})">+Saldo</button>
          <button onclick="resetSaldo(${index})">Reset</button>
        </td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

// ---- Fungsi Admin Aksi ----
function topUpUser(index) {
  let amount = prompt("Masukkan jumlah top up:");
  if (!amount || isNaN(amount)) return;

  let users = JSON.parse(localStorage.getItem("users"));
  users[index].balance += parseInt(amount);
  users[index].history.push("TopUp Admin Rp " + amount);

  localStorage.setItem("users", JSON.stringify(users));
  alert("Top up berhasil!");
  location.reload();
}

function resetSaldo(index) {
  if (!confirm("Yakin reset saldo user ini?")) return;

  let users = JSON.parse(localStorage.getItem("users"));
  users[index].balance = 0;
  users[index].history.push("Saldo direset Admin");

  localStorage.setItem("users", JSON.stringify(users));
  alert("Saldo berhasil direset!");
  location.reload();
                 }
