

export type UserAccount = {
    id: string,
    email: string
    foodShop: FoodShop | null
}

export type FoodShop = {
    id: string,
    userId?: string,
    accountId?: string,
    urlSlug: string,
    label: string,
    bio?: string | null,
    foodCategory: FoodCategory,
    logo: string,
    isDeliveryAvailable: boolean,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    latitude?: number | null,
    longitude?: number | null,
    maxDeliveryRadius?: number | null,
    deliveryFee?: number | null,
    createdAt: string,
    // foodShopItems?: FoodShopItem[];
    // foodShopSchedule?: FoodShopSchedule[];
};

// type FoodShopSchedule struct {
// 	Id         string `json:"id"`
// 	FoodShopID string `json:"foodShopId"`
// 	OpenDt     string `json:"openDt"`
// 	CloseDt    string `json:"closeDt"` // -- 2025-3-20
// 	OpenTm     string `json:"openTm"`  // -- 0930, 1330
// 	CloseTm    string `json:"closeTm"` //
// 	CreatedAt  string `json:"createdAt"`
// }
export type FoodShopSchedule = {
    id: string,
    foodShopId: string,
    openDt: string,
    closeDt: string,
    openTm: number,
    closeTm: number,
    createdAt: number
}

export enum FoodCategory {
    AMERICAN = "American",
    PIZZA = "Pizza",
    BURGER = "Burger",
    MEXICAN = "Mexican",
    VEGETARIAN = "Vegetarian",
    BBQ = "BBQ",
    DESSERT = "Dessert",
    OTHER = "Other"
}
