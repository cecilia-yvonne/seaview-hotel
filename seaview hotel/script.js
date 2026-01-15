function bookRoom(room, price, inId, outId) {
  const checkIn = document.getElementById(inId).value;
  const checkOut = document.getElementById(outId).value;

  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);
  const nights = (outDate - inDate) / (1000 * 60 * 60 * 24);

  const total = nights * price;

  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  bookings.push({
    room,
    checkIn,
    checkOut,
    nights,
    total
  });

  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("Room booked successfully!");
}


function signup() {
  const username = document.getElementById("signupUsername").value;
  const password = document.getElementById("signupPassword").value;

  if (!username || !password) {
    alert("Please fill all fields");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ username, password }));
  alert("Signup successful! Please login.");
  window.location.href = "login.html";
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.username !== username || user.password !== password) {
    alert("Invalid login details");
    return;
  }

  localStorage.setItem("loggedIn", "true");
  alert("Login successful");
  window.location.href = "index.html";
}
/* ADMIN LOGIN */
function adminLogin() {
  const user = document.getElementById("adminUser").value;
  const pass = document.getElementById("adminPass").value;

  if (user === "admin" && pass === "admin123") {
    alert("Admin login successful");
    window.location.href = "report.html";
  } else {
    alert("Invalid admin credentials");
  }
}

/* FOOD ORDERING */
function orderFood(foodName, price) {
  let orders = JSON.parse(localStorage.getItem("foodOrders")) || [];

  orders.push({
    food: foodName,
    price: price,
    date: new Date().toLocaleString()
  });

  localStorage.setItem("foodOrders", JSON.stringify(orders));
  alert(foodName + " ordered successfully!");
}

/* LOAD FOOD REPORTS */
function loadFoodReports() {
  const list = document.getElementById("foodReports");
  const orders = JSON.parse(localStorage.getItem("foodOrders")) || [];

  list.innerHTML = "";

  orders.forEach((order, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${order.food}</strong> - $${order.price}
      <br>Date: ${order.date}
    `;
    list.appendChild(li);
  });
}
/* LOAD & CANCEL BOOKINGS */
function loadBookings() {
  const list = document.getElementById("bookingList");
  let bookings = JSON.parse(localStorage.getItem("roomBookings")) || [];

  list.innerHTML = "";

  bookings.forEach((b, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${b.room}</strong><br>
      Check-in: ${b.checkIn}<br>
      Check-out: ${b.checkOut}<br>
      Price per night: $${b.price}<br>
      <button onclick="cancelBooking(${index})">Cancel Booking</button>
    `;
    list.appendChild(li);
  });
}

function cancelBooking(index) {
  let bookings = JSON.parse(localStorage.getItem("roomBookings")) || [];
  bookings.splice(index, 1);
  localStorage.setItem("roomBookings", JSON.stringify(bookings));
  loadBookings();
}
function loadRoomReports() {
  const list = document.getElementById("roomReports");
  const bookings = JSON.parse(localStorage.getItem("roomBookings")) || [];

  list.innerHTML = "";

  bookings.forEach(b => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${b.room}</strong><br>
      ${b.checkIn} to ${b.checkOut}<br>
      Booked on: ${b.dateBooked}
    `;
    list.appendChild(li);
  });
}
document.addEventListener("DOMContentLoaded", function () {

  /* ======================
     ROOM BOOKINGS REPORT
  ======================= */
  const bookingReport = document.getElementById("bookingReport");
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  if (bookingReport) {
    if (bookings.length === 0) {
      bookingReport.innerHTML =
        `<tr><td colspan="5" style="text-align:center;">No room bookings found</td></tr>`;
    } else {
      bookings.forEach(b => {
        bookingReport.innerHTML += `
          <tr>
            <td>${b.room}</td>
            <td>${b.checkIn}</td>
            <td>${b.checkOut}</td>
            <td>${b.nights}</td>
            <td>${b.total}</td>
          </tr>
        `;
      });
    }
  }

  /* ======================
     FOOD ORDERS REPORT
  ======================= */
  const foodReport = document.getElementById("foodReport");
  const foods = JSON.parse(localStorage.getItem("foods")) || [];

  if (foodReport) {
    if (foods.length === 0) {
      foodReport.innerHTML =
        `<tr><td colspan="4" style="text-align:center;">No food orders found</td></tr>`;
    } else {
      foods.forEach(f => {
        foodReport.innerHTML += `
          <tr>
            <td>${f.name}</td>
            <td>${f.qty}</td>
            <td>${f.price}</td>
            <td>${f.total}</td>
          </tr>
        `;
      });
    }
  }

});
function orderFood(name, price) {
  const qty = 1;
  const total = qty * price;

  const foods = JSON.parse(localStorage.getItem("foods")) || [];

  foods.push({
    name,
    qty,
    price,
    total
  });

  localStorage.setItem("foods", JSON.stringify(foods));

  alert("Food ordered successfully!");
}
