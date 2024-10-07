import { Stack } from "./Stack.mjs";
let stack  = new Stack();

console.log("==== 첫 번째 출력 ====");
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);

console.log(stack); 
console.log(stack.pop().data); // 가장 마지막 데이터인 4 출력
console.log(stack.pop().data); 
console.log(stack.pop().data); 
console.log(stack.pop().data); 
console.log(stack); 

console.log("==== 두 번째 출력 ====");
stack.push(4);
stack.push(3);
stack.push(2);
stack.push(1);
console.log(stack.peek().data); // 가장 위에 있는 데이터 1 출력
stack.pop(); // 가장 위의 데이터 제거
console.log(stack.peek().data); // 가장 위에 있는 데이터 2 출력
console.log(stack.isEmpty());
