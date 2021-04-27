import { Store } from "../../types/shop";

export const saveStores = (stores: Store[]) =>(
{
    type: "SAVE_STORES_LIST",
    data: {
        stores
    }
});
    