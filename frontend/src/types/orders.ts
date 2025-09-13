export type orderType = {
    "_id"?: string
    "name": string,
    "email": string,
    "address": string,
    "city": string,
    "phone": string,
    "productIds": string[],
    "totalPrice": string | number
}