import './style.css';

const D = document.querySelector.bind(document);
const buttonLogIn = D(".logIn");
const id = D(".id");
const pass = D(".pass");
const div = D(".maindiv");
const alertMsg= D(".alert")

const v_id = "211073"; 
const v_pass = "ektheke8";

buttonLogIn.addEventListener("click", (event) => {
  event.preventDefault();
  alertMsg.classList.remove("bg-yellow-400", "bg-green-400", "bg-red-400");

  if (!id.value || !pass.value) {
    alertMsg.classList.remove("bg-yellow-400", "bg-green-400", "bg-red-400");
    alertMsg.classList.remove("hidden")
        alertMsg.classList.add("bg-yellow-400")
        alertMsg.innerText="You must give both Id and Password";
        pass.value = "";
  } else {
    alertMsg.classList.remove("bg-yellow-400", "bg-green-400", "bg-red-400");
    if (id.value == v_id && pass.value == v_pass) {
        alertMsg.classList.remove("hidden")
        alertMsg.classList.add("bg-green-400")
        alertMsg.innerText="Succesful!";
      setTimeout(() => {
        window.location.href = 'mainpage.html';
        id.value = "";
        pass.value = "";
      },2000);
    } else {
      id.value = "";
        pass.value = "";
      alertMsg.classList.remove("bg-yellow-400", "bg-green-400", "bg-red-400");
      alertMsg.classList.remove("hidden")
      alertMsg.classList.add("bg-red-400")
      alertMsg.innerText="Wrong Id/Password";
    }
  }
});
