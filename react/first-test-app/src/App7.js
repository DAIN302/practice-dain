import React, { useState } from 'react';

function App7() {
  const [articles, setArticles] = useState(['남자옷추천', '어쩌고', '저쩌고'])

  const changeItem = () => {
    var newArr = articles;
    newArr[0] = '여자옷추천';
    setArticles(newArr);
  }

  return (
    <div className="App">
      <ul>
        <li>{articles[0]}</li>
        <li>{articles[1]}</li>
        <li>{articles[2]}</li>
      </ul>
      <button onClick={changeItem}>클릭</button>
    </div>
  );
}

export default App7;


/*
제시한 코드에서 changeItem 함수는 articles 상태를 수정하려고 하지만, 예상대로 동작하지 않을 것입니다. 이유는 배열을 직접 수정하고 있기 때문입니다. 리액트의 useState 훅은 상태의 불변성을 유지해야 합니다. 상태를 직접 수정하면 리액트는 상태 변경을 감지하지 못해 UI가 업데이트되지 않습니다.

문제점
changeItem 함수에서 var newArr = articles;로 배열을 복사한 후 newArr[0] = '여자옷추천';으로 배열을 수정하고, setArticles(newArr);으로 상태를 업데이트합니다. 하지만, 이 방식은 얕은 복사(shallow copy)를 사용하고 있어, 실제로는 articles와 newArr이 동일한 배열을 참조하게 됩니다. 따라서 articles 배열을 직접 수정하게 되고, 리액트는 이를 상태 변경으로 인식하지 않습니다.

해결 방법
상태를 직접 수정하지 않고 새로운 배열을 생성하여 상태를 업데이트해야 합니다. 깊은 복사(deep copy)를 통해 상태를 불변으로 유지하는 것이 좋습니다. 이를 위해 배열의 복사본을 만들어서 수정하는 방법을 사용합니다.

다음은 수정된 코드입니다:

jsx
코드 복사
import React, { useState } from 'react';

function App7() {
  const [articles, setArticles] = useState(['남자옷추천', '어쩌고', '저쩌고']);

  const changeItem = () => {
    // 배열을 깊은 복사하여 새로운 배열을 생성합니다.
    const newArr = [...articles];
    newArr[0] = '여자옷추천';
    setArticles(newArr);
  };

  return (
    <div className="App">
      <ul>
        <li>{articles[0]}</li>
        <li>{articles[1]}</li>
        <li>{articles[2]}</li>
      </ul>
      <button onClick={changeItem}>클릭</button>
    </div>
  );
}

export default App7;
이 코드에서는 const newArr = [...articles];를 사용하여 articles 배열의 복사본을 만듭니다. 이제 newArr을 수정해도 articles 배열에는 영향을 미치지 않으며, 리액트는 상태 변경을 감지하고 UI를 업데이트합니다.




*/