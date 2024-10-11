import React, { useState } from "react";

const SummaryPage = () => {
  // 주문 확인 체크를 해야 주문 확인 버튼 누를 수 있음

  const [checked, setChecked] = useState(false);

  return (
    <div>
      <form>
        <input
          type="checkbox"
          checked={checked}
          id="confirm-checkbox"
          onChange={(e) => setChecked(e.target.checked)}
        />{" "}
        <label htmlFor="confirm-checkbox">주문하려는 것을 확인하셨나요?</label>
        <br />
        <button type="submit" disabled={!checked}>주문 확인</button>
      </form>
    </div>
  );
};

export default SummaryPage;
