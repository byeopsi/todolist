let todoNum = 0;
let todoText = "";
let doneYn = "";

const createTodoListItem = (todoData, key) => {
  let li = document.createElement("li");
  let div = document.createElement("div");
  let span = document.createElement("span")
  let input = document.createElement("input");
  let button = document.createElement("button");

  div.classList.add("todo");
  if(todoData.doneYn == "Y"){
    div.classList.add("done");
  }
  span.textContent = todoData.todoText;
  input.type = "checkbox";
  input.name = "todo";
  input.id = "todo-" + todoData.todoNum
  input.classList.add("chk");
  button.textContent = "X";
  button.classList.add("deleteBtn");

  // 조합
  div.appendChild(span);
  div.appendChild(input);
  div.appendChild(button);
  li.appendChild(div);

  // 투두완료 이벤트 리스너 추가
  input.addEventListener("click", () => {
    let todoDiv = input.parentNode;
    let checked = todoDiv.classList.contains("done");
    let ul = document.querySelector(".content-ul");

    if (checked) {
      todoDiv.classList.remove("done");
      todoData.doneYn = "N";
      localStorage.setItem(key, JSON.stringify(todoData));
      ul.removeChild(todoDiv.parentNode);
      ul.insertBefore(todoDiv.parentNode, ul.firstChild);
    } else {
      todoDiv.classList.add("done");
      todoData.doneYn = "Y";
      localStorage.setItem(key, JSON.stringify(todoData));
      ul.removeChild(li);
      ul.appendChild(li);
    }
  });

  // 투두 삭제 이벤트 리스너 추가
  button.addEventListener("click", () => {
    if (confirm("할 일을 삭제하시겠습니까?")) {
      let ul = document.querySelector(".content-ul");
      ul.removeChild(li);
      localStorage.removeItem(key);
    }
  });

  return li;
}

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

    // 숫자형으로 보장
    todoData.todoNum = Number(todoData.todoNum);
    todoNum = todoData.todoNum;

    let li = createTodoListItem(todoData, key);

    // 뷰 변경 (done 항목 앞에 삽입)
    let doneDiv = document.querySelector(".done");
    if(doneDiv == null){
      ul.appendChild(li);
    } else {
      ul.insertBefore(li, doneDiv.parentNode);
    }
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
  // 숫자형 보장 후 증가
  todoNum = Number(todoNum) || 0;
  todoNum++;

  const todoData = {
    todoNum: Number(todoNum),
    todoText: todoText,
    doneYn: "N"
  };
  const key = String(todoNum);
  // 로컬스토리지에 투두 추가
  localStorage.setItem(key, JSON.stringify(todoData));

  // li 생성 및 뷰에 삽입
  const li = createTodoListItem(todoData, key);
  const ul = document.querySelector(".content-ul");
  const doneDiv = document.querySelector(".done");
  if(doneDiv == null){
    ul.appendChild(li);
  } else {
    ul.insertBefore(li, doneDiv.parentNode);
  }
  todoTextarea.value = '';

  // 스크롤 이동
  const contentDiv = document.querySelector(".content");
  contentDiv.scrollTo({top: contentDiv.scrollHeight, behavior: "smooth"});
})
