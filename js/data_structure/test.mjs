import { Node, LinkedList } from "./linkedList.mjs";

// node 생성
let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);

// 연결
node1.next = node2;
node2.next = node3;

// console.log(node1.data); //1
// console.log(node1.next.data); // 2
// console.log(node1.next.next.data); //3

let list = new LinkedList();
console.log("=== insertAt() 호출 ===");
list.insertAt(0, 0);
list.insertAt(1, 1);
list.insertAt(2, 2);
list.insertAt(3, 3);
list.insertAt(4, 4);
list.printAll();
console.log("=== clear() 호출 ===");
list.clear();
list.printAll();

console.log("=== insertLast() 호출 ===");
list.insertLast(0);
list.insertLast(1);
list.insertLast(2);
list.printAll();

console.log("=== deleteAt() 호출 ===");
list.deleteAt(0);
list.printAll();
list.deleteAt(1);
list.printAll();

console.log("=== deleteLast() 호출 ===");
list.insertLast(5);
list.deleteLast();
list.printAll();

console.log("=== getNodeAt() 호출 ===");
list.insertLast(5);
list.insertLast(4);
list.insertLast(3);
list.insertLast(2);
list.insertLast(1);
let secondNode = list.getNodeAt(2);
console.log(secondNode);
