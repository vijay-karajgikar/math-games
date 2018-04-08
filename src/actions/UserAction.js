export const registerUserAction = (user) => ({
    type: "REGISTER_USER", 
    user
});

export const toggleLoginAction = (user) => ({
    type: "TOGGLE_LOGIN",
    user
});