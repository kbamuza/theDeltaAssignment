import { Game, Store } from "../../types/shop";

export const saveStores = (stores: Store[]) =>(
{
    type: "SAVE_STORES_LIST",
    data: {
        stores
    }
});

export const saveAvailableGames = (games: Game[]) =>(
{
    type: "SAVE_AVAILABLE_GAMES",
    data: {
        games
    }
});
    