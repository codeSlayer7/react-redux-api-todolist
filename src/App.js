import {useState, useEffect} from 'react';
import './App.css';
import TodoList from './component/todoList';
import Input from './component/inputField';
import {useDispatch, useSelector} from 'react-redux'
import {addNewTodo, fetchTodos} from './store/todoSlice';
function App() {
  const [text, setText] = useState('')
  const dispatch = useDispatch();
  const {status, error}= useSelector(state=> state.todos)

  const addTask = ()=>{
      dispatch(addNewTodo(text))
  }

  useEffect(()=>{
    dispatch(fetchTodos())
  },[])


  return (
    <div className="App">
     
      <Input
      text={text}
      handleText={setText}
      putTodo={addTask}/>

      {status==='loading'&& <h2>loading...</h2>}
      {error&& <h1>{error}</h1>}
    <TodoList />

    </div>
  );
}

export default App;
