

// Users
const addUser = (newUser) => ({
    type: "ADD_USER",
    user: newUser
})

// const removeExpense = ( { id } = {} ) => 
// ({
//     type: "REMOVE_EXPENSE",
//     id,
// })

// const editExpense = (id, updates) =>
// ({
//     type: "EDIT_EXPENSE",
//     id,
//     updates,
// })

export { addUser };