// 대상요소 잡기
const form = document.querySelector("form");
const todoInput = form.querySelector("#todo");
const todoList = document.querySelector(".todo-list");
const allDeleteBtn = document.querySelector(".all-delete");

const TODO = "todo";
let todoObj = [];

// 폼요소 제출 이벤트
form.addEventListener("submit", handleSubmit);

let savedTodo = localStorage.getItem(TODO);

// 폼요소 제출 이벤트 함수
function handleSubmit(event) {
  // 이벤트 기본 기능 막기
  event.preventDefault();

  // 빈값인지 확인
  if (todoInput.value.trim() == "") {
    alert("내용을 입력해주세요");
    return;
  }

  // 로컬스토리지에 내용 저장
  handleSave(todoInput.value);
  todoInput.value = "";
  todoInput.focus();
}

// 로컬스토리지 댓글 내용 저장
function handleSave(content) {
  // 새로운 객체 생성
  let newTodo = {
    text: content,
    id: Date.now(),
  };

  // 새로 추가된 내용 배열에 추가
  todoObj.push(newTodo);
  // li추가 함수
  todoWrite(newTodo);
  // json형태로 로컬스토리지에 저장
  todoLocalSave();
}

function todoLocalSave() {
  localStorage.setItem(TODO, JSON.stringify(todoObj));
}

// li에 댓글내용 입력을 위한 함수
function todoWrite(comment) {
  const li = document.createElement("li");
  li.id = comment.id;
  const span = document.createElement("span");
  span.innerText = comment.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteTodo);
  li.appendChild(span);
  li.appendChild(button);
  todoList.appendChild(li);
}

// 로컬스토리지에 있던거 화면에 출력하기
if (savedTodo !== null) {
  const parsedTodo = JSON.parse(savedTodo);
  todoObj = parsedTodo;
  todoObj.forEach(todoWrite);
}

// 모두 지우기
allDeleteBtn.addEventListener("click", deleteAll);

function deleteAll() {
  localStorage.clear();
  const li = todoList.querySelectorAll("li");
  li.forEach((li) => li.remove())
}

// todo 지우기
function deleteTodo(event) {
  const li = event.target.parentElement;
  todoObj = todoObj.filter((todo) => todo.id !== parseInt(li.id));
  li.remove();
  todoLocalSave();
}
