const initialState = {
    user: null,
};


export default (state = initialState, {type, payload}) =>
{
    switch(type)
    {
        case "SET_USER":
            return {
                ...state, user: payload,
            };
        default:
            return state;
    }
}
