const moment = require('moment');
const Cielo = require('./Cielo');
const { banksBoletos } = require('./helpers');

class Boleto extends Cielo {
  constructor({
    MerchantId,
    MerchantKey,
    RequestId,
    CompanyAdress,
    CompanyIdentification,
    CompanyName,
  }) {
    super({ MerchantId, MerchantKey, RequestId });

    this.Assignor = process.env.CIELO_BOLETO_ASSIGNOR || CompanyName;
    this.Address = process.env.CIELO_BOLETO_ADDRESS || CompanyAdress;
    this.Identification =
      process.env.CIELO_BOLETO_IDENTIFICATION || CompanyIdentification;
  }

  async transaction(data) {
    const {
      MerchantOrderId = null,
      Customer: {
        Name = null,
        Address: {
          Complement = null,
          ZipCode = null,
          Country = null,
          State = null,
          City = null,
          District = null,
          Street = null,
          Number: AddressNumber = null,
        },
      },
      Amount = null,
      Provider = 'BancoDoBrasil2',
      BoletoNumber = null,
      Demonstrative = null,
      ExpirationDate = null,
      Instructions = null,
    } = data;

    const bank = banksBoletos.find(
      (b) => b.provider.toLocaleLowerCase() === Provider.toLocaleLowerCase()
    );

    if (!bank) {
      throw new Error(
        `Provider informado incorreto. Informe BancoDoBrasil2 para Banco do Brasil e Bradesco2 para Bradesco`
      );
    }

    if (!Name || Name.length > bank.length.Name) {
      throw new Error(
        `O nome do comprador não existe ou excede o tamanho para o provider informado. Tamanho limite ${bank.length.Name}`
      );
    }

    if (
      !ZipCode ||
      !Country ||
      !State ||
      !City ||
      !District ||
      !Street ||
      !AddressNumber
    ) {
      throw new Error(
        `É necessário informar todos os dados do endereço do comprador para gerar um boleto`
      );
    }

    if (ZipCode.length > 9) {
      throw new Error(
        `O CEP informado excede o limite aceito pelo Provider escolhido`
      );
    }

    if (Country.length > 35) {
      throw new Error(
        `O nome do país excede o limite de carácteres aceito pelo Provider escolhido.`
      );
    }

    if (State.length > 2) {
      throw new Error('Informe apenas a sigla do estado com 2 digitos');
    }

    if (City.length > bank.length.City) {
      throw new Error(
        `O nome da cidade excedeu os limites de carácteres aceitos pelo Provider  (${bank.length.City})`
      );
    }

    if (District.length > 50) {
      throw new Error(
        `O bairro excedeu o limite de carácteres aceitos pelo provider`
      );
    }

    if (Street.length > bank.length.Street) {
      throw new Error(
        `O endereço execedeu o limite de carácteres aceitos pelo Provider (${bank.length.Street})`
      );
    }

    if (AddressNumber.length > bank.length.Number) {
      throw new Error(
        `O número da residencia excedeu o limite de caracteres aceitos pelo Provider (${bank.length.Street})`
      );
    }

    if (!Amount) {
      throw new Error(`É necessário que informe um valor para o boleto`);
    }

    if (BoletoNumber && BoletoNumber.length > bank.length.BoletoNumber) {
      throw new Error(
        `O número do boleto excedeu o número de caracteres permitidos pelo Provider escolhido (${bank.length.BoletoNumber})`
      );
    }

    if (ExpirationDate && !moment(ExpirationDate).isValid()) {
      throw new Error(`Formato de data de validade inválido`);
    }

    if (
      MerchantOrderId &&
      MerchantOrderId.length > bank.length.MerchantOrderId
    ) {
      throw new Error(
        `O MerchantOrderId informado excede o número de carácteres aceitos pelo Provider (${bank.length.MerchantOrderId})`
      );
    }

    const body = {
      MerchantOrderId,
      Customer: {
        Name,
        Status: 'NEW',
        Address: {
          Street,
          Number: AddressNumber,
          ...(Complement ? { Complement } : {}),
          ZipCode,
          District,
          City,
          State,
          Country,
        },
      },
      Payment: {
        Type: 'Boleto',
        Amount: Amount * 100,
        Provider: bank.provider,
        ...(Demonstrative ? { Demonstrative } : {}),
        ...(Instructions ? { Instructions } : {}),
        ...(this.Identification ? { Identification: this.Identification } : {}),
        ...(ExpirationDate ? { ExpirationDate } : {}),
        ...(this.Address ? { Address: this.Address } : {}),
        ...(this.Assignor ? { Address: this.Assignor } : {}),
        ...(BoletoNumber ? { BoletoNumber } : {}),
      },
    };

    const { data: response } = this.api.post(`/1/sales/`, body);

    return response;
  }
}

module.exports = { Boleto };
