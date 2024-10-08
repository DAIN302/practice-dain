import { Queue } from "./Queue.mjs";

let queue = new Queue();
console.log("큐 테스트");

// 데이터 삽입
console.log("=== enqueue 세 번 호출 ===");
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
console.log(queue);
console.log(queue.front());
console.log("=== dequeue 네 번 호출 ===");
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());

console.log(queue.isEmpty());