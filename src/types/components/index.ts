export interface IBasketModal {
    items: Map<string, number>
    add(id: string): void
    remove(id: string): void
}

// export interface IProductSettings {
//     description: string
//     image: string
//     title: string
//     category: string
//     price: number
//     selected: boolean
// }

// export interface IUserSettings {
//     payment: string
//     email: string
//     phone: number
//     address: string
// }

// export interface IBasket {
//     total: number
//     items: IProduct[]
//     load<T>(): Promise<T>
//     delete(): void
// }



export interface IProductData {
    description: string
    image: string
    title: string
    category: string
    price: number
}

export interface IProductSettings {
    _id: string
    description: string
    image: string
    title: string
    category: string
    price: number
    isSelected: boolean
}