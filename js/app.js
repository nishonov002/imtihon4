let btn = document.querySelector(".btn");
let err = document.querySelector("#error");
let errW = document.querySelector("#error2");
let text = document.querySelector("#text");
let pass = document.querySelector("#password");
let inp = document.querySelector(".input");
let inp1 = document.querySelector(".input1");
let icon = document.querySelector("#err");
let icon1 = document.querySelector("#err1");

let form = document.querySelector(".login");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputval = text.value;
  const passval = pass.value;
  console.log(inputval);
  console.log(passval);
  if (inputval === "") {
    err.innerHTML = "Username error";
    inp.style.border = "2px solid red";
    icon.style.color = "red";
  }
  if (passval === "") {
    errW.innerHTML = "Password error";
    inp1.style.border = "2px solid red";
    icon1.style.color = "red";
  }
  fetch("https://reqres.in/api/login", {
    method: `POST`,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email: inputval,
      password: passval,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.replace("./home.html");
      } else {
        err.innerHTML = "Username error";
        inp.style.border = "2px solid red";
        icon.style.color = "red";
      }
    });


});

btn.addEventListener("click", function () {
  myText();
  youPass();
});

function myText() {
  con = text.value;
  if (con === "") {
    err.innerHTML = "Username error";
    inp.style.border = "2px solid red";
    icon.style.color = "red";
  }
  if (con.length > 0) {
    err.innerHTML = "";
    inp.style.border = "2px solid green";
    icon.style.color = "green";

  }
  console.log(con);
}
function youPass() {
  con = pass.value;
  if (con === "") {
    errW.innerHTML = "Password error";
    inp1.style.border = "2px solid red";
    icon1.style.color = "red";

  }
  if (con.length > 0) {
    errW.innerHTML = "";
    icon.style.color = "green";
    inp1.style.border = "2px solid green";
  }
  console.log(con);
}

