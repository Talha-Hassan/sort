import './App.css';
import './Pop.css';
import { useEffect, useState } from 'react';
import Block from './component/blocks';

function App() {
  const block = 50
  const [ele,setEle] = useState()
  const [data,setData] = useState([])
  const [active,setActive] = useState(false)
  const [anime,setAnime] = useState()
  const [speed,Setspeed] = useState(10)
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(()=>{
    shuffle()
  },[])
  
  const shuffle = ()=>{
    let arr= []
    for(let i=1 ; i<=block;i++){
      let random = Math.ceil(Math.random() *  block + 5)
      // arr.push(<div data={random} key={i} style={{width : `${random}px`, height: '3px', background: 'white',border: '1px solid black'}}></div>)
      arr.push(random)
    }
    setData(arr)
  }
  
  const sort = async ()=>{
    setActive(true)
    let tempData = [...data]

    for(let i = 0 ; i < (block) ; i++){
      for(let j=0 ; j< (block -i );j++){
        if(tempData[j] > tempData[j+1] ){
          [tempData[j],tempData[j+1]] = [tempData[j+1],tempData[j]]
          setData([...tempData])
          setEle(tempData[j+1])
          setAnime(j+1)
          await new Promise(resolve => setTimeout(resolve, speed));
        }
      }
    }
    
    setEle(null)
    setAnime(null)
    setActive(false)
  }
const getNewStyle =(newStyle = false,width= null, data=null,color=null,style=null)=>{
  let temp 
    if(newStyle){
      temp = {
        width : `${width}vw`,
        height : `${data}vh`,
        background : `${color}`
      }
    }
    else if(color){
      temp = {
        ...style ,
        background : `${color}`
      }
    }
    else{
      temp = {
        ...style ,
        height : `${data}px`
      }
    }

    return temp
}
  
  return (
    <div className="App">
      <div className="Main">
        <div className='main-sort-box'>
          {/* <div className='blocks'> */}
            { data.map((i,k)=>{
              return <div data={i} key={k} style={(i===ele & k===anime)?getNewStyle(1,2,i,'lime') :getNewStyle(1,2,i,'white')} />
              
            }) }
          {/* </div> */}
        </div>
        <div className='button-box'>

          <button 
            disabled={active} 
            onClick={sort}
            >
              Sort
            </button>
          <button 
            disabled={active}
            onClick={shuffle}
            >
              Shuffle
            </button>
            {/* <Block /> */}
          </div>
          <div className="slidecontainer">
            <input disabled={active} type="range" min="1" max="100" value={speed} onChange={(c)=>{Setspeed(c.target.value)}} className="slider" id="myRange" />
          </div>
          <h2>Bubble Sort</h2>
      </div>
    </div>
  );
}

export default App;
