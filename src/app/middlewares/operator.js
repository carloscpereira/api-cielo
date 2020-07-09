import * as Yup from 'yup';
import authCielo from '../../config/authCielo';

require('dotenv/config');

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    operator: Yup.string()
      .lowercase()
      .matches(/(atemde|idental)/g)
      .required(),
  });

  if (!(await schema.isValid(req.params))) {
    try {
      await schema.validate(req.params);
    } catch (err) {
      return res.status(401).json({
        error: 401,
        data: {
          message: 'Operator is required, and must be between atemde e idental',
          errors: err.errors,
        },
      });
    }
  }

  const { operator } = req.params;

  req.cieloAuth = authCielo[operator].auth;

  return next();
};
