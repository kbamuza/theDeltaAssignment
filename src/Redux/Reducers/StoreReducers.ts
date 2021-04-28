const initialState = {
    stores: [],
    availableGames: []
};

export function storeReducer(state = initialState , action: any){
    console.log("storeReducer.action", action)
    switch(action.type){
        case "SAVE_STORES_LIST" :{
        return{
            ...state,
            stores : action.data.stores
        }}
        case "SAVE_AVAILABLE_GAMES" :{
            return{
                ...state,
                availableGames : action.data.games
        }}
        default:{
            return state;
        }
    }
}
    