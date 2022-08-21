import {useDispatch} from  'react-redux';
import {  toggleStatus, deleteTodos} from '../store/todoSlice';


const TodoItem = ({id,title,complated}) => {

    const dispatch = useDispatch()
    return ( <li>
                <input type='checkbox'
                 checked={complated} 
                 onChange={()=>{
                    dispatch(toggleStatus(id))
                } }/>
                 <span style={{color:'red'}}> {title}</span>
                <span onClick={()=>{ 
                    dispatch(deleteTodos(id))
                    } }>
                     &times;
                </span>
            </li> 
    );
}
 
export default TodoItem;