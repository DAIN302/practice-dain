import { DoublyLinkedList } from "./DoublyinkedList.mjs";

class Deque {
    constructor(){
        this.list = new DoublyLinkedList();
    }

    // 모든 데이터 출력
    printAll(){
        this.list.printAll();
    }

    // head 에 데이터 삽입
    addFirst(data){
        this.list.insertAt(0, data);
    }

    // head 에서 데이터 제거
    removeFirst(){
        return this.list.deleteAt(0);
    }

    // tail 에 데이터 삽입
    addLast(data){
        this.list.insertAt(this.list.count, data);
    }

    // tail 에서 데이터 제거
    removeLast(){
        return this.list.deleteLast();
    }

    // 리스트가 비었는지 체크
    isEmpty(){
        return (this.list.count == 0);
    }
}

export { Deque };