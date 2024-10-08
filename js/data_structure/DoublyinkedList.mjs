// 자바스크립트에서 연결리스트 구현
class Node {
  constructor(data, next = null, prev =  null) {
    // data - 필수, 
    // next - 다음 노드 참조 입력되지 않는다면 null
    // prev - 이전 노드 참조 입력되지 않는다면 null
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}

// 양방향 연결리스트
class DoublyLinkedList {
  constructor() {
    this.head = null; // 리스트의 시작 부분
    this.tail = null; // 리스트의 끝 부분
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
      // 리스트의 가장 앞부분에 삽입하는 경우(head에 삽입하는 경우)
      newNode.next = this.head;
      if(this.head != null){
        // 이전 노드를 가리키는 기능
        this.head.prev = newNode; 
      }
      this.head = newNode;
    } else if(index == this.count) {
      // 마지막 인덱스에 추가하는 경우(tail에 삽입하는 경우)
      newNode.next = null;
      newNode.prev = this.tail;
      this.tail.next = newNode;
    }
    else {
      // head 와 tail 외에 삽입하는 경우
      let currentNode = this.head; // 삽입하려는 노드 바로 전까지 가기 위한 변수
      for (let i = 0; i < index - 1; i++) {
        // 목표 인덱스 바로 전까지 next 를 이용해 currentNode를 이동시킨다.
        currentNode = currentNode.next;
      }
      newNode.next = currentNode.next;
      newNode.prev = currentNode;
      currentNode.next = newNode;
      newNode.next.prev = newNode;
    }

    if(newNode.next == null){
      // 새로 삽입한 노드가 마지막 노드일 경우
      this.tail = newNode;
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
      if(this.head.next == null){
        // 데이터가 1개일 때
        this.head = null;
        this.tail = null;
      } else {
        // 데이터가 2개 이상일 때
        this.head = this.head.next;
        this.head.prev = null;

      }
      this.count--;
      return deletedNode;
    } else if(index == this.count - 1){
      // tail 노드를 제거하는 경우
      let deletedNode = this.tail;
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
      this.count--;
      return deletedNode;
    }
    else {
      // head 와 tail 노드 외 나머지를 제거하는 경우
      for (let i = 0; i < index - 1; i++) {
        // 제거할 노드 이전 노드까지 순회
        currentNode = currentNode.next;
      }
      let deletedNode = currentNode.next;
      currentNode.next = currentNode.next.next;
      currentNode.next.prev = currentNode;
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

export { Node, DoublyLinkedList };
