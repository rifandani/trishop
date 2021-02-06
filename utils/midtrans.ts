import MidtransClient from 'midtrans-client';

// Create Core API instance
const snap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

// prepare Snap API parameter ( refer to: https://snap-docs.midtrans.com ) minimum parameter example:
let parameter = {
  transaction_details: {
    order_id: 'test-transaction-123',
    gross_amount: 200000,
  },
  credit_card: {
    secure: true,
  },
};

// create transaction
snap
  .createTransaction(parameter)
  .then((transaction: any) => {
    // transaction token
    let transactionToken = transaction.token;
    console.log('transactionToken:', transactionToken);

    // transaction redirect url
    let transactionRedirectUrl = transaction.redirect_url;
    console.log('transactionRedirectUrl:', transactionRedirectUrl);
  })
  .catch((e: any) => {
    console.log('Error occured:', e.message);
  });

// transaction is object representation of API JSON response
// sample:
// {
// 'redirect_url': 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f0a2cbe7-dfb7-4114-88b9-1ecd89e90121',
// 'token': 'f0a2cbe7-dfb7-4114-88b9-1ecd89e90121'
// }
