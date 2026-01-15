<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>User Signup</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<?php
include "config.php";

if (isset($_POST['signup'])) {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $sql = "INSERT INTO users (fullname, email, password)
          VALUES ('$name','$email','$password')";
  $conn->query($sql);

  echo "<script>alert('Signup successful');</script>";
}
?>

<header>
  <h1>SEAVIEW HOTEL</h1>
  <nav>
    <a href="index.html">Home</a>
    <a href="login.html">Login</a>
  </nav>
</header>

<form method="POST">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <input type="password" name="password" required>
  <button name="signup">Signup</button>
</form>

<div class="card" style="max-width:500px;margin:auto; height: 400px;">
    
  <h2>User Signup</h2>

  <label>Username</label>
  <input type="text" id="signupUsername" placeholder="Enter username" required>

  <label>Password</label>
  <input type="password" id="signupPassword" placeholder="Enter password" required>

  <button onclick="signup()">Create Account</button>

  <p style="margin-top:10px;">
    Already have an account?
    <a href="login.html">Login</a>
  </p>
</div>

<script src="script.js"></script>
</body>
</html>
