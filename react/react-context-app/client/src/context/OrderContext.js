import { createContext, useEffect, useMemo, useState } from "react";

export const OrderContext = createContext();

// 복잡한 로직 구현을 위해 Propvider를 위한 함수 생성
export function OrderContextProvider({ children }) {
  // 상품 주문 수량에 대한 state
  const [orderCount, setOrderCount] = useState({
    products: new Map(),
    options: new Map(),
  });
  // Map : 간단한 키와 값을 서로 연결(매핑) 시켜 저장하며
  // 저장된 순서대로 각 요소들을 반복적으로 접근할 수 있도록 한다.
  /*
    필요한 데이터 형식
    products : Map(2){"America" => 1, "England" : => 1}
    0 : ["America", 1]
    1 : ["England", 1]
    options : Map(2){"Insurance" => 1}
    0 : ["Insurance", 1]
  */

  // price 에 대한 state
  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  useEffect(() => {
    // 총 가격 계산
    const productsTotal = calculateSubtotal("products", orderCount);
    const optionsTotal = calculateSubtotal("options", orderCount);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCount]);

  const pricePerItem = {
    products: 1000,
    options: 500,
  };

  // 가격 계산을 위한 함수
  const calculateSubtotal = (orderType, orderCount) => {
    let optionCount = 0;

    for (const count of orderCount[orderType].values()) {
      optionCount += count;
    }

    return optionCount * pricePerItem[orderType];
  };

  // value 로 넣을 데이터
  // useMemo 쓴 이유
  // state 들이 업데이트가 되면 컴포넌트들이 리렌더링됨
  // 최대한 리렌더링 되는 것을 줄여주기 위해(최적화 문제)
  // orderCount state 가 업데이트 될때만 리렌더링 하기 위해 useMemo 를 사용
  const value = useMemo(() => {
    // orderCount 를 업데이트 해줄 함수
    const updateItemCount = (itemName, newItemCount, orderType) => {
      // 불변성 유지를 위해 스프레드 연산자를 이용해서 orderCount 복사
      const newOrderCount = { ...orderCount };

      const orderCountMap = orderCount[orderType];
      // Map 객체 업데이트를 위한 메서드 set()
      orderCountMap.set(itemName, parseInt(newItemCount));
      setOrderCount(newOrderCount);
    };
    return [{ ...orderCount, totals }, updateItemCount];
  }, [orderCount, totals]);

  // Provider return
  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}
