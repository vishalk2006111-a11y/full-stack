 const form = document.getElementById("form");

    // SEND DATA (POST)
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;

      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email })
      });

      alert("User Added");

      loadUsers(); // refresh list
    });


    // GET DATA (READ)
    async function loadUsers() {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();

      const list = document.getElementById("list");
      list.innerHTML = "";

      data.forEach(user => {
        const li = document.createElement("li");
        li.innerText = user.name + " - " + user.email;
        list.appendChild(li);
      });
    }

    // load users on page load
    loadUsers();