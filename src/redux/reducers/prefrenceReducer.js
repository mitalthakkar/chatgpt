const PrefrenceType = {
    isTableView: false
};

const PrefrenceReducer = (state = PrefrenceType, action) => {
    switch (action.type) {
        case 'PREFRENCETYPE':
            delete action.type;
            return {
                ...action,
            };
        default:
            return state;
    }
};
export default PrefrenceReducer;
