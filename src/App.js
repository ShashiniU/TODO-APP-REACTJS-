import React,{useState,useEffect} from 'react';
import './App.css';
//Import Components
import Form from "./components/Form"; 
import TodoList from "./components/TodoList";

function App() {
  
  //State Stuf
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  //run once
  useEffect(() => {
    getLocalTodos();
  },[]);
  //Use Effect
  useEffect(() => {
     //function
    const filterHandler = () => {
      switch (status) {
        case 'completed':
          setFilteredTodos(todos.filter(todos => todos.completed === true));
          break;
        
        case 'uncompleted':
          setFilteredTodos(todos.filter(todos => todos.completed === false));
          break;
        
        default:
          setFilteredTodos(todos);
          break;
      }
    };
    filterHandler();
  },
    [todos, status]
  );
    //save to Local
  const saveLocalTodos = () => {
    
      localStorage.setItem("todos",JSON.stringify(todos));
    
  };
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };
 

  return (
    <div className="App">
      <header>
        <h1>ToDo List</h1>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
       
      />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filteredTodos}
      />
    </div>
  );
}

export default App;
