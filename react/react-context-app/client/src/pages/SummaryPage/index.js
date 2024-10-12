import React, { useContext, useState } from "react";
import { OrderContext } from "../../context/OrderContext";

const SummaryPage = ({ setStep }) => {
  // 주문 확인 체크를 해야 주문 확인 버튼 누를 수 있음
  const [checked, setChecked] = useState(false);

  const [orderDetails] = useContext(OrderContext);

  // Array.from()
  // 유사한 배열 객체나 반복 가능한 객체를 얕게 복사해서 새로운 array 객체를 만드는 메서드
  const productArray = Array.from(orderDetails.products);
  const productList = productArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasOptions = orderDetails.options.size > 0;
  let optionsDisplay = null;
  if (hasOptions) {
    const optionsArray = Array.from(orderDetails.options);
    const optionList = optionsArray.map((key) => <li key={key}>{key}</li>);
    optionsDisplay = (
      <>
        <h2>옵션 : {orderDetails.totals.options}</h2>
        <ul>{optionList}</ul>
      </>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품 : {orderDetails.totals.products}</h2>
      <ul>{productList}</ul>
      {optionsDisplay}
      <form onSubmit={handleSubmit}>
        <input
          type="checkbox"
          checked={checked}
          id="confirm-checkbox"
          onChange={(e) => setChecked(e.target.checked)}
        />{" "}
        <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
        <br />
        <button type="submit" disabled={!checked}>
          주문 확인
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
