import { Store } from "../../types/shop";

export const saveStoresList = (stores: Store[]) =>(
{
    type: "SAVE_STORES_LIST",
    data: {
        stores
    }
});
    