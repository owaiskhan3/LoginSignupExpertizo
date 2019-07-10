// var data = localStorage.getItem("users");
var fname = document.getElementById("fName");
var lname = document.getElementById("lName");
var email = document.getElementById("exampleInputEmail1");
var password = document.getElementById("exampleInputPassword1");
var loggedin = localStorage.getItem("loggedIn");
var emailExist = false;
function onLoad() {
  console.log(loggedin);
  if (loggedin == true.toString()) {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: `Already Logged in Can't register.. 
      LogOut First`,
      showConfirmButton: false,
      footer: "<a>Why do I have this issue?</a>"
    });
    setTimeout(() => {
      window.location.replace("./screen.html");
    }, 2000);
  }
}
window.onload = onLoad;
function register() {
  if (
    fname.value != "" &&
    lname.value != "" &&
    email.value != "" &&
    password.value != ""
  ) {
    var users = localStorage.getItem("users") || "[]";
    for (i = 0; i < JSON.parse(users)["length"]; i++) {
      if (JSON.parse(users)[i].email == email.value) {
        emailExist = true;
        console.log(JSON.parse(users)[i].email);
        console.log(email.value);
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: `Email Already exists.. Can't register..
                  Try another Email`,
          // showConfirmButton: false,
          footer: "<a>Why do I have this issue?</a>"
        });
        setTimeout(() => {
          document.getElementById("exampleInputEmail1").value = "";
          document.getElementById("exampleInputPassword1").value = "";
        }, 1000);
        return false;
      }
    }

    // for (i = 0; i < JSON.parse(users)["length"]; i++) {
    //   if (JSON.parse(users)[i].email == email.value) {
    //     console.log(JSON.parse(users)[i].email);
    //     Swal.fire({
    //       type: "error",
    //       title: "Oops...",
    //       text: `Email Already exists.. Can't register..
    //       Try another Email`,
    //       showConfirmButton: false,
    //       footer: "<a>Why do I have this issue?</a>"
    //     });
    //     setTimeout(() => {
    //       email.innerHTML = "";
    //       password.innerHTML = "";
    //     }, 2000);

    //     break;
    //   }
    // }
    if (password.value.length > 7) {
      if (emailExist == false) {
        console.log("before json =>", users);
        users = JSON.parse(users);
        console.log("after json =>", users);

        console.log(users["length"]);
        if (users["length"] < 10) {
          var user = {
            id: users["length"] + 1,
            fname: fname.value,
            lname: lname.value,
            email: email.value,
            password: password.value
          };
          users.push(user);
          console.log(user);
          console.log(users);
          localStorage.setItem("users", JSON.stringify(users));
        } else {
          Swal.fire({
            type: "error",
            title: "Oops... Can't Register",
            text: `No more registrations left..!`
          });
          fname.value = "";
          lname.value = "";
          email.value = "";
          password.value = "";
          setTimeout(() => {
            window.location.assign("./index.html");
          }, 3000);
          return false;
        }

        fname.value = "";
        lname.value = "";
        email.value = "";
        password.value = "";

        Swal.fire({
          type: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
          window.location.assign("./index.html");
        }, 2000);
        return false;
      } else {
        window.location.reload();
      }
    } else {
      Swal.fire({
        type: "error",
        title: "Oops... Insecure Password.!",
        text: `Password should be atleast 8 digits long`
      });
      return false;
    }
  } else {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: `Something went wrong! Please Enter all Fields`,
      footer: "<a>Why do I have this issue?</a>"
    });
    return false;
  }
}
