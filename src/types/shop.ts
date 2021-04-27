export interface Game {
    internalName : string
    title : string
    metacriticLink : string
    dealID : string
    storeID : string
    gameID : string
    salePrice : string
    normalPrice : string
    isOnSale : string
    savings : string
    metacriticScore : string
    steamRatingText : string
    steamRatingPercent : string
    steamRatingCount : string
    steamAppID : string
    releaseDate : Date
    lastChange : Date
    dealRating : string
    thumb : string
}

export interface Store {
    storeID: string,
    storeName: string,
    isActive: number,
    images: {
        banner: string,
        logo: string,
        icon: string
    }
}

export interface Deal {
    storeID: string
    dealID: string
    price: string
    retailPrice: string
    savings: string
  }