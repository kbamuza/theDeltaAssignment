const initialState = {
    stores: ["This is only a test"]
};

export function storeReducer(state = initialState , action: any){

    switch(action.type){
        case "SAVE_STORES_LIST" :{
        return{
            ...state,
            stores : action.data
        }}
        default:{
            return state;
        }
    }
}
    