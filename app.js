var users = localStorage.getItem("users");
var email = document.getElementById("exampleInputEmail1");
var password = document.getElementById("exampleInputPassword1");
var foundUser;
var loggedIn = localStorage.getItem("loggedIn");
console.log("userLOGIN:", loggedIn);

function onLoad() {
  console.log(loggedIn);
  if (loggedIn == true.toString()) {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: `Already LoggedIn`,
      showConfirmButton: false,
      footer: "<a>Why do I have this issue?</a>"
    });
    setTimeout(() => {
      window.location.replace("./screen.html");
    }, 2000);
  }
}
window.onload = onLoad;

if (loggedIn) {
  //   console.log(JSON.parse(data));

  var data = JSON.parse(users);

  if (data === null) {
    setTimeout(() => {
      window.location.replace("register.html");
      console.log("data is null");
    }, 2000);
    Swal.fire({
      type: "Register",
      title: "Oops...",
      text: "Please Register First",
      showConfirmButton: false
    });
    console.log(data);
  } else {
    function login() {
      // console.log(data);
      for (i = 0; i < data.length; i++) {
        if (
          email.value == data[i].email &&
          password.value == data[i].password
        ) {
          foundUser = data[i];
          console.log(data[i].email);
          break;
        }
      }

      password = password.value;
      if (foundUser && password == foundUser.password) {
        setTimeout(() => {
          console.log(password);
          // foundUser.loggedIn = true;
          console.log(foundUser);
          window.location.replace("./screen.html");
        }, 2000);
        Swal.fire({
          type: "success",
          title: "Login Successfull",
          showConfirmButton: false
          // timer: 2000
        });

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userId", foundUser.id);
      } else {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Incorrect Credentials..!",
          // showConfirmButton: true,
          footer: "<a href>Why do I have this issue?</a>"
        });

        document.getElementById("loginForm").reset();
        // setTimeout(() => {}, 5000);
      }
      return false;
    }
  }
}
