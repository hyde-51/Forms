document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", (e) => {
    const email = form.querySelector("input[name='email']").value.trim();
    const password = form.querySelector("input[name='password']").value.trim();
    const confirmPassword = form
      .querySelector("input[name='confirmPassword']")
      .value.trim();

    if (!email || !password || !confirmPassword) {
      e.preventDefault();
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      e.preventDefault();
      alert("❌ Passwords do not match!");
    }

    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(email)) {
      e.preventDefault();
      alert("❌ Please enter a valid email like abc@gmail.com.");
      return;
    }
  });
});
