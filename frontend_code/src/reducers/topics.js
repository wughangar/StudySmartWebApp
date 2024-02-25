const initialState = {
    currentTopic: null,
    topicSummaries: [],
    quiz: null,
    studyGuide: null
};

export default (state = initialState, {type, payload}) =>
{
    switch(type)
    {
        case 'SET_TOPIC':
            state = {
                ...state,
                currentTopic: payload,
                quiz: null,
                studyGuide: null,
            };
            return state;

        case 'SET_TOPICS':
            state = {
                ...state,
                topics: payload,
            };
            return state;
        case 'INSERT_TOPIC_SUMMARY':
            if(state.topicSummaries)
            {
                state = {
                    ...state,
                    topicSummaries: [...state.topicSummaries, payload],
                };
            }
            else
            {
                state = {
                    ...state,
                    topicSummaries: [payload],
                };
            }
            return state;
        case 'REMOVE_TOPIC_SUMMARY':
            if(state.topicSummaries)
            {
                state = {
                    ...state,
                    topicSummaries: state.topicSummaries.filter(topic => topic !== payload),
                };
            }
            return state;

        default:
            return state;

    }
}
