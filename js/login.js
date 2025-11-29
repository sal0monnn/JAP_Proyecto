document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("usuario")) {
    window.location.replace("/index.html");
  }
});

document.getElementById("loginButton").addEventListener("click", async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username.length === 0 || password.length === 0) {
    alert("Debe completar ambos campos.");
    return;
  }

  try {
    const resp = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!resp.ok) {
      alert("Usuario o contraseña incorrectos.");
      return;
    }

    const data = await resp.json();

    localStorage.setItem("usuario", username);
    localStorage.setItem("token", data.token);

    window.location.replace("/index.html");

  } catch (error) {
    alert("Error de conexión con el servidor.");
  }
});
