import { CreditCard } from '../../utils/Cielo';

class EstablishmentController {
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

      const { establishment: e } = req.params;

      const establishment = req.cieloAuth.find(
        (c) => parseInt(c.establishment, 10) === parseInt(e, 10)
      );

      if (!establishment) {
        return res
          .status(400)
          .json({ error: 400, data: { message: 'Property code not found' } });
      }

      const apiCielo = new CreditCard(establishment.headers);

      // eslint-disable-next-line no-await-in-loop
      const response = await apiCielo.transaction(data);

      return res.json({ error: null, data: { body: data, response } });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        error: 400,
        data: { message: 'Internal Server Error', description: err.message },
      });
    }
  }

  async show(req, res) {
    try {
      const { establishment, paymentid } = req.params;
      const auth = req.cieloAuth.find(
        (a) =>
          parseInt(a.cod, 10) === parseInt(establishment, 10) ||
          parseInt(a.establishment, 10) === parseInt(establishment, 10)
      );

      if (!auth) {
        return res
          .status(400)
          .json({ error: 400, data: { message: 'Property code not found' } });
      }

      const apiCielo = new CreditCard(auth.headers);

      const response = await apiCielo.getTransaction(paymentid);

      return res.json({ error: null, data: response });
    } catch (error) {
      return res.status(400).json({
        error: 400,
        data: { message: 'Internal Server Error', description: error.message },
      });
    }
  }

  async delete(req, res) {
    try {
      const { establishment, paymentid } = req.params;

      const auth = req.cieloAuth.find(
        (a) =>
          parseInt(a.cod, 10) === parseInt(establishment, 10) ||
          parseInt(a.establishment, 10) === parseInt(establishment, 10)
      );

      if (!auth) {
        return res
          .status(400)
          .json({ error: 400, data: { message: 'Property code not found' } });
      }

      const apiCielo = new CreditCard(auth.headers);
      const response = await apiCielo.cancellation({ id: paymentid });

      return res.json({
        error: null,
        data: response,
      });
    } catch (error) {
      console.log('data: ', error.request.connection.headers);
      return res.status(400).json({
        error: 400,
        data: { message: 'Internal Server Error', description: error.message },
      });
    }
  }

  async capture(req, res) {
    try {
      const { establishment, paymentid } = req.params;

      const auth = req.cieloAuth.find(
        (a) =>
          parseInt(a.cod, 10) === parseInt(establishment, 10) ||
          parseInt(a.establishment, 10) === parseInt(establishment, 10)
      );

      if (!auth) {
        return res
          .status(400)
          .json({ error: 400, data: { message: 'Property code not found' } });
      }

      const apiCielo = new CreditCard(auth.headers);
      const response = await apiCielo.capture(paymentid);

      return res.json({
        error: null,
        data: response,
      });
    } catch (error) {
      console.log(error.data);
      return res.status(400).json({
        error: 400,
        data: { message: 'Internal Server Error', description: error.message },
      });
    }
  }
}

export default new EstablishmentController();
