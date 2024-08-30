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
