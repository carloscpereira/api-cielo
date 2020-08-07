/* eslint-disable prefer-const */
// const moment = require('moment');

const Cielo = require('./Cielo');
const { searchFlag, toCorrectSize } = require('./helpers');

class CreditCard extends Cielo {
  constructor({ MerchantId, MerchantKey, RequestId }) {
    super({ MerchantId, MerchantKey, RequestId });
  }

  async transaction(data) {
    let {
      MerchantOrderId = null,
      Amount = null,
      Authenticate = false,
      Capture = true,
      Custumer = null,
      Installments = 1,
      SoftDescriptor = null,
      CardNumber = null,
      Holder = null,
      ExpirationDate = null,
      SecurityCode = null,
    } = data;

    CardNumber = CardNumber.replace(/\D/g, '');
    Holder = Holder.toUpperCase();
    SecurityCode = toCorrectSize(SecurityCode.replace(/\D/g, ''), 3);

    // Testa se todos parâmetros obrigatórios estão preenchidos
    if (!Amount || !CardNumber || !Holder || !ExpirationDate || !SecurityCode) {
      throw new Error(
        `É necessário enviar os parametros: Amount, CardNumber, Holder, ExpirationDate, SecurityCode. Para efetuar a transação de pagamento`
      );
    }

    if (!MerchantOrderId) {
      const date = new Date();

      MerchantOrderId = date.getTime();
    }
    // console.log(ExpirationDate);
    // if (!moment(new Date(ExpirationDate)).isValid()) {
    //   throw new Error(
    //     `É necessário informar uma data válida para o prazo de vencimento`
    //   );
    // }

    // ExpirationDate = moment(new Date(ExpirationDate)).format('MM/YYYY');

    const flag = searchFlag(CardNumber);

    // Testa se a bandeira do cartão informado é suportada pelo app da Cielo
    if (!flag || !flag.cashCredit) {
      throw new Error(
        `Bandeira de cartão não suportada pelo app da Cielo para pagamentos em Crédito`
      );
    }

    // Testa se a bandeira do cartão informado possibilita o parcelamento de valores
    if (Installments > 1 && !flag.installmentCredit) {
      throw new Error(
        `Bandeira não permite o parcelamento de valor no app da Cielo`
      );
    }

    const body = {
      MerchantOrderId,
      ...(Custumer ? { Custumer } : {}),
      Payment: {
        Installments,
        Type: 'CreditCard',
        Amount: Amount * 100,
        ...(this.isDev ? { Provider: 'Simulado' } : {}),
        Capture,
        Currency: 'BRL',
        Authenticate,
        ...(SoftDescriptor ? { SoftDescriptor } : {}),
        CreditCard: {
          ...(this.isDev ? { CardNumber: '4024007197692931' } : { CardNumber }),
          Holder,
          ExpirationDate,
          SecurityCode,
          Brand: flag.cod,
        },
      },
    };
    const { data: response } = await this.api.post('/1/sales', body, {
      baseURL: this.baseURL,
    });

    return response;
  }

  async capture(paymentId = null, amount = null) {
    if (!paymentId) {
      throw new Error(
        `É necessário informar o PaymentID da transação para efetuar a captura`
      );
    }

    if (!amount) {
      const { data: response } = await this.api.put(
        `/1/sales/${paymentId}/capture`,
        null,
        {
          baseURL: this.baseURL,
        }
      );

      return response;
    }

    const {
      data: response,
    } = await this.api.put(
      `/1/sales/${paymentId}/capture?amount=${amount}`,
      null,
      { baseURL: this.baseURL }
    );

    return response;
  }

  async cancellation(data) {
    const { id = null, type = 'PaymentId', amount = null } = data;

    if (!id) {
      throw new Error(
        `Você precisa informar o id (PaymentID / MerchantOrderId) para efetuar o cancelamento`
      );
    }

    if (type.toLowerCase() !== 'paymentid') {
      const { data: response } = await this.api.put(
        `/1/sales/OrderId/${id}/void`,
        null,
        {
          query: { ...(amount ? { amount } : {}) },
          baseURL: this.baseURL,
        }
      );

      return response;
    }

    const { data: response } = await this.api.put(`/1/sales/${id}/void`, null, {
      query: { ...(amount ? { amount } : {}) },
      baseURL: this.baseURL,
    });

    return response;
  }
}

module.exports = { CreditCard };
