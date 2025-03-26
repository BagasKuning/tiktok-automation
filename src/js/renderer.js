document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const manyScroll = document.getElementById('manyScroll').value;
    const manyLike = document.getElementById('manyLike').value;

  // send data to main file
  window.myApi.send("start-automation", { email, password, manyScroll, manyLike });
});


