

const usersReducerDefaultState = [];

const usersReducer = (state = usersReducerDefaultState, action) => 
{
    switch(action.type)
    {
        case "ADD_USER":
            return [...state, action.user]; // Spread operator
    
        // case "REMOVE_EXPENSE":
        //     return state.filter( (expense) => expense.id !== action.id);  // if true keep it, if false remove it
            
        // case "EDIT_EXPENSE":
        //     return state.map( (expense) => expense.id === action.id ? {...expense, ...action.updates} : expense);
        
        default:
            return state;
    }
};

export default usersReducer;