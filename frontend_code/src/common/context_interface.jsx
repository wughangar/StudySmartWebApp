var globalContext = null;

export const setCurrentUser = (context, userObj) =>
{
    context.dispatch(
        {
            type: "SET_USER",
            payload: userObj,
        });
};

export const getCurrentUser = (context) =>
{
    const {state} = context;
    const {user}  = state;
    return user;
};

export const isLoggedIn = (context) =>
{
    return getCurrentUser(context) != null;
};

export const setCurrentTopic = (context, topic) =>
{
    context.dispatch(
        {
            type: "SET_TOPIC",
            payload: topic,
        });

};

export const setCurrentView = (context, viewName) =>
{
    context.dispatch(
        {
            type: "SET_VIEW",
            payload: viewName,
        });

};
