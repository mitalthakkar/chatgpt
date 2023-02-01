const CompareType = {
    compareData: []
};

const CompareReducer = (state = CompareType, action) => {
    switch (action.type) {
        case 'COMPARETYPE':
            delete action.type;
            return {
                ...action,
            };
        default:
            return state;
    }
};
export default CompareReducer;
