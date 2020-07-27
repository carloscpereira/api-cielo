import { CreditCard } from '../../utils/Cielo';

class CerditCardController {
  async store(req, res) {
    try {
      const {
        MerchantOrderId,
        Authenticate,
        IsCryptocurrencyNegotiation,
        Capture,
        Custumer,
        Installments,
        SoftDescriptor,
        Amount,
        CardNumber,
        Holder,
        ExpirationDate,
        SecurityCode,
      } = req.body;

      const data = {
        MerchantOrderId,
        Authenticate,
        IsCryptocurrencyNegotiation,
        Capture,
        Custumer,
        Installments,
        SoftDescriptor,
        Amount,
        CardNumber,
        Holder,
        ExpirationDate,
        SecurityCode,
      };

      const result = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const auth of req.cieloAuth) {
        const apiCielo = new CreditCard(auth.headers);
        // eslint-disable-next-line no-await-in-loop
        const response = await apiCielo.transaction(data);

        result.push({
          establishment: auth.establishment,
          cod: auth.cod,
          response,
        });

        if (parseInt(response.Payment.Status, 10) === 2) break;
      }

      return res.json({ error: null, data: { body: data, response: result } });
    } catch (error) {
      return res.status(400).json({
        error: 400,
        data: { message: 'Internal Server Error', description: error.message },
      });
    }
  }

  async delete(req, res) {
    try {
      const { paymentid } = req.params;

      const responses = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const auth of req.cieloAuth) {
        const apiCielo = new CreditCard(auth.headers);
        try {
          // eslint-disable-next-line no-await-in-loop
          const response = await apiCielo.cancellation({ id: paymentid });

          responses.push(response);

          if (
            parseInt(response.Status, 10) === 10 ||
            response.ReasonCode.toLowerCase() === 'successful'
          )
            break;
        } catch (err) {
          // console.log('status: ', err.response.status);
          // if (parseInt(err.response.status, 10) === 404) {
          //   console.log('entrei aqui');
          //   throw err;
          // }
          responses.push({ Status: err.response.status });
        }
      }

      console.log(responses);

      const result =
        responses.length === 1
          ? responses.shift()
          : responses.find((r) => parseInt(r.Status, 10) === 10);

      return res.json({
        error: null,
        data: result || {
          message: 'Não foi possível efetuar o cancelamento da parcela',
        },
      });
    } catch (error) {
      console.log(error.data);
      return res.status(400).json({
        error: 404,
        data: { message: 'Internal Server Error', description: error.message },
      });
    }
  }
}

export default new CerditCardController();
