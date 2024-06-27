import { render } from '@testing-library/react';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const block = 100
  let [refresh,setRefresh] = useState(true)
  let [lines,setLines] = useState([])
  let [button,setButton] = useState(false)
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(()=>{
    let arr= []
    for(let i=1 ; i<=block;i++){
      let random = Math.ceil(Math.random() * block)
      arr.push(<div data={random} key={i} style={{width : `${random}px`, height: '3px', background: 'white',border: '1px solid black'}}></div>)
    }
    setLines(arr)
  },[])
  const sort = async ()=>{
    setButton(!button)
    for(let i = 0 ; i< (block - 1) ; i++){
      for(let j=0 ; j< (block - 1 -i );j++){
        if(lines[j].props.data > lines[j+1].props.data ){
          // console.log("working")
          // data(j,j+1)
          lines[j] = <div data={lines[j].props.data} key={lines[j].key} style={{width : `${lines[j].props.style.width}`, height: '3px', background: 'lime',border: '1px solid black'}}></div>
          lines[j+1] = <div data={lines[j+1].props.data} key={lines[j+1].key} style={{width : `${lines[j+1].props.style.width}`, height: '3px', background: 'lime',border: '1px solid black'}}></div>
          setRefresh(!refresh)
          
          let data = lines[j].props.data
          let width = lines[j].props.style.width
          let key = lines[j].key
          await sleep(10)
          setRefresh(!refresh)
          setRefresh(!refresh)
          // console.log("working")
            
          lines[j] = <div data={lines[j+1].props.data} key={lines[j+1].key} style={{width : `${lines[j+1].props.style.width}`, height: '3px', background: 'lime',border: '1px solid black'}}></div>
          lines[j+1] = <div data={data} key={key} style={{width : `${width}px`, height: '3px', background: 'lime',border: '1px solid black'}}></div>
           
          
          lines[j] = <div data={lines[j].props.data} key={lines[j].key} style={{width : `${lines[j].props.style.width}`, height: '3px', background: 'white',border: '1px solid black'}}></div>
          lines[j+1] = <div data={lines[j+1].props.data} key={lines[j+1].key} style={{width : `${lines[j+1].props.style.width}`, height: '3px', background: 'white',border: '1px solid black'}}></div>
    
        }
      }
    }
    setButton(!button)
  }
 
  // const data = (ind1,ind2)=>{
    
  //   let data = lines[ind1].props.data
  //   let width = lines[ind1].props.style.width
  //   let key = lines[ind1].key
    
  //   lines[ind1] = <div data={lines[ind2].props.data} key={lines[ind2].key} style={{width : `${lines[ind2].props.style.width}`, height: '3px', background: 'lime',border: '1px solid black'}}></div>
  //   lines[ind2] = <div data={data} key={key} style={{width : `${width}px`, height: '3px', background: 'lime',border: '1px solid black'}}></div>
   
  // }
  
  return (
    <div className="App">
      <div className="Main">
        <div className='main-sort-box'>
          { lines }
        </div>
          <button 
            // disabled={button} 
            onClick={sort}
          >
              Sort
            </button>
      </div>
    </div>
  );
}

export default App;
