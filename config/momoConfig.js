const momoConfig = {
    partnerCode: 'MOMO',
    accessKey: 'F8BBA842ECF85',
    secretKey: 'K951B6PE1waDMi640xX08PD3vg6EkVlz',
    requestType: 'payWithMethod',
    redirectUrl: 'http://localhost:5173/payment_return',
    ipnUrl: 'http://localhost:3000/api/order/momo_return',
    endpoint: 'https://test-payment.momo.vn/v2/gateway/api/create'
};

export default momoConfig;