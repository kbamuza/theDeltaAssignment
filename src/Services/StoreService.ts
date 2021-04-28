import { Deal, Game, Store } from "../types/shop"

export const CHEAPSHARK_BASE_API = "https://www.cheapshark.com"

export function getAllGames(): Promise<[Game]> {
    const url = `${CHEAPSHARK_BASE_API}/api/1.0/deals`
    return fetch(url, {method: 'GET'})
        .then((response) => response.json() as Promise<[Game]>)
        .then(response => {
            console.log("storeService.getAllGames.response", response)
            return response as [Game]
        })
        .catch(err => {
            console.log("storeService.getAllGames.catch.err", err)
            throw new Error(err)
        })
}

export function getAllStores(): Promise<Store[]> {
    const url = `${CHEAPSHARK_BASE_API}/api/1.0/stores`
    return fetch(url, {method: 'GET'})
        .then((response) => response.json() as Promise<Store[]>)
        .then(response => {
            console.log("storeService.getAllStores.response", response)
            return response as Store[]
        })
        .catch(err => {
            console.log("storeService.getAllStores.catch.err", err)
            throw new Error(err)
        })
}

export function getDealsForGame(steamAppID: string): Promise<Deal[]> {
    const url = `${CHEAPSHARK_BASE_API}/api/1.0/games?id=${steamAppID}`
    return fetch(url, {method: 'GET'})
        .then((response) => response.json() as Promise<{deals: Deal[]}>)
        .then(response => {
            console.log("storeService.getDealsForGame.response", response)
            return response.deals as Deal[]
        })
        .catch(err => {
            console.log("storeService.getDealsForGame.catch.err", err)
            throw new Error(err)
        })
}

export function findStoreById(storeID: string, stores: Store[]){
    console.log("storeService.findStoreById.stores.stores", stores)
    return stores.find((item) => 
        item.storeID === storeID
    )
}

export function filterGamesBySearchTerm(searchTerm: string, games: Game[]){
    if(!searchTerm) {return games}
    const filteredResults = games.filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase()))
    console.log("filterGamesBySearchTerm.filteredResults", filteredResults)
    return filteredResults
}

export function filterGamesBySaleItems(saleFilterStatus: boolean, games: Game[]){
    if(!saleFilterStatus) {return games}
    const filteredResults = games.filter((game) => !!game.isOnSale)
    console.log("filterGamesBySaleItems.filteredResults", filteredResults)
    return filteredResults
}

export function filterStoresBySearchTerm(searchTerm: string, stores: Store[]){
    if(!searchTerm) {return stores}
    const filteredResults = stores.filter((store) => store.storeName.toLowerCase().includes(searchTerm.toLowerCase()))
    console.log("filterStoresBySearchTerm.filteredResults", filteredResults)
    return filteredResults
}