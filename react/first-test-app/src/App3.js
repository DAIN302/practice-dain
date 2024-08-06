import React from 'react';
import './App.css';

function Favorite(props){
  return (
    <ul>
      <li>내가 좋아하는 색은 {props.color}</li>
      <li>내가 좋아하는 음식은 {props.food}</li>
      <li>내가 좋아하는 동물은 {props.animal}</li>
      <li>내가 좋아하는 영화는 {props.movie}</li>
    </ul>
  )
}

class Cafe extends React.Component {
  render(){
    return (
      <>
        <p>내가 좋아하는 음료수는 {this.props.drink}</p>
        <p>내가 좋아하는 디저트는 {this.props.dessert}</p>
      </>
    )
  }
}



function App() {
  return (
    <div className="App">
      <Cafe drink="밀크티" dessert="당근케이크" />
      <hr/>
      <Cafe drink="자몽에이드" dessert="에그타르트" />
    </div>
  );
}

export default App;
