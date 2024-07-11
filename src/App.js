import './App.css';
import './Pop.css';
import { useEffect, useState } from 'react';

function App() {
  const sortingAlgorithms = [
    "Bubble Sort",
    "Selection Sort",
    "Insertion Sort",
    "Merge Sort",
    "Quick Sort",
    "Heap Sort",
    "Shell Sort",
    "Comb Sort",
    "Tim Sort",
    "Smooth Sort",
    "Counting Sort",
    "Radix Sort",
    "Bucket Sort",
    "Pigeonhole Sort",
    "Flash Sort",
    "Bead Sort",
    "Pancake Sort",
    "Gnome Sort",
    "Introsort",
    "Block Sort",
    "Bogo Sort",
    "Bitonic Sort",
    "Odd-Even Sort",
    "External Merge Sort",
    "Multi-way Merge Sort",
    "Radix Sort",
    "Burst Sort"
    ];
  const block = 50
  const [ele,setEle] = useState()
  const [data,setData] = useState([])
  const [active,setActive] = useState(false)
  const [anime,setAnime] = useState()
  const [speed,Setspeed] = useState(10)
  const [lock,setLock] = useState(sortingAlgorithms[0])
  // const [l,] = useState(sortingAlgorithms[0])
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve,  ms));

  useEffect(()=>{
    shuffle()
  },[])
  
  const shuffle = ()=>{
    let arr= []
    for(let i=1 ; i<=block;i++){
      let random = Math.ceil(Math.random() *  block + 5)
      arr.push(random)
    }
    setData(arr)
  }
  async function mergeSort(arr){
    if (arr.length <= 1) {
      return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    let dataa =  merge(await mergeSort(left),await mergeSort(right));
    return dataa
  }
   async function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            setEle(left[leftIndex])
            setAnime(data.indexOf(left[leftIndex]))
            await sleep(100 - speed)
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            setEle(right[rightIndex])
            setAnime(data.indexOf(right[rightIndex]))
            await sleep(100 - speed)
            rightIndex++;
        }
    }
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
  const sort = async ()=>{
    
    setActive(true)
    let tempData = [...data]

    switch (lock) {
      case "Bubble Sort":
        for(let i = 0 ; i < (block) ; i++){
          for(let j=0 ; j< (block -i );j++){
            if(tempData[j] > tempData[j+1] ){
              [tempData[j],tempData[j+1]] = [tempData[j+1],tempData[j]]
              setData([...tempData])
              setEle(tempData[j+1])
              setAnime(j+1)
              await sleep(100 - speed )
            }
          }
        }
        break;
      case "Selection Sort":
        for(let i = 0 ; i < (block - 1) ; i++){
          let minIndex = i;
          for (let j = i + 1; j < block; j++) {
              setEle(tempData[j])
              setAnime(j)
              await sleep(100 - speed )
              if (tempData[j] < tempData[minIndex]) {
                  minIndex = j;
              }
          }
          if (minIndex !== i) {
            [tempData[i],tempData[minIndex]] = [tempData[minIndex],tempData[i]]
            setData([...tempData])
            
          }
        }
        break;
      case "Insertion Sort":
        for (let i = 1; i < block; i++) {
          let key = tempData[i];
          let j = i - 1;
          
          // Move elements of arr[0..i-1], that are greater than key,
          // to one position ahead of their current position
          while (j >= 0 && tempData[j] > key) {
              setEle(tempData[j+1])
              setAnime(j+1)
              await sleep(100 - speed )
              tempData[j + 1] = tempData[j];
              j = j - 1;

          }
          tempData[j + 1] = key;
          setData([...tempData])
        }
        break;
      case "Merge Sort":
          setData(await mergeSort(tempData))
        break;
      
      default:
        break;
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
            { data.map((i,k)=>{
              // {console.log(data)}
              return <div data={i} key={k} style={(i===ele & k===anime)?getNewStyle(1,2,i,'lime') :getNewStyle(1,2,i,'white')} />
            }) }
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
            <input disabled={active} type="range" min="1"  max="100" value={speed} onChange={(c)=>{Setspeed(c.target.value)}} className="slider" id="myRange" />
          </div>
          <select disabled={active} value={lock} onChange={(x)=>{setLock(x.target.value)}}>
            {sortingAlgorithms.map((val,x)=>{
              return <option value={val} key={x}>{val}</option>
              // console.log(val)
            })}
          </select>
          <h2>{lock}</h2>
      </div>
    </div>
  );
}

export default App;
