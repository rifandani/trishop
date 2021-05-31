// increment - user_id - Date.now()
const order_id = '8-or4oq4FYkdM6gXRWNLGOqMKHA1H3-1619971999845'

const order = {
  user_id: 'or4oq4FYkdM6gXRWNLGOqMKHA1H3',
  transaction_status: 'pending', // 'failure', 'success', ''
  customer_details: {
    email: 'noreply@example.com',
    first_name: 'rifandnai',
    last_name: 'tri',
    phone: '+628224319933',
    shipping_address: {
      first_name: 'Budi',
      last_name: 'Susanto',
      email: 'budisusanto@example.com',
      phone: '0812345678910',
      address: 'Sudirman',
      city: 'Jakarta',
      postal_code: '12190',
      country_code: 'IDN',
    },
  },
  item_details: [
    {
      id: 'or4oq4FYkdM6gXRWNLGOqMKHA1H3',
      name: 'rosette cake',
      price: 100000,
      quantity: 2,
    },
    {
      id: 'or4oq4FYkdM6gXRWNLGOqMKHA1H3',
      name: 'macarons',
      price: 86000,
      quantity: 5,
    },
  ],
  transaction_details: {
    gross_amount: 100000 * 2 + 86000 * 5,
    order_id,
  },
  createdAt: '2020-11-06T09:21:15.364+00:00',
  updatedAt: '2020-11-06T09:21:15.364+00:00',
}

export default order
