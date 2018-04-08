const defaultUserState = {
    firstName: '',
    lastName: '',
    email: '',
    id: undefined,
    isLoggedIn: false
};

export default (state = defaultUserState, action) => {

    switch (action.type) {

        default:
            return state;

        case "REGISTER_USER":
            return { ...state, ...action.user };

        case "TOGGLE_LOGIN":
            return { ...state, ...action.user };
            
    }

}