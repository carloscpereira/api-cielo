const axios = require('axios');

class Cielo {
  constructor({ MerchantId = '', MerchantKey = '', RequestId = '' }) {
    this.isDev = process.env.NODE_ENV !== 'production';

    this.MerchantId = this.isDev
      ? '6aef4d18-cf82-4318-b59f-018d587d79dc'
      : MerchantId;
    this.MerchantKey = this.isDev
      ? 'OBKABVAHTDLQUFBQHGNPULQVLUJUXJWZJZLNYLJW'
      : MerchantKey;
    this.RequestId = RequestId;
    console.log(`Cielo is DEV: ${process.env.NODE_ENV !== 'production'}`);

    // baseUrl para requisições
    this.baseURL = this.isDev
      ? 'https://apisandbox.cieloecommerce.cielo.com.br'
      : 'https://api.cieloecommerce.cielo.com.br';

    // baseUrl para consultas
    this.baseUrlQuery = this.isDev
      ? 'https://apiquerysandbox.cieloecommerce.cielo.com.br'
      : 'https://apiquery.cieloecommerce.cielo.com.br/';

    const headers = {
      'Content-Type': 'application/json',
      MerchantId: this.MerchantId,
      MerchantKey: this.MerchantKey,
      ...(this.RequestId ? { RequestId: this.RequestId } : {}),
    };

    this.api = axios.create({
      baseURL: this.baseUrl,
      headers,
    });

    this.apiQuery = axios.create({
      baseURL: this.baseUrlQuery,
      headers,
    });
  }

  async getTransaction(id, type = 'PaymentId') {
    if (type.toLowerCase() !== 'paymentid') {
      const { data: response } = await this.apiQuery.get(
        `/1/sales?merchantOrderId=${id}`
      );

      return response;
    }

    const { data: response } = await this.apiQuery.get(`/1/sales/${id}`);

    return response;
  }
}

module.exports = Cielo;
