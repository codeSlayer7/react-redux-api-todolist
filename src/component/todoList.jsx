import TodoItem from "./todoItem";
import { useSelector } from "react-redux";


const TodoList = () => {
    const todos= useSelector( state=> state.todos.todos);
    return (
        <ul>
            {todos.map(el=> 
            <TodoItem key={el.id} {...el} >
            </TodoItem>)}
        </ul>
      );
}
 
export default TodoList;