import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { OrderContext } from "../../context/OrderContext";

// 주문 완료 페이지
const CompletePage = ({ setStep }) => {
  const [orderData] = useContext(OrderContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderCompleted(orderData);
  }, [orderData]);

  const orderCompleted = async (orderData) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/order`,
        orderData
      );

      setOrderHistory(response.data);
      setLoading(false);
    } catch (error) {}
  };

  const orderTable = orderHistory.map((item) => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>{item.price}</td>
    </tr>
  ));

  if (loading) {
    return <div>...loading</div>;
  } else {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>주문이 성공했습니다.</h2>
        <h3>지금까지 모든 주문</h3>
        <table style={{ margin: "auto" }}>
          <thead>
            <tr>
              <th>Number</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderTable}
          </tbody>
        </table>
        <br />
        <button onClick={() => setStep(0)}>첫 페이지로</button>
      </div>
    );
  }
};

export default CompletePage;
