const Cielo = require('./Cielo');

const { searchFlag } = require('./helpers');

class DebitCard extends Cielo {
  constructor({ MerchantId, MerchantKey, RequestId }) {
    super({ MerchantId, MerchantKey, RequestId });
  }

  async auth(data) {
    const {
      MerchantOrderId = null,
      Custumer = null,
      Amount = null,
      Installments = 1,
      Authenticate = true,
      Cavv = null,
      Xid = null,
      Eci = null,
      CardNumber = null,
      Holder = null,
      SoftDescriptor = null,
      ReturnUrl = null,
      ExpirationDate = null,
      SecurityCode = null,
    } = data;

    if (
      !Amount ||
      !Cavv ||
      !Xid ||
      !Eci ||
      !CardNumber ||
      !Holder ||
      !ExpirationDate ||
      !SecurityCode
    ) {
      throw new Error(
        `É necessário enviar os parâmetros: Amount, Cavv, Xid, Eci, CardNumber, Holder, ExpirationDate, SecurityCode. Para realizar uma autenticação`
      );
    }

    const flag = searchFlag(CardNumber);

    if (!flag || !flag.debit) {
      throw new Error(
        `Bandeira de cartão não suportada pelo app da Cielo para pagamentos em Débito`
      );
    }

    if (Installments > 1 && !flag.installmentCredit) {
      throw new Error(
        `Bandeira não permite o parcelamento de valor no app da Cielo`
      );
    }

    const body = {
      MerchantOrderId,
      ...(Custumer ? { Custumer } : {}),
      Payment: {
        Type: 'CreditCard',
        Amount: Amount * 100,
        Installments,
        Authenticate,
        ...(SoftDescriptor ? { SoftDescriptor } : {}),
        ...(ReturnUrl ? { ReturnUrl } : {}),
        CreditCard: {
          CardNumber,
          Holder,
          ExpirationDate,
          SecurityCode,
          Brand: flag.cod,
        },
        ExternalAuthentication: {
          Cavv,
          Xid,
          Eci,
        },
      },
    };

    const { data: response } = await this.api.post(`/1/sales/`, body);

    return response;
  }

  async transaction(data) {
    const {
      MerchantOrderId,
      Custumer,
      Amount,
      Authenticate = true,
      ReturnUrl = null,
      IsCryptocurrencyNegotiation = false,
      CardNumber = null,
      Holder = null,
      ExpirationDate = null,
      SecurityCode = null,
    } = data;

    if (!CardNumber || !Holder || !ExpirationDate || !SecurityCode) {
      throw new Error(
        `Você deve informar todos os dados do cartão de débito (CardNumber, Holder, ExpirationDate, SecurityCode)`
      );
    }

    if (!Authenticate) {
      throw new Error(`Para transações em Débito, deverá haver autenticação`);
    }

    if (ReturnUrl) {
      throw new Error(
        `É necessário informar a url para onde o usuário será redirecionado quando efetuar a autenticação`
      );
    }

    if (!Amount) {
      throw new Error(`Informa o valor da transação`);
    }

    const flag = searchFlag(CardNumber);

    if (!flag || !flag.debit) {
      throw new Error(
        `Bandeira de cartão não suportada pelo app da Cielo para pagamentos em Débito`
      );
    }

    const body = {
      MerchantOrderId,
      ...(Custumer ? { Custumer } : {}),
      Payment: {
        Type: 'DebitCard',
        Authenticate,
        Amount: Amount * 100,
        ReturnUrl,
        DebitCard: {
          CardNumber,
          Holder,
          ExpirationDate,
          SecurityCode,
          Brand: flag.cod,
        },
        IsCryptocurrencyNegotiation,
      },
    };

    const { data: response } = await this.api.post(`/1/sales/`, body);

    return response;
  }
}

module.exports = { DebitCard };
