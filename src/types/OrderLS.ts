export interface IOrderItemDetails {
  id: string
  name: string
  price: number
  quantity: number
  imageName: string
  imageUrl: string
}

export interface IOrder {
  user_id: string
  transaction_details: {
    gross_amount: number
  }
  item_details: IOrderItemDetails[]
}

export interface ICheckoutItemDetails {
  id: string
  name: string
  price: number
  quantity: number
  // merchant_name: 'TRISHOP' | 'trishop' | 'Trishop'
  // brand: string // e.g Nike, Adidas
  // category: string // product labels
}

export interface ICheckout {
  user_id: string
  customer_details: {
    email: string
    phone: string
    first_name: string
    last_name: string
    billing_address: {
      email: string
      phone: string
      first_name: string
      last_name: string
      address: string
      city: string
      postal_code: string
      country_code: string
    }
  }
  item_details: ICheckoutItemDetails[]
}
