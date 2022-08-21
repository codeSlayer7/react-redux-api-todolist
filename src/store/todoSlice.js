import {createSlice, createAsyncThunk, isAsyncThunkAction}from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function(_,{rejectWithValue}){

            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
            if(!response.ok){
                throw new Error('server crushed')
            }
            const data = await response.json();
            return data;
                
            } catch (error) {
                return rejectWithValue(error.message)
           }
       

    }
)
export const deleteTodos = createAsyncThunk(
    'todos/deleteTodos',
    async function(id,{rejectWithValue, dispatch}) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
                method: 'DELETE',
            })

            console.log(response);

            if(!response.ok){
                throw new Error('cant delete task server error');
            }

            dispatch(removeItem({id}))
            
        } catch (error) {
            return rejectWithValue(error.message)
        }

    }
)

export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function (id, {rejectWithValue, dispatch, getState}) {
        const todo = getState().todos.todos.find(el=> el.id ===id)

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    complated: !todo.complated,
                })
            })
            if(!response.ok){
                throw new Error('cant toggle task server error');
            }
           
            dispatch(toggleItem({id}))
        } catch (error) {

            return rejectWithValue(error.message)
        }

    }

)


export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo', 
    async function (text,{rejectWithValue, dispatch,}) {
        
        try {
            const todo = {
                title: text,
                userId: 1,
                complated: false,
            }

            const response = await fetch('https://jsonplaceholder.typicode.com/todos',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(todo)
            });
            
            if(!response.ok){
                throw new Error('cant post task server error');
            }
             const data = await response.json()
            dispatch(addTodo(data))
            } catch (error) {
                return rejectWithValue(error.message)
            }
        }
)
const setError=(state, action)=>{
    state.status= 'rejected',
    state.error = action.payload;
 };
const todoSlice= createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers:{
        addTodo(state,action){
            console.log(state)
            console.log(action)
            state.todos.push(action.payload)
         },
        removeItem(state, action){
            state.todos= state.todos.filter(el => el.id !== action.payload.id)
        },
        toggleItem(state, action ){
            const toggledTodo = state.todos.find( el=> el.id === action.payload.id);
            toggledTodo.complated= !toggledTodo.complated;
        }

    },
    extraReducers:{
        [fetchTodos.pending]: ( state )=>{state.status = 'loading', state.error = null},
        [fetchTodos.fulfilled]: (state, action)=>{ state.status = 'resolved',state.todos = action.payload;},
        [fetchTodos.rejected]: setError,
        [deleteTodos.rejected]: setError,
        [toggleStatus.rejected]: setError
    }
})

 const {addTodo,removeItem,toggleItem}= todoSlice.actions;
export default todoSlice.reducer