const MidtransClient = require('midtrans-client');

// Create Core API instance
const snap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: 'SB-Mid-server-Dc0hlGKVKqkh3-y7LTTvKARf',
  clientKey: 'SB-Mid-client-7GiXOKQvXG7nriAO',
});

// prepare Snap API parameter ( refer to: https://snap-docs.midtrans.com ) minimum parameter example:
let parameter = {
  transaction_details: {
    order_id: 'test-transaction-1234',
    gross_amount: 10000,
  },
  item_details: [
    {
      id: 'ITEM1',
      price: 10000,
      quantity: 1,
      name: 'Midtrans Bear',
      brand: 'Midtrans',
      category: 'Toys',
      merchant_name: 'Midtrans',
    },
  ],
  customer_details: {
    first_name: 'John',
    last_name: 'Watson',
    email: 'test@example.com',
    phone: '+628123456',
    billing_address: {
      first_name: 'John',
      last_name: 'Watson',
      email: 'test@example.com',
      phone: '081 2233 44-55',
      address: 'Sudirman',
      city: 'Jakarta',
      postal_code: '12190',
      country_code: 'IDN',
    },
    shipping_address: {
      first_name: 'John',
      last_name: 'Watson',
      email: 'test@example.com',
      phone: '0 8128-75 7-9338',
      address: 'Sudirman',
      city: 'Jakarta',
      postal_code: '12190',
      country_code: 'IDN',
    },
  },
  enabled_payments: [
    'credit_card',
    'mandiri_clickpay',
    'cimb_clicks',
    'bca_klikbca',
    'bca_klikpay',
    'bri_epay',
    'echannel',
    'indosat_dompetku',
    'mandiri_ecash',
    'permata_va',
    'bca_va',
    'bni_va',
    'other_va',
    'gopay',
    'kioson',
    'indomaret',
    'gci',
    'danamon_online',
  ],
  credit_card: {
    secure: true,
    bank: 'bca',
    installment: {
      required: false,
      terms: {
        bni: [3, 6, 12],
        mandiri: [3, 6, 12],
        cimb: [3],
        bca: [3, 6, 12],
        offline: [6, 12],
      },
    },
    whitelist_bins: ['48111111', '41111111'],
  },
  bca_va: {
    va_number: '12345678911',
    free_text: {
      inquiry: [
        {
          en: 'text in English',
          id: 'text in Bahasa Indonesia',
        },
      ],
      payment: [
        {
          en: 'text in English',
          id: 'text in Bahasa Indonesia',
        },
      ],
    },
  },
  bni_va: {
    va_number: '12345678',
  },
  permata_va: {
    va_number: '1234567890',
    recipient_name: 'SUDARSONO',
  },
  callbacks: {
    finish: 'https://demo.midtrans.com',
  },
  expiry: {
    start_time: '2025-12-20 18:11:08 +0700',
    unit: 'minute',
    duration: 9000,
  },
  custom_field1: 'custom field 1 content',
  custom_field2: 'custom field 2 content',
  custom_field3: 'custom field 3 content',
};

// create transaction
snap
  .createTransaction(parameter)
  .then((transaction) => {
    // transaction token
    let transactionToken = transaction.token;
    console.log('transactionToken:', transactionToken);

    // transaction redirect url
    let transactionRedirectUrl = transaction.redirect_url;
    console.log('transactionRedirectUrl:', transactionRedirectUrl);
  })
  .catch((e) => {
    console.error(e);
  });

// transaction is object representation of API JSON response
// sample:
// {
// 'redirect_url': 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f0a2cbe7-dfb7-4114-88b9-1ecd89e90121',
// 'token': 'f0a2cbe7-dfb7-4114-88b9-1ecd89e90121'
// }
