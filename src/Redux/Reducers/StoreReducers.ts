const initialState = {
    stores: []
};

export function storeReducer(state = initialState , action: any){
    console.log("storeReducer.action", action)
    switch(action.type){
        case "SAVE_STORES_LIST" :{
        return{
            ...state,
            stores : action.data.stores
        }}
        default:{
            return state;
        }
    }
}
    