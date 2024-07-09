import './style.css';

const D = document.querySelector.bind(document);

const baseUrl = "https://todo-crudl.deno.dev";
const addInput = D(".addInput");
const addbtn = D(".addButton");
const todoCard = D(".todoCard");
const progress = D(".progressList");
const completed = D(".completedList");
const todoBody = D(".todoBody")
const mainBody = D(".mainBody")
const userId = "borhanthais";

function initialize(){
    getData();
}


async function deleteTodo(event){
    event.preventDefault();
    const btn= event.target;
    const btnDiv = btn.closest(".elementDiv")
    //const btnDiv2 =btn.querySelector(".elementDiv")
    //console.log(btnDiv)
    //const btnTitle = btnDiv.closest(".taskTitle").textContent
    const btnTitle=btnDiv.querySelector(".taskTitle").textContent
    //console.log(btnTitle)
    const url = await fetch(`${baseUrl}/${userId}/todos`)
    const data = await url.json();
    for (let i = data.length - 1; i >= 0; i--){
        if(data[i].title==btnTitle){
            //console.log(data[i].id)
            const updateUrl =`${baseUrl}/${userId}/todos/${data[i].id}`
            const response = await fetch(updateUrl, {
                method: "DELETE",
            });
        }
    }
    initialize();
}





async function updateProgress(event){
    const checkBox = event.target;
    const taskDiv = checkBox.parentElement;
    const taskTitle = taskDiv.querySelector('.taskTitle').textContent;
    const url = await fetch(`${baseUrl}/${userId}/todos`)
    const data = await url.json();
    for (let i = data.length - 1; i >= 0; i--){
        if(data[i].title==taskTitle){
            if(data[i].status==`Pending`){
            //console.log(data[i].title,"title",data[i].status)
            const updateUrl =`${baseUrl}/${userId}/todos/${data[i].id}`
             const response = await fetch(updateUrl, {
                method: "PUT",
                body: JSON.stringify({
                    status: "inprogress"
                }),
            });
            }
            if(data[i].status==`inprogress`){
               // console.log(data[i].title,"title",data[i].status)
            const updateUrl =`${baseUrl}/${userId}/todos/${data[i].id}`
            const response = await fetch(updateUrl, {
                method: "PUT",
                body: JSON.stringify({
                    status: "completed"
                }),
            });
            }
            
        }
    }
    initialize();
}





async function getData() {
    mainBody.innerText = ""
    progress.innerText="";
    completed.innerText="";
    const url = await fetch(`${baseUrl}/${userId}/todos`)
    const data = await url.json();
    
    for (let i = data.length - 1; i >= 0; i--) {
        const msg = document.createElement("div");
            msg.classList.add("elementDiv","flex" ,"items-center", "w-full", "font-medium", "mb-4")
            msg.innerHTML = `
            <input type="checkbox" class="checkbox mr-2"> <span class="taskTitle">${data[i].title}</span> <button type="button" class="crossButton yoyo bg-white ml-auto rounded-md p-2   text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span class="sr-only"></span>
                  <!-- Heroicon name: outline/x -->
                  <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>`
        if(data[i].status==`Pending`){
            //console.log(data[i].title,"title",data[i].status)
            mainBody.append(msg)
        }
        else if(data[i].status==`inprogress`){  
            //console.log(data[i].title,"title",data[i].status)
            progress.append(msg)
        }
         else if(data[i].status==`completed`){ 
            //console.log(data[i].title,"title",data[i].status)
            completed.append(msg)
        }     
       
    }

    const checkbox=document.querySelectorAll(".checkbox")
    checkbox.forEach(element => {
        element.addEventListener("click",updateProgress)
    });  

    const crossButton =document.querySelectorAll(".crossButton")
    crossButton.forEach(element => {
        element.addEventListener("click",deleteTodo)
    });


}





addbtn.addEventListener("click", async (event) => {
    const title = addInput.value;
    event.preventDefault();
    if (!title) {
        addInput.classList.remove("bg-gray-100")
        addInput.classList.add("bg-red-400", "placeholder-black")
        addInput.placeholder = "You must Give a Task"
    }
    if(title){
        addInput.classList.remove("bg-red-400", "placeholder-black")
        addInput.classList.add("bg-gray-100")
        addInput.placeholder = "Add a new task in todo"
        const url = `${baseUrl}/${userId}/todos`
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                title: title,
                status: "Pending"
            }),
        });
        const data = await response.json();
        initialize()
        addInput.value = "";  
    }   

});


addInput.addEventListener("focus", () => {
    addInput.classList.remove("bg-red-400", "placeholder-black");
    addInput.classList.add("bg-gray-100");
    addInput.placeholder = "Add a new task in todo";
});


const checkBox=document.querySelectorAll(".checkbox")
    checkBox.forEach(element => {
        element.addEventListener("click",updateCompleted)
    });

document.addEventListener('DOMContentLoaded', () => {
    initialize();

});