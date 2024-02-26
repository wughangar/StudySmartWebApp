export const setCurrentUser = (dispatch, userObj) =>
{
    console.log("SETTING CURRENT USER: ", userObj);
    dispatch(
        {
            type: "SET_USER",
            payload: userObj,
        });

    setCurrentView(dispatch, "default");
};


export const setCurrentTopic = (dispatch, topic) =>
{
    console.log("SETTING THE TOPIC: ", topic);
    dispatch(
        {
            type: "SET_TOPIC",
            payload: topic,
        });
};

export const setCurrentView = (dispatch, viewName) =>
{
    dispatch(
        {
            type: "SET_VIEW",
            payload: viewName,
        });

};


export const logout = (dispatch) =>
{
    setCurrentUser(dispatch, null);
    setCurrentView(dispatch, "login");
};

export const setTopicsList = (dispatch, topics) =>
{
    dispatch(
        {
            type: "SET_TOPICS",
            payload: topics,
        },
    );
};


export const insertTopicSummary = (dispatch, summary) =>
{
    dispatch(
        {
            type: "INSERT_TOPIC_SUMMARY",
            payload: summary,
        },
    );
};

export const removeTopicSummary = (dispatch, summary) =>
{
    dispatch(
        {
            type: "REMOVE_TOPIC_SUMMARY",
            payload: summary,
        },
    );
};

export const setTopicQuiz = (dispatch, quiz) =>
{
    dispatch(
        {
            type: "SET_TOPIC_QUIZ",
            payload: quiz,
        },
    );
};


export const setLoadingDialogStatus = (dispatch, statusText) =>
{
    dispatch(
        {
            type: "SET_LOADING_DIALOG",
            payload: statusText,
        },
    );
};

export const closeLoadingDialog = (dispatch) =>
{
    dispatch(
        {
            type: "SET_LOADING_DIALOG",
            payload: null,
        },
    );
};

export const setTopicChapter = (dispatch, topicChapter) =>
{
    console.log("Setting chapter: ", topicChapter)
    dispatch(
        {
            type: "SET_TOPIC_CHAPTER",
            payload: topicChapter,
        },
    );

};

export const setTopicQA = (dispatch, question) =>
{
    console.log("Setting chapter QA: ", question)
    dispatch(
        {
            type: "SET_TOPIC_QA",
            payload: question,
        },
    );

};
