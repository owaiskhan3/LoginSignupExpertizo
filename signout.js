var loggedin = localStorage.getItem("loggedIn");
console.log("user Loggin=>", loggedin);
var container = document.getElementsByClassName("container");
var datas;
// var data = (async function data() {
//   try {
//     var res = await fetch("https://jsonplaceholder.typicode.com/posts");
//     data = await res.json();
//     return data;
//   } catch (e) {
//     console.log(e.message);
//   }
// })();

function onLoad() {
  console.log(loggedin);
  if (loggedin == false.toString()) {
    Swal.fire({
      type: "error",
      title: "Oops...",
      text: `LogIn First`,
      showConfirmButton: false,
      footer: "<a>Why do I have this issue?</a>"
    });
    setTimeout(() => {
      window.location.replace("./index.html");
    }, 2000);
  } else {
    var users = localStorage.getItem("users");
    var usersId = localStorage.getItem("userId");

    var data = fetch("https://jsonplaceholder.typicode.com/posts")
      .then(function(res) {
        return res.json();
      })
      .then(function(json) {
        console.log(json);

        return json;
      })
      .catch(function(e) {
        console.log(e.message);
      });
    var ans = new Promise(res => {
      setTimeout(() => {
        console.log(data);
        res(data);
      }, 1000);
    });

    datas = ans.then(values => {
      for (i = 0; i <= users["length"]; ) {
        console.log(values[i]);
        if (values[i].id !== parseInt(usersId)) {
          var component = `<div class="card mb-3" style="max-width: 540px;">
                      <div class="row no-gutters">
                      <div class="col-md-4">
                      <img src="./assets/images/man.png" class="card-img" alt="..." style="width:170px; margin:20px 20px 20px 20px;">
                      </div>
                      <div class="col-md-8">
                      <div class="card-body">
                      <h5 class="card-title">UserId:${values[i].userId}  ${
            values[i].title
          }</h5>
                      <p class="card-text">${values[i].body}</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                      </div>
                      </div>
                      </div>
                      </div>`;
          container[0].innerHTML += component;
          i += 7;
        } else {
          console.log("same");
          i++;
          continue;
        }
      }
      return values;
    });
  }
}
console.log(datas);
window.onload = onLoad;
function SignOut() {
  if (loggedin) {
    setTimeout(() => {
      localStorage.setItem("loggedIn", "false");
      loggedin = localStorage.getItem("loggedIn");
      console.log(loggedin);
      window.location.replace("./index.html");
    }, 2000);
    Swal.fire({
      type: "success",
      title: "LogOut Successfull",
      showConfirmButton: false
      // timer: 2000
    });
    return false;
  } else if (!loggedin) {
    //   if (loggedin != true) {
    console.log("signoutjs else");
    window.location.replace("./index.html");
  }
}
