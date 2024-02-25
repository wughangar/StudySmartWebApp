const initialState = {
    currentView: "default",
    progress: null,
    popupError: null,
    loadingDialogStatus: null,
};

export default (state = initialState, {type, payload}) =>
{
    switch(type)
    {
        case "SET_VIEW":
            return {
                ...state,
                currentView: payload,
            };
        case "SET_PROGRESS":
            return {
                ...state,
                progress: payload,
            };
        case "POPUP_ERROR":
            return {
                ...state,
                popupError: payload,
            };
        case "SET_LOADING_DIALOG":
            return {
                ...state,
                loadingDialogStatus: payload,
            };
    }

    return state;
}
