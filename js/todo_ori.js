let todoNum = 0;
let todoText = "";
let doneYn = "";

// 저장된 투두 가져와서 정렬
const reloadTodo = () => {
  let ul = document.querySelector(".content-ul");
  let keys = Object.keys(localStorage);
  keys.sort((a,b) => a - b);

  keys.forEach(key => {
    if(!localStorage.hasOwnProperty(key)){
      return;
    }
    let item = localStorage.getItem(key);
    let todoData = JSON.parse(item);

    todoNum = todoData['todoNum'];
    todoText = todoData['todoText'];
    doneYn = todoData['doneYn'];
    let li = document.createElement("li");
    let div = document.createElement("div");
    let span = document.createElement("span")
    let input = document.createElement("input");
    let button = document.createElement("button");
  
    div.classList.add("todo");
    if(doneYn == "Y"){
      div.classList.add("done");
    }
    span.textContent = todoText;
    input.type = "checkbox";
    input.name = "todo";
    todoNum = todoNum * 1;
    
    input.id = "todo-" + todoNum
    input.classList.add("chk");
    button.textContent = "X";
    button.classList.add("deleteBtn");
    
    // 조합
    div.appendChild(span);
    div.appendChild(input);
    div.appendChild(button);
    li.appendChild(div);
    
    // 뷰 변경
    let doneDiv = document.querySelector(".done");
    if(doneDiv == null){
      ul.appendChild(li);
    } else {
      ul.insertBefore(li, doneDiv.parentNode);
    }
    
    // 투두 완료 이벤트 리스너 추가
    input.addEventListener("click", () => {
      let checked = div.classList.contains("done");

      if(checked){
        div.classList.remove("done");
        todoData.doneYn = "N";
        localStorage.setItem(key, JSON.stringify(todoData));
        ul.removeChild(div.parentNode);
        ul.insertBefore(div.parentNode, ul.firstChild);
      } else {
        div.classList.add("done");
        ul.removeChild(li);
        ul.appendChild(li);
        todoData.doneYn = "Y";
        localStorage.setItem(key, JSON.stringify(todoData));
      }
    })

    // 투두 삭제 이벤트 리스너 추가
    button.addEventListener("click", () => {
      if(confirm("할 일을 삭제하시겠습니까?")){
      ul.removeChild(li);
      localStorage.removeItem(key);
      }
    })
  })
}

document.addEventListener("DOMContentLoaded", reloadTodo);

// 투두 추가하기
const addBtn = document.querySelector("#addBtn");
addBtn.addEventListener("click", () => {
  let todoTextarea = document.querySelector("#todoText")
  let todoText = todoTextarea.value
  if(todoText == "" || todoText.trim().length == 0){
    alert("내용을 입력해주세요!");
    return
  }
  
  // 엘리먼트 생성 및 수정
  let li = document.createElement("li");
  const div = document.createElement("div");
  const span = document.createElement("span")
  const input = document.createElement("input");
  const button = document.createElement("button");
  
  div.classList.add("todo");
  span.textContent = todoText;
  input.type = "checkbox";
  input.name = "todo";
  todoNum = todoNum * 1;
  todoNum++;

  input.id = "todo-" + todoNum
  input.classList.add("chk");
  button.textContent = "X";
  button.classList.add("deleteBtn");
  
  // 조합
  div.appendChild(span);
  div.appendChild(input);
  div.appendChild(button);
  li.appendChild(div);
  
  // 뷰 변경
  let ul = document.querySelector(".content-ul");
  let doneDiv = document.querySelector(".done");
  if(doneDiv == null){
    ul.appendChild(li);
  } else {
    ul.insertBefore(li, doneDiv.parentNode);
  }
  todoTextarea.value = '';
  
  // 투두완료 이벤트 리스너 추가
  input.addEventListener("click", () => {
    let todoDiv = input.parentNode;
    let checked = todoDiv.classList.contains("done");

    if(checked){
      todoDiv.classList.remove("done");
      const todoData = {
        todoNum: Number(todoNum),
        todoText: todoText,
        doneYn: "N"
      }
      localStorage.setItem(Number(todoNum), JSON.stringify(todoData));
      ul.removeChild(todoDiv.parentNode);
      ul.insertBefore(todoDiv.parentNode, ul.firstChild);
    } else {
      todoDiv.classList.add("done");
      const todoData = {
        todoNum: Number(todoNum),
        todoText: todoText,
        doneYn: "Y"
      }
      localStorage.setItem(Number(todoNum), JSON.stringify(todoData));
      ul.removeChild(li);
      ul.appendChild(li);
    }
  })

  button.addEventListener("click", () => {
    if(confirm("할 일을 삭제하시겠습니까?")){
    ul.removeChild(li);
    let targetFullId = input.id;
    targetId = targetFullId.split("-")[1];
    localStorage.removeItem(targetId);
    }
  })

  // 스크롤 이동
  const contentDiv = document.querySelector(".content");
  contentDiv.scrollTo({top: contentDiv.scrollHeight, behavior: "smooth"});

  // 로컬스토리지에 투두 추가
  const todoData = {
    todoNum: Number(todoNum),
    todoText: todoText,
    doneYn: "N"
  }
  localStorage.setItem(Number(todoNum), JSON.stringify(todoData));
})
