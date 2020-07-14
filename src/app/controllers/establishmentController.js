import * as Yup from 'yup';
import { CreditCard } from '../../utils/Cielo';

class EstablishmentController {
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
        ExpirationDate: Yup.string()
          // eslint-disable-next-line no-useless-escape
          .matches(/^(0?[1-9]|1[012])[\/\-]\d{4}$/gim, {
            message:
              'Invalid date format. Valid format for this field is MM/YYYY where the month must be between 1 and 12 and year with four digits',
            excludeEmptyString: false,
          })
          .required(),
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
      console.log('data: ', error.request.connection.headers);
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
      console.log(error.data);
      return res.status(400).json({
        error: 400,
        data: { message: 'Internal Server Error', description: error.message },
      });
    }
  }
}

export default new EstablishmentController();
