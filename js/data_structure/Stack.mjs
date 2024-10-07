import { LinkedList } from "./linkedList.mjs";

class Stack {
  constructor() {
    this.list = new LinkedList();
  }

  // 데이터 삽입
  push(data) {
    // 연결리스트의 헤드에 삽입
    this.list.insertAt(0, data);
  }

  // 데이터 제거
  pop() {
    // 연결리스트의 헤드 제거
    try {
      return this.list.deleteAt(0);
    } catch (error) {
      // 에러를 캐치하면 null 값 리턴
      return null;
    }
  }
  // 데이터 참조
  peek() {
    // 연결리스트의 getNodeAt() 함수로 첫번째 데이터를 읽어오고 리턴
    return this.list.getNodeAt(0);
  }

  // 연결리스트가 비었는지 확인
  isEmpty() {
    // 비어있으면 true, 비어있지 않으면 false 반환
    return this.list.count == 0;
  }
}

export { Stack };
