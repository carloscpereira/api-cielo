import * as Yup from 'yup';

export default async (req, res, next) => {
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
      Holder: Yup.string().max(255),
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

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.status(400).json({
      error: 401,
      data: { error: 'Validation fails', messages: error.inner },
    });
  }
};
