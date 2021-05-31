export interface IItemDetails {
  id: string
  name: string
  price: number
  quantity: number
}

export interface IOrder {
  user_id: string
  transaction_details: {
    gross_amount: number
  }
  item_details: IItemDetails[]
}
