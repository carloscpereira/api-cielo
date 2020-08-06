import App from './app';

require('dotenv/config');

const port = process.env.SERVER_PORT || '4000';

App.listen(port, () => {
  console.log(
    `Servidor iniciado na porta ${port}. Environment ${process.env.NODE_ENV}`
  );
});
