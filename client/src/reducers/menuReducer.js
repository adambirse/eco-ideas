const menuReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ROLE':
            return {
                role: action.role
            };
        default:
            return state
    }
};

export default menuReducer