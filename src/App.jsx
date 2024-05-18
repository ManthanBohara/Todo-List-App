import { useState,useEffect,useRef } from 'react'
import Navbar from './Components/Navbar'
import Button from './Components/Button'

function App() {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [Finished, setFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    console.log(todoString);
    if (todoString){
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
    console.log(...Todos);
  }, [])
  

  const saveToLS = (obj) => {
    localStorage.setItem("todos",JSON.stringify(obj))
  }
  
  
  const handleShowFinished = ()=>{
    setFinished(!Finished)
  }

  const handleChange = (e)=>{
    setTodo(e.target.value);
  }

  const handleAdd = (id)=>{
    if (Todo=="") {
      return
    }
    setTodo("")
    let newTodos=[...Todos]
    newTodos.push({"id":Date.now(),"text":`${Todo}`,"isCompleted":false})
    setTodos(newTodos)
    saveToLS(newTodos)
    console.log(newTodos);
  }


  const handleCheckbox=(id)=>{
    let index = Todos.findIndex(item=>{
      return item.id === id
    })

    let newTodos=[...Todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete=(id)=>{
    let newTodos=Todos.filter(item=>{
      return item.id!==id
    })
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleEdit=(id)=>{
    let todoText=Todos.filter(item=>{
      return item.id === id
    })
    setTodo(todoText[0].text)
    let newTodos=Todos.filter(item=>{
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS(newTodos)
  }



  return (
    <>
      <Navbar />
        {/* <div className='flex justify-center font-bold md:text-xl text-lg'>myTask - Your Daily Task Planner</div> */}
      <div className="overflow-auto container bg-violet-200 w-11/12 md:w-3/4 h-[60vh] max-sm:h-[65vh] max-sm:my-16 mx-auto my-24 rounded-xl">
        <div className="addTodo mx-5 my-2">
          <div className='font-bold mx-2 my-2' py-2>Add a Task</div>
          <input  placeholder='Add Task'  onChange={handleChange} value={Todo} type="text" className='p-2 rounded-md w-3/4 h-7' />
          <Button text="Add" function={handleAdd}/>
        </div>

        <input onChange={handleShowFinished} checked={Finished} type="checkbox" name="showFinished" id="" className='mx-2'/>
        <label htmlFor="showFinished">Show Finished</label>
        
        <div className="todolist mx-5 my-5">
          <div className='font-bold mx-2 my-2' py-2>Tasks</div>
          <div className={`alert flex justify-center ${Todos.length!=0 && "hidden"}`}>No Tasks Found</div>
          {Todos.map((item)=>{
            if (Finished!=true){
              if (item.isCompleted==true){
                return
              }
            }
            return <div key={item.id} className="todo flex justify-between my-1 bg-violet-100 py-2 px-2 rounded-lg">
            <div className="w-full todoInfo flex gap-2">
              <input onChange={()=>{handleCheckbox(item.id)}} checked={item.isCompleted} type="checkbox" />
              <div key={item.id} className={`todoDetails text-wrap w-5/6 text-sm md:text-base ${item.isCompleted==true && "line-through"}`}>{item.text}</div>
            </div>
            <div className="h-8 buttons flex">
              <Button text="Edit" function={()=>{handleEdit(item.id)}}/>
              <Button text="Delete" function={()=>{handleDelete(item.id)}}/>
            </div>
          </div>

          })}

        </div>
      </div>
    </>
  )
}

export default App
