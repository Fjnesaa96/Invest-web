/* ===========================
   INDO CAPITAL - MAIN SCRIPT
   =========================== */

// 🔹 Cek parameter referal dari URL (jika user daftar dari link teman)
const urlParams = new URLSearchParams(window.location.search);
const refParam = urlParams.get('ref');
if (refParam) {
  localStorage.setItem('pendingRef', refParam);
}

// ===========================
// 🔹 REGISTER FUNCTION
// ===========================
function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!username || !email || !password) {
    alert('Lengkapi semua kolom!');
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = users.find(u => u.email === email);

  if (userExists) {
    alert('Email sudah terdaftar!');
    return;
  }

  // 🔹 Cek apakah ada referal aktif
  const pendingRef = localStorage.getItem('pendingRef');
  const newUser = {
    username,
    email,
    password,
    balance: 0,
    history: [],
    refCode: "IC" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    refBonus: 0,
    refCount: 0,
    referredBy: pendingRef || null
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.removeItem('pendingRef');
  localStorage.setItem('currentUser', JSON.stringify(newUser));

  // 🔹 Beri bonus ke user yang mereferensikan
  if (pendingRef) {
    const refUser = users.find(u => u.refCode === pendingRef);
    if (refUser) {
      refUser.refBonus = (refUser.refBonus || 0) + 10000; // Bonus Rp10.000
      refUser.refCount = (refUser.refCount || 0) + 1;
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  alert('Akun berhasil dibuat!');
  window.location.href = 'dashboard.html';
}

// ===========================
// 🔹 LOGIN FUNCTION
// ===========================
function loginUser(event) {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = 'dashboard.html';
  } else {
    alert('Email atau password salah!');
  }
}

// ===========================
// 🔹 LOGOUT FUNCTION
// ===========================
function logoutUser() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// ===========================
// 🔹 SALDO & TRANSAKSI
// ===========================
function addTransaction(type, amount, note) {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) return;

  const transaction = {
    date: new Date().toLocaleString(),
    type,
    amount,
    note
  };

  user.history.push(transaction);
  if (type === 'deposit') user.balance += amount;
  if (type === 'withdraw') user.balance -= amount;

  localStorage.setItem('currentUser', JSON.stringify(user));

  const allUsers = JSON.parse(localStorage.getItem('users')) || [];
  const idx = allUsers.findIndex(u => u.email === user.email);
  if (idx !== -1) {
    allUsers[idx] = user;
    localStorage.setItem('users', JSON.stringify(allUsers));
  }

  alert('Transaksi berhasil!');
  window.location.reload();
}

// ===========================
// 🔹 LOAD DATA DI DASHBOARD
// ===========================
function loadDashboard() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) {
    window.location.href = 'index.html';
    return;
  }

  document.getElementById('userName').textContent = user.username;
  document.getElementById('userBalance').textContent = 
    'Rp' + user.balance.toLocaleString();
}

// ===========================
// 🔹 HISTORY TABLE
// ===========================
function loadHistory() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) return;

  const historyList = document.getElementById('historyList');
  if (!historyList) return;

  historyList.innerHTML = '';
  user.history.forEach(tx => {
    const li = document.createElement('li');
    li.textContent = `${tx.date} - ${tx.type.toUpperCase()} Rp${tx.amount.toLocaleString()} (${tx.note})`;
    historyList.appendChild(li);
  });
}

// ===========================
// 🔹 UTILITIES
// ===========================
function formatRupiah(amount) {
  return 'Rp' + amount.toLocaleString('id-ID');
}
