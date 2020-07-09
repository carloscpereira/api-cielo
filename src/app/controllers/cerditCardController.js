import * as Yup from 'yup';
// import axios from 'axios'
import { CreditCard } from '../../utils/Cielo';

class CerditCardController {
  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        MerchantOrderId: Yup.string().max(36),
        Authenticate: Yup.boolean(),
        IsCryptocurrencyNegotiation: Yup.boolean(),
        Capture: Yup.boolean(),
        Custumer: Yup.object().shape({
          Name: Yup.string(),
          Status: Yup.string().matches(/(NEW|EXISTING)/),
          Identity: Yup.string(),
          IdentityType: Yup.string(),
          Email: Yup.string().email(),
          Birthdate: Yup.date(),
          Address: Yup.object().shape({
            Street: Yup.string(),
            Number: Yup.string(),
            Complement: Yup.string(),
            ZipCode: Yup.string(),
            City: Yup.string(),
            State: Yup.string(),
            Country: Yup.string(),
          }),
        }),
        Installments: Yup.number().positive().integer(),
        SoftDescriptor: Yup.string().max(13),
        Amount: Yup.number().required(),
        CardNumber: Yup.string().max(19).required(),
        Holder: Yup.string().max(25).required(),
        ExpirationDate: Yup.string().required(),
        SecurityCode: Yup.string().max(4).required(),
      });

      if (!(await schema.isValid(req.body))) {
        try {
          await schema.validate(req.body);
        } catch (error) {
          return res.status(401).json({
            error: 401,
            data: { message: 'Validation fails', errors: error.errors },
          });
        }
      }

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

  async show(req, res) {
    try {
      const schema = Yup.object().shape({
        establishment: Yup.string().required(),
        paymentid: Yup.string().required(),
      });

      if (!(await schema.isValid(req.params))) {
        try {
          await schema.validate(req.params);
        } catch (error) {
          return res.status(401).json({
            error: 401,
            data: { message: 'Validation fails', errors: error.errors },
          });
        }
      }

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
      const schema = Yup.object().shape({
        establishment: Yup.string().required(),
        paymentid: Yup.string().required(),
      });

      if (!(await schema.isValid(req.params))) {
        try {
          await schema.validate(req.params);
        } catch (error) {
          return res.status(401).json({
            error: 401,
            data: { message: 'Validation fails', errors: error.errors },
          });
        }
      }

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
      console.log(error);
      return res.status(400).json({
        error: 400,
        data: { message: 'Internal Server Error', description: error.message },
      });
    }
  }

  async capture(req, res) {
    try {
      const schema = Yup.object().shape({
        establishment: Yup.string().required(),
        paymentid: Yup.string().required(),
      });

      if (!(await schema.isValid(req.params))) {
        try {
          await schema.validate(req.params);
        } catch (error) {
          return res.status(401).json({
            error: 401,
            data: { message: 'Validation fails', errors: error.errors },
          });
        }
      }

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
      console.log(error);
      return res.status(400).json({
        error: 400,
        data: { message: 'Internal Server Error', description: error.message },
      });
    }
  }
}

export default new CerditCardController();
