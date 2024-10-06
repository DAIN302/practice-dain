// 자바스크립트에서 연결리스트 구현
class Node {
  constructor(data, next = null) {
    // data - 필수, next - 입력되지 않는다면 null
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.count = 0;
  }

  // 모든 요소 출력
  printAll() {
    let currentNode = this.head;
    let text = "[";

    while (currentNode != null) {
      text += currentNode.data;
      currentNode = currentNode.next;
      if (currentNode != null) {
        text += ",";
      }
    }

    text += "]";
    console.log(text);
  }

  // 모든 요소 제거
  clear() {
    this.head = null;
    this.count = 0;
  }

  // 인덱스 삽입
  insertAt(index, data) {
    if (index > this.count || index < 0) {
      // 음수거나 범위를 넘어가는 경우 에러 처리
      throw new Error("범위를 넘어갔습니다.");
    }
    let newNode = new Node(data);

    if (index == 0) {
      // 리스트의 가장 앞부분에 삽입하는 경우
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // 리스트 가장 앞부분 외에 삽입하는 경우
      let currentNode = this.head; // 삽입하려는 노드 바로 전까지 가기 위한 변수
      for (let i = 0; i < index - 1; i++) {
        // 목표 인덱스 바로 전까지 next 를 이용해 currentNode를 이동시킨다.
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next;
      currentNode.next = newNode;
    }
    this.count++;
  }

  // 마지막 인덱스에 데이터 삽입
  insertLast(data) {
    this.insertAt(this.count, data);
  }

  // 특정 인덱스 데이터 삭제
  deleteAt(index) {
    if (index > this.count || index < 0) {
      // 음수거나 범위를 넘어가는 경우 에러 처리
      throw new Error("범위를 넘어갔습니다.");
    }

    let currentNode = this.head;
    if (index == 0) {
      // head 노드를 제거하는 경우
      let deletedNode = this.head; // 삭제될 노드 저장
      this.head = this.head.next;
      this.count--;
      return deletedNode;
    } else {
      // head 노드 외 나머지를 제거하는 경우
      for (let i = 0; i < index - 1; i++) {
        // 제거할 노드 이전 노드까지 순회
        currentNode = currentNode.next;
      }
      let deletedNode = currentNode.next;
      currentNode.next = currentNode.next.next;
      this.count--;
      return deletedNode;
    }
  }

  // 마지막 데이터 삭제
  deleteLast() {
    return this.deleteAt(this.count - 1);
  }

  // 원하는 인덱스 데이터 읽기
  getNodeAt(index) {
    if (index > this.count || index < 0) {
      // 음수거나 범위를 넘어가는 경우 에러 처리
      throw new Error("범위를 넘어갔습니다.");
    }
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }
}

export { Node, LinkedList };
