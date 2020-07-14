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
      console.log(error);
      return res.status(400).json({
        error: 400,
        data: { message: 'Internal Server Error', description: error.message },
      });
    }
  }

  async delete(req, res) {
    try {
      const schema = Yup.object().shape({
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
