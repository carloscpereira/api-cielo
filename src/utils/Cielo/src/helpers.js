const flags = [
  {
    flag: 'Visa',
    cod: 'Visa',
    cashCredit: true,
    installmentCredit: true,
    debit: true,
    bankDebit: ['Bradesco', 'Banco do Brasil', 'Santander', 'Itaú', 'CitiBank'],
    voucher: false,
    international: true,
    regex: /^4\d{12}(\d{3})?$/,
  },
  {
    flag: 'Master Card',
    cod: 'Master',
    cashCredit: true,
    installmentCredit: true,
    debit: true,
    bankDebit: [
      'Bradesco',
      'Banco do Brasil',
      'Santander',
      'Itaú',
      'CitiBank',
      'BRB',
      'Caixa',
      'BancooB',
    ],
    voucher: false,
    international: true,
    regex: /^(5[1-5]\d{4}|677189)\d{10}$/,
  },
  {
    flag: 'American Express',
    cod: 'Amex',
    cashCredit: true,
    installmentCredit: true,
    debit: false,
    bankDebit: null,
    voucher: false,
    international: true,
    regex: /^3[47]\d{13}$/,
  },
  {
    flag: 'Elo',
    cod: 'Elo',
    cashCredit: true,
    installmentCredit: true,
    debit: false,
    bankDebit: null,
    voucher: false,
    international: true,
    regex: /^(40117[8-9]|431274|438935|451416|457393|45763[1-2]|506(699|7[0-6][0-9]|77[0-8])|509\d{3}|504175|627780|636297|636368|65003[1-3]|6500(3[5-9]|4[0-9]|5[0-1])|6504(0[5-9]|[1-3][0-9])|650(4[8-9][0-9]|5[0-2][0-9]|53[0-8])|6505(4[1-9]|[5-8][0-9]|9[0-8])|6507(0[0-9]|1[0-8])|65072[0-7]|6509(0[1-9]|1[0-9]|20)|6516(5[2-9]|[6-7][0-9])|6550([0-1][0-9]|2[1-9]|[3-4][0-9]|5[0-8]))/,
  },
  {
    flag: 'Diners Club',
    cod: 'Diners',
    cashCredit: true,
    installmentCredit: true,
    debit: false,
    bankDebit: null,
    voucher: false,
    international: true,
    regex: /^3(0[0-5]|[68]\d)\d{11}$/,
  },
  {
    flag: 'Discover',
    cod: 'Discover',
    cashCredit: true,
    installmentCredit: false,
    debit: false,
    bankDebit: null,
    voucher: false,
    international: true,
    regex: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
  },
  {
    flag: 'JCB',
    cod: 'JCB',
    cashCredit: true,
    installmentCredit: true,
    debit: false,
    bankDebit: null,
    voucher: false,
    international: true,
    regex: /^(?:2131|1800|35\d{3})\d{11}$/,
  },
  {
    flag: 'Aura',
    cod: 'Aura',
    cashCredit: true,
    installmentCredit: true,
    debit: false,
    bankDebit: null,
    voucher: false,
    international: true,
    regex: /^(5078\d{2})(\d{2})(\d{11})$/,
  },
  {
    flag: 'Hipercard',
    cod: 'Hipercard',
    cashCredit: true,
    installmentCredit: true,
    debit: false,
    bankDebit: null,
    voucher: false,
    international: false,
    regex: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
  },
  {
    flag: 'Hiper',
    cod: 'Hiper',
    cashCredit: true,
    installmentCredit: true,
    debit: false,
    bankDebit: null,
    voucher: false,
    international: false,
    regex: /^((637095)|(637568)|(637599)|(637609)|(637612)\d{10}(\d{3})?)|(3841\d{15})/,
  },
];

const banksBoletos = [
  {
    name: 'Bradesco',
    provider: 'Bradesco2',
    length: {
      MerchantOrderId: 27,
      BoletoNumber: 11,
      Name: 34,
      Street: 70,
      Complement: 20,
      Number: 10,
      District: 50,
      City: 50,
      Instructions: 255,
      Demonstrative: 255,
    },
  },
  {
    name: 'Banco do Brasil',
    provider: 'BancoDoBrasil2',
    length: {
      MerchantOrderId: 50,
      BoletoNumber: 9,
      Name: 60,
      Street: 70,
      Complement: 20,
      Number: 10,
      District: 50,
      City: 18,
      Instructions: 255,
      Demonstrative: null,
    },
  },
];

const statusCodeError = {
  0: {
    message: 'Internal error',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  100: {
    message: 'RequestId is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  101: {
    message: 'MerchantId is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  102: {
    message: 'Payment Type is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  103: {
    message: 'Payment Type can only contain letters',
    desc: 'Caracteres especiais não permitidos',
  },
  104: {
    message: 'Customer Identity is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  105: {
    message: 'Customer Name is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  106: {
    message: 'Transaction ID is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  107: {
    message: 'OrderId is invalid or does not exists',
    desc: 'Campo enviado excede o tamanho ou contem caracteres especiais',
  },
  108: {
    message: 'Amount must be greater or equal to zero',
    desc: 'Valor da transação deve ser maior que “0”',
  },
  109: {
    message: 'Payment Currency is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  110: {
    message: 'Invalid Payment Currency',
    desc: 'Campo enviado está vazio ou inválido',
  },
  111: {
    message: 'Payment Country is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  112: {
    message: 'Invalid Payment Country',
    desc: 'Campo enviado está vazio ou inválido',
  },
  113: {
    message: 'Invalid Payment Code',
    desc: 'Campo enviado está vazio ou inválido',
  },
  114: {
    message: 'The provided MerchantId is not in correct format',
    desc: 'O MerchantId enviado não é um GUID',
  },
  115: {
    message: 'The provided MerchantId was not found',
    desc: 'O MerchantID não existe ou pertence a outro ambiente (EX: Sandbox)',
  },
  116: {
    message: 'The provided MerchantId is blocked',
    desc: 'Loja bloqueada, entre em contato com o suporte Cielo',
  },
  117: {
    message: 'Credit Card Holder is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  118: {
    message: 'Credit Card Number is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  119: {
    message: 'At least one Payment is required',
    desc: 'Nó “Payment” não enviado',
  },
  120: {
    message: 'Request IP not allowed. Check your IP White List',
    desc: 'IP bloqueado por questões de segurança',
  },
  121: {
    message: 'Customer is required',
    desc: 'Nó “Customer” não enviado',
  },
  122: {
    message: 'MerchantOrderId is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  123: {
    message: 'Installments must be greater or equal to one',
    desc: 'Numero de parcelas deve ser superior a 1',
  },
  124: {
    message: 'Credit Card is Required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  125: {
    message: 'Credit Card Expiration Date is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  126: {
    message: 'Credit Card Expiration Date is invalid',
    desc: 'Campo enviado está vazio ou inválido',
  },
  127: {
    message: 'You must provide CreditCard Number',
    desc: 'Numero do cartão de crédito é obrigatório',
  },
  128: {
    message: 'Card Number length exceeded',
    desc: 'Numero do cartão superiro a 16 digitos',
  },
  129: {
    message: 'Affiliation not found',
    desc: 'Meio de pagamento não vinculado a loja ou Provider inválido',
  },
  130: {
    message: 'Could not get Credit Card',
    desc: '',
  },
  131: {
    message: 'MerchantKey is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  132: {
    message: 'MerchantKey is invalid',
    desc: 'O Merchantkey enviado não é um válido',
  },
  133: {
    message: 'Provider is not supported for this Payment Type',
    desc: 'Provider enviado não existe',
  },
  134: {
    message: 'FingerPrint length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  135: {
    message: 'MerchantmessageinedFieldValue length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  136: {
    message: 'ItemDataName length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  137: {
    message: 'ItemDataSKU length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  138: {
    message: 'PassengerDataName length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  139: {
    message: 'PassengerDataStatus length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  140: {
    message: 'PassengerDataEmail length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  141: {
    message: 'PassengerDataPhone length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  142: {
    message: 'TravelDataRoute length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  143: {
    message: 'TravelDataJourneyType length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  144: {
    message: 'TravelLegDataDestination length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  145: {
    message: 'TravelLegDataOrigin length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  146: {
    message: 'SecurityCode length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  147: {
    message: 'Address Street length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  148: {
    message: 'Address Number length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  149: {
    message: 'Address Complement length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  150: {
    message: 'Address ZipCode length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  151: {
    message: 'Address City length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  152: {
    message: 'Address State length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  153: {
    message: 'Address Country length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  154: {
    message: 'Address District length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  155: {
    message: 'Customer Name length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  156: {
    message: 'Customer Identity length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  157: {
    message: 'Customer IdentityType length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  158: {
    message: 'Customer Email length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  159: {
    message: 'ExtraData Name length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  160: {
    message: 'ExtraData Value length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  161: {
    message: 'Boleto Instructions length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  162: {
    message: 'Boleto Demostrative length exceeded',
    desc: 'Dado enviado excede o tamanho do campo',
  },
  163: {
    message: 'Return Url is required',
    desc:
      'URL de retorno não é valida - Não é aceito paginação ou extenções (EX .PHP) na URL de retorno',
  },
  166: {
    message: 'AuthorizeNow is required',
    desc: '',
  },
  167: {
    message: 'Antifraud not configured',
    desc: 'Antifraude não vinculado ao cadastro do lojista',
  },
  168: {
    message: 'Recurrent Payment not found',
    desc: 'Recorrência não encontrada',
  },
  169: {
    message: 'Recurrent Payment is not active',
    desc: 'Recorrência não está ativa. Execução paralizada',
  },
  170: {
    message: 'Cartão Protegido not configured',
    desc: 'Cartão protegido não vinculado ao cadastro do lojista',
  },
  171: {
    message: 'Affiliation data not sent',
    desc:
      'Falha no processamento do pedido - Entre em contato com o suporte Cielo',
  },
  172: {
    message: 'Credential Code is required',
    desc: 'Falha na validação das credenciadas enviadas',
  },
  173: {
    message: 'Payment method is not enabled',
    desc: 'Meio de pagamento não vinculado ao cadastro do lojista',
  },
  174: {
    message: 'Card Number is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  175: {
    message: 'EAN is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  176: {
    message: 'Payment Currency is not supported',
    desc: 'Campo enviado está vazio ou inválido',
  },
  177: {
    message: 'Card Number is invalid',
    desc: 'Campo enviado está vazio ou inválido',
  },
  178: {
    message: 'EAN is invalid',
    desc: 'Campo enviado está vazio ou inválido',
  },
  179: {
    message:
      'The max number of installments allowed for recurring payment is 1',
    desc: 'Campo enviado está vazio ou inválido',
  },
  180: {
    message: 'The provided Card PaymentToken was not found',
    desc: 'Token do Cartão protegido não encontrado',
  },
  181: {
    message: 'The MerchantIdJustClick is not configured',
    desc: 'Token do Cartão protegido bloqueado',
  },
  182: {
    message: 'Brand is required',
    desc: 'Bandeira do cartão não enviado',
  },
  183: {
    message: 'Invalid customer bithdate',
    desc: 'Data de nascimento inválida ou futura',
  },
  184: {
    message: 'Request could not be empty',
    desc: 'Falha no formado da requisição. Verifique o código enviado',
  },
  185: {
    message: 'Brand is not supported by selected provider',
    desc: 'Bandeira não suportada pela API Cielo',
  },
  186: {
    message:
      'The selected provider does not support the options provided (Capture, Authenticate, Recurrent or Installments)',
    desc: 'Meio de pagamento não suporta o comando enviado',
  },
  187: {
    message: 'ExtraData Collection contains one or more duplicated names',
    desc: '',
  },
  188: {
    message: 'Avs with CPF invalid',
    desc: '',
  },
  189: {
    message: 'Avs with length of street exceeded',
    desc: '',
  },
  190: {
    message: 'Avs with length of number exceeded',
    desc: '',
  },
  191: {
    message: 'Avs with length of district exceeded',
    desc: '',
  },
  192: {
    message: 'Avs with zip code invalid',
    desc: '',
  },
  193: {
    message: 'Split Amount must be greater than zero',
    desc: '',
  },
  194: {
    message: 'Split Establishment is Required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  195: {
    message: 'The PlataformId is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  196: {
    message: 'DeliveryAddress is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  197: {
    message: 'Street is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  198: {
    message: 'Number is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  199: {
    message: 'ZipCode is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  200: {
    message: 'City is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  201: {
    message: 'State is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  202: {
    message: 'District is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  203: {
    message: 'Cart item Name is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  204: {
    message: 'Cart item Quantity is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  205: {
    message: 'Cart item type is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  206: {
    message: 'Cart item name length exceeded',
    desc: '',
  },
  207: {
    message: 'Cart item description length exceeded',
    desc: '',
  },
  208: {
    message: 'Cart item sku length exceeded',
    desc: '',
  },
  209: {
    message: 'Shipping addressee sku length exceeded',
    desc: '',
  },
  210: {
    message: 'Shipping data cannot be null',
    desc: '',
  },
  211: {
    message: 'WalletKey is invalid',
    desc: '',
  },
  212: {
    message: 'Merchant Wallet Configuration not found',
    desc: '',
  },
  213: {
    message: 'Credit Card Number is invalid',
    desc: '',
  },
  214: {
    message: 'Credit Card Holder Must Have Only Letters',
    desc: '',
  },
  215: {
    message: 'Agency is required in Boleto Credential',
    desc: '',
  },
  216: {
    message: 'Customer IP address is invalid',
    desc: '',
  },
  300: {
    message: 'MerchantId was not found',
    desc: '',
  },
  301: {
    message: 'Request IP is not allowed',
    desc: '',
  },
  302: {
    message: 'Sent MerchantOrderId is duplicated',
    desc: '',
  },
  303: {
    message: 'Sent OrderId does not exist',
    desc: '',
  },
  304: {
    message: 'Customer Identity is required',
    desc: 'Campo enviado está vazio ou inválido',
  },
  306: {
    message: 'Merchant is blocked',
    desc: 'Merchant está bloqueado',
  },
  307: {
    message: 'Transaction not found',
    desc: '',
  },
  308: {
    message: 'Transaction not available to capture',
    desc: '',
  },
  309: {
    message: 'Transaction not available to void',
    desc: '',
  },
  310: {
    message: 'Payment method doest not support this operation',
    desc: '',
  },
  311: {
    message: 'Refund is not enabled for this merchant',
    desc: '',
  },
  312: {
    message: 'Transaction not available to refund',
    desc: '',
  },
  313: {
    message: 'Recurrent Payment not found',
    desc: '',
  },
  314: {
    message: 'Invalid Integration',
    desc: '',
  },
  315: {
    message: 'Cannot change NextRecurrency with pending payment',
    desc: '',
  },
  316: {
    message: 'Cannot set NextRecurrency to past date',
    desc: '',
  },
  317: {
    message: 'Invalid Recurrency Day',
    desc: '',
  },
  318: {
    message: 'No transaction found',
    desc: '',
  },
  319: {
    message: 'Smart recurrency is not enabled',
    desc: '',
  },
  320: {
    message:
      'Can not Update Affiliation Because this Recurrency not Affiliation saved',
    desc: '',
  },
  321: {
    message: 'Can not set EndDate to before next recurrency',
    desc: '',
  },
  322: {
    message: 'Zero Dollar Auth is not enabled',
    desc: '',
  },
  323: {
    message: 'Bin Query is not enabled',
    desc: '',
  },
};

const statusCodeTransactional = {
  0: {
    status: 'NotFinished',
    paymentMethod: ['ALL'],
    desc: 'Aguardando atualização de status',
  },
  1: {
    status: 'Authorized',
    paymentMethod: ['ALL'],
    desc: 'Pagamento apto a ser capturado ou messageinido como pago',
  },
  2: {
    status: 'PaymentConfirmed',
    paymentMethod: ['ALL'],
    desc: 'Pagamento confirmado e finalizado',
  },
  3: {
    status: 'Denied',
    paymentMethod: ['CC', 'CD', 'TF'],
    desc: 'Pagamento negado por Autorizador',
  },
  10: {
    status: 'Voided',
    paymentMethod: ['ALL'],
    desc: 'Pagamento cancelado',
  },
  11: {
    status: 'Refunded',
    paymentMethod: ['CC', 'CD'],
    desc: 'Pagamento cancelado após 23:59 do dia de autorização',
  },
  12: {
    status: 'Pending',
    paymentMethod: ['ALL'],
    desc: 'Aguardando Status de instituição financeira',
  },
  13: {
    status: 'Aborted',
    paymentMethod: ['ALL'],
    desc: 'Pagamento cancelado por falha no processamento ou por ação do AF',
  },
  20: {
    status: 'Scheduled',
    paymentMethod: ['CC'],
    desc: 'Recorrência agendada',
  },
};

const codReturn = {
  0: {
    message: 'Dados Inválidos',
    desc: 'Verifique se todos os campos estão preenchidos corretamente',
    action: 'Verifique se todos os campos estão preenchidos corretamente',
    repeat: 'Não',
  },
  '00': {
    message: 'Transação autorizada com sucesso.',
    desc: 'Transação autorizada com sucesso.',
    action: 'Transação autorizada com sucesso.',
    repeat: 'Não',
  },

  '01': {
    message: 'Transação não autorizada. Transação referida.',
    desc:
      'Transação não autorizada. Referida (suspeita de fraude) pelo banco emissor.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '02': {
    message: 'Transação não autorizada. Transação referida.',
    desc:
      'Transação não autorizada. Referida (suspeita de fraude) pelo banco emissor.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '03': {
    message:
      'Transação não permitida. Erro no cadastramento do código do estabelecimento no arquivo de configuração do TEF',
    desc:
      'Transação não permitida. Estabelecimento inválido. Entre com contato com a Cielo.',
    action:
      'Não foi possível processar a transação. Entre com contato com a Loja Virtual.',
    repeat: 'Não',
  },

  '04': {
    message: 'Transação não autorizada. Cartão bloqueado pelo banco emissor.',
    desc: 'Transação não autorizada. Cartão bloqueado pelo banco emissor.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '05': {
    message: 'Transação não autorizada. Cartão inadimplente (Do not honor).',
    desc:
      'Transação não autorizada. Não foi possível processar a transação. Questão relacionada a segurança, inadimplencia ou limite do portador.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  '06': {
    message: 'Transação não autorizada. Cartão cancelado.',
    desc:
      'Transação não autorizada. Não foi possível processar a transação. Cartão cancelado permanentemente pelo banco emissor.',
    action:
      'Não foi possível processar a transação. Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '07': {
    message: 'Transação negada. Reter cartão condição especial',
    desc: 'Transação não autorizada por regras do banco emissor.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor',
    repeat: 'Não',
  },

  '08': {
    message: 'Transação não autorizada. Código de segurança inválido.',
    desc:
      'Transação não autorizada. Código de segurança inválido. Oriente o portador a corrigir os dados e tentar novamente.',
    action:
      'Transação não autorizada. Dados incorretos. Reveja os dados e informe novamente.',
    repeat: 'Não',
  },

  '09': {
    message: 'Transação cancelada parcialmente com sucesso.',
    desc: 'Transação cancelada parcialmente com sucesso',
    action: 'Transação cancelada parcialmente com sucesso',
    repeat: 'Não',
  },

  '11': {
    message: 'Transação autorizada com sucesso para cartão emitido no exterior',
    desc: 'Transação autorizada com sucesso.',
    action: 'Transação autorizada com sucesso.',
    repeat: 'Não',
  },

  '12': {
    message: 'Transação inválida, erro no cartão.',
    desc:
      'Não foi possível processar a transação. Solicite ao portador que verifique os dados do cartão e tente novamente.',
    action:
      'Não foi possível processar a transação. reveja os dados informados e tente novamente. Se o erro persistir, entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '13': {
    message: 'Transação não permitida. Valor da transação Inválido.',
    desc:
      'Transação não permitida. Valor inválido. Solicite ao portador que reveja os dados e novamente. Se o erro persistir, entre em contato com a Cielo.',
    action:
      'Transação não autorizada. Valor inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.',
    repeat: 'Não',
  },

  '14': {
    message: 'Transação não autorizada. Cartão Inválido',
    desc:
      'Transação não autorizada. Cartão inválido. Pode ser bloqueio do cartão no banco emissor, dados incorretos ou tentativas de testes de cartão. Use o Algoritmo de Lhum (Mod 10) para evitar transações não autorizadas por esse motivo. Consulte www.cielo.com.br/desenvolvedores para implantar o Algoritmo de Lhum.',
    action:
      'Não foi possível processar a transação. reveja os dados informados e tente novamente. Se o erro persistir, entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '15': {
    message: 'Banco emissor indisponível ou inexistente.',
    desc: 'Transação não autorizada. Banco emissor indisponível.',
    action:
      'Não foi possível processar a transação. Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '19': {
    message: 'Refaça a transação ou tente novamente mais tarde.',
    desc:
      'Não foi possível processar a transação. Refaça a transação ou tente novamente mais tarde. Se o erro persistir, entre em contato com a Cielo.',
    action:
      'Não foi possível processar a transação. Refaça a transação ou tente novamente mais tarde. Se o erro persistir entre em contato com a loja virtual.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  '21': {
    message: 'Cancelamento não efetuado. Transação não localizada.',
    desc:
      'Não foi possível processar o cancelamento. Se o erro persistir, entre em contato com a Cielo.',
    action:
      'Não foi possível processar o cancelamento. Tente novamente mais tarde. Persistindo o erro, entrar em contato com a loja virtual.',
    repeat: 'Não',
  },

  '22': {
    message: 'Parcelamento inválido. Número de parcelas inválidas.',
    desc:
      'Não foi possível processar a transação. Número de parcelas inválidas. Se o erro persistir, entre em contato com a Cielo.',
    action:
      'Não foi possível processar a transação. Valor inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.',
    repeat: 'Não',
  },

  '23': {
    message: 'Transação não autorizada. Valor da prestação inválido.',
    desc:
      'Não foi possível processar a transação. Valor da prestação inválido. Se o erro persistir, entre em contato com a Cielo.',
    action:
      'Não foi possível processar a transação. Valor da prestação inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.',
    repeat: 'Não',
  },

  '24': {
    message: 'Quantidade de parcelas inválido.',
    desc:
      'Não foi possível processar a transação. Quantidade de parcelas inválido. Se o erro persistir, entre em contato com a Cielo.',
    action:
      'Não foi possível processar a transação. Quantidade de parcelas inválido. Refazer a transação confirmando os dados informados. Persistindo o erro, entrar em contato com a loja virtual.',
    repeat: 'Não',
  },

  '25': {
    message: 'Pedido de autorização não enviou número do cartão',
    desc:
      'Não foi possível processar a transação. Solicitação de autorização não enviou o número do cartão. Se o erro persistir, verifique a comunicação entre loja virtual e Cielo.',
    action:
      'Não foi possível processar a transação. reveja os dados informados e tente novamente. Persistindo o erro, entrar em contato com a loja virtual.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  '28': {
    message: 'Arquivo temporariamente indisponível.',
    desc:
      'Não foi possível processar a transação. Arquivo temporariamente indisponível. Reveja a comunicação entre Loja Virtual e Cielo. Se o erro persistir, entre em contato com a Cielo.',
    action:
      'Não foi possível processar a transação. Entre com contato com a Loja Virtual.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  '30': {
    message: 'Transação não autorizada. Decline Message',
    desc:
      'Não foi possível processar a transação. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação com a Cielo esta sendo feita corretamente',
    action:
      'Não foi possível processar a transação. Reveja os dados e tente novamente. Se o erro persistir, entre em contato com a loja',
    repeat: 'Não',
  },

  '39': {
    message: 'Transação não autorizada. Erro no banco emissor.',
    desc: 'Transação não autorizada. Erro no banco emissor.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '41': {
    message: 'Transação não autorizada. Cartão bloqueado por perda.',
    desc: 'Transação não autorizada. Cartão bloqueado por perda.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '43': {
    message: 'Transação não autorizada. Cartão bloqueado por roubo.',
    desc: 'Transação não autorizada. Cartão bloqueado por roubo.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '51': {
    message: 'Transação não autorizada. Limite excedido/sem saldo.',
    desc: 'Transação não autorizada. Limite excedido/sem saldo.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'A partir do dia seguinte, apenas 4 vezes em 16 dias.',
  },

  '52': {
    message: 'Cartão com dígito de controle inválido.',
    desc:
      'Não foi possível processar a transação. Cartão com dígito de controle inválido.',
    action:
      'Transação não autorizada. Reveja os dados informados e tente novamente.',
    repeat: 'Não',
  },

  '53': {
    message: 'Transação não permitida. Cartão poupança inválido',
    desc: 'Transação não permitida. Cartão poupança inválido.',
    action:
      'Não foi possível processar a transação. Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '54': {
    message: 'Transação não autorizada. Cartão vencido',
    desc: 'Transação não autorizada. Cartão vencido.',
    action:
      'Transação não autorizada. Refazer a transação confirmando os dados.',
    repeat: 'Não',
  },

  '55': {
    message: 'Transação não autorizada. Senha inválida',
    desc: 'Transação não autorizada. Senha inválida.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '57': {
    message: 'Transação não permitida para o cartão',
    desc: 'Transação não autorizada. Transação não permitida para o cartão.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  '58': {
    message: 'Transação não permitida. Opção de pagamento inválida.',
    desc:
      'Transação não permitida. Opção de pagamento inválida. Reveja se a opção de pagamento escolhida está habilitada no cadastro',
    action: 'Transação não autorizada. Entre em contato com sua loja virtual.',
    repeat: 'Não',
  },

  '59': {
    message: 'Transação não autorizada. Suspeita de fraude.',
    desc: 'Transação não autorizada. Suspeita de fraude.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '60': {
    message: 'Transação não autorizada.',
    desc:
      'Transação não autorizada. Tente novamente. Se o erro persistir o portador deve entrar em contato com o banco emissor.',
    action:
      'Não foi possível processar a transação. Tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco emissor.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  '61': {
    message: 'Banco emissor indisponível.',
    desc: 'Transação não autorizada. Banco emissor indisponível.',
    action:
      'Transação não autorizada. Tente novamente. Se o erro persistir, entre em contato com seu banco emissor.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  '62': {
    message: 'Transação não autorizada. Cartão restrito para uso doméstico',
    desc: 'Transação não autorizada. Cartão restrito para uso doméstico.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'A partir do dia seguinte, apenas 4 vezes em 16 dias.',
  },

  '63': {
    message: 'Transação não autorizada. Violação de segurança',
    desc: 'Transação não autorizada. Violação de segurança.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '64': {
    message:
      'Transação não autorizada. Valor abaixo do mínimo exigido pelo banco emissor.',
    desc: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    action:
      'Transação não autorizada. Valor abaixo do mínimo exigido pelo banco emissor.',
    repeat: 'Não',
  },

  '65': {
    message:
      'Transação não autorizada. Excedida a quantidade de transações para o cartão.',
    desc:
      'Transação não autorizada. Excedida a quantidade de transações para o cartão.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  '67': {
    message: 'Transação não autorizada. Cartão bloqueado para compras hoje.',
    desc:
      'Transação não autorizada. Cartão bloqueado para compras hoje. Bloqueio pode ter ocorrido por excesso de tentativas inválidas. O cartão será desbloqueado automaticamente à meia noite.',
    action:
      'Transação não autorizada. Cartão bloqueado temporariamente. Entre em contato com seu banco emissor.',
    repeat: 'A partir do dia seguinte, apenas 4 vezes em 16 dias.',
  },

  '70': {
    message: 'Transação não autorizada. Limite excedido/sem saldo.',
    desc: 'Transação não autorizada. Limite excedido/sem saldo.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'A partir do dia seguinte, apenas 4 vezes em 16 dias.',
  },

  '72': {
    message:
      'Cancelamento não efetuado. Saldo disponível para cancelamento insuficiente.',
    desc:
      'Cancelamento não efetuado. Saldo disponível para cancelamento insuficiente. Se o erro persistir, entre em contato com a Cielo.',
    action:
      'Cancelamento não efetuado. Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.',
    repeat: 'Não',
  },

  '74': {
    message: 'Transação não autorizada. A senha está vencida.',
    desc: 'Transação não autorizada. A senha está vencida.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '75': {
    message: 'Senha bloqueada. Excedeu tentativas de cartão.',
    desc: 'Transação não autorizada.',
    action:
      'Sua Transação não pode ser processada. Entre em contato com o Emissor do seu cartão.',
    repeat: 'Não',
  },

  '76': {
    message:
      'Cancelamento não efetuado. Banco emissor não localizou a transação original',
    desc:
      'Cancelamento não efetuado. Banco emissor não localizou a transação original',
    action: 'Cancelamento não efetuado. Entre em contato com a loja virtual.',
    repeat: 'Não',
  },

  '77': {
    message:
      'Cancelamento não efetuado. Não foi localizado a transação original',
    desc: 'Cancelamento não efetuado. Não foi localizado a transação original',
    action: 'Cancelamento não efetuado. Entre em contato com a loja virtual.',
    repeat: 'Não',
  },

  '78': {
    message: 'Transação não autorizada. Cartão bloqueado primeiro uso.',
    desc:
      'Transação não autorizada. Cartão bloqueado primeiro uso. Solicite ao portador que desbloqueie o cartão diretamente com seu banco emissor.',
    action:
      'Transação não autorizada. Entre em contato com seu banco emissor e solicite o desbloqueio do cartão.',
    repeat: 'Não',
  },

  '80': {
    message:
      'Transação não autorizada. Divergencia na data de transação/pagamento.',
    desc:
      'Transação não autorizada. Data da transação ou data do primeiro pagamento inválida.',
    action:
      'Transação não autorizada. Refazer a transação confirmando os dados.',
    repeat: 'Não',
  },

  '82': {
    message: 'Transação não autorizada. Cartão inválido.',
    desc:
      'Transação não autorizada. Cartão Inválido. Solicite ao portador que reveja os dados e tente novamente.',
    action:
      'Transação não autorizada. Refazer a transação confirmando os dados. Se o erro persistir, entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '83': {
    message: 'Transação não autorizada. Erro no controle de senhas',
    desc: 'Transação não autorizada. Erro no controle de senhas',
    action:
      'Transação não autorizada. Refazer a transação confirmando os dados. Se o erro persistir, entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '85': {
    message: 'Transação não permitida. Falha da operação.',
    desc:
      'Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.',
    action:
      'Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.',
    repeat: 'Não',
  },

  '86': {
    message: 'Transação não permitida. Falha da operação.',
    desc:
      'Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.',
    action:
      'Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.',
    repeat: 'Não',
  },

  '88': {
    message: 'Falha na criptografia dos dados.',
    desc: 'Falha na criptografia dos dados.',
    action: 'Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  '89': {
    message: 'Erro na transação.',
    desc:
      'Transação não autorizada. Erro na transação. O portador deve tentar novamente e se o erro persistir, entrar em contato com o banco emissor.',
    action:
      'Transação não autorizada. Erro na transação. Tente novamente e se o erro persistir, entre em contato com seu banco emissor.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  '90': {
    message: 'Transação não permitida. Falha da operação.',
    desc:
      'Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.',
    action:
      'Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.',
    repeat: 'Não',
  },

  '91': {
    message:
      'Transação não autorizada. Banco emissor temporariamente indisponível.',
    desc:
      'Transação não autorizada. Banco emissor temporariamente indisponível.',
    action:
      'Transação não autorizada. Banco emissor temporariamente indisponível. Entre em contato com seu banco emissor.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  '92': {
    message: 'Transação não autorizada. Tempo de comunicação excedido.',
    desc: 'Transação não autorizada. Tempo de comunicação excedido.',
    action:
      'Transação não autorizada. Comunicação temporariamente indisponível. Entre em contato com a loja virtual.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  '93': {
    message:
      'Transação não autorizada. Violação de regra - Possível erro no cadastro.',
    desc:
      'Transação não autorizada. Violação de regra - Possível erro no cadastro.',
    action:
      'Sua transação não pode ser processada. Entre em contato com a loja virtual.',
    repeat: 'Não',
  },

  '94': {
    message: 'Transação duplicada.',
    desc: 'Transação duplicada enviado para autorização/captura.',
    action: 'O estabelecimento deve revisar as transações enviadas.',
    repeat: 'Não',
  },

  '96': {
    message: 'Falha no processamento.',
    desc:
      'Não foi possível processar a transação. Falha no sistema da Cielo. Se o erro persistir, entre em contato com a Cielo.',
    action:
      'Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  '97': {
    message: 'Valor não permitido para essa transação.',
    desc: 'Transação não autorizada. Valor não permitido para essa transação.',
    action:
      'Transação não autorizada. Valor não permitido para essa transação.',
    repeat: 'Não',
  },

  '98': {
    message: 'Sistema/comunicação indisponível.',
    desc:
      'Transação não autorizada. Sistema do emissor sem comunicação. Se for geral, verificar SITEF, GATEWAY e/ou Conectividade.',
    action:
      'Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  '99': {
    message: 'Sistema/comunicação indisponível.',
    desc:
      'Transação não autorizada. Sistema do emissor sem comunicação. Tente mais tarde.  Pode ser erro no SITEF, favor verificar !',
    action:
      'Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.',
    repeat: 'A partir do dia seguinte, apenas 4 vezes em 16 dias.',
  },

  '475': {
    message: 'Timeout de Cancelamento',
    desc: 'A aplicação não respondeu dentro do tempo esperado.',
    action:
      'Realizar uma nova tentativa após alguns segundos. Persistindo, entrar em contato com o Suporte.',
    repeat: 'Não',
  },

  '999': {
    message: 'Sistema/comunicação indisponível.',
    desc:
      'Transação não autorizada. Sistema do emissor sem comunicação. Tente mais tarde.  Pode ser erro no SITEF, favor verificar !',
    action:
      'Sua Transação não pode ser processada, Tente novamente mais tarde. Se o erro persistir, entre em contato com a loja virtual.',
    repeat: 'A partir do dia seguinte, apenas 4 vezes em 16 dias.',
  },

  AA: {
    message: 'Tempo Excedido',
    desc:
      'Tempo excedido na comunicação com o banco emissor. Oriente o portador a tentar novamente, se o erro persistir será necessário que o portador contate seu banco emissor.',
    action:
      'Tempo excedido na sua comunicação com o banco emissor, tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  AC: {
    message:
      'Transação não permitida. Cartão de débito sendo usado com crédito. Use a função débito.',
    desc:
      'Transação não permitida. Cartão de débito sendo usado com crédito. Solicite ao portador que selecione a opção de pagamento Cartão de Débito.',
    action:
      'Transação não autorizada. Tente novamente selecionando a opção de pagamento cartão de débito.',
    repeat: 'Não',
  },

  AE: {
    message: 'Tente Mais Tarde',
    desc:
      'Tempo excedido na comunicação com o banco emissor. Oriente o portador a tentar novamente, se o erro persistir será necessário que o portador contate seu banco emissor.',
    action:
      'Tempo excedido na sua comunicação com o banco emissor, tente novamente mais tarde. Se o erro persistir, entre em contato com seu banco.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  AF: {
    message: 'Transação não permitida. Falha da operação.',
    desc:
      'Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.',
    action:
      'Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.',
    repeat: 'Não',
  },

  AG: {
    message: 'Transação não permitida. Falha da operação.',
    desc:
      'Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.',
    action:
      'Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.',
    repeat: 'Não',
  },

  AH: {
    message:
      'Transação não permitida. Cartão de crédito sendo usado com débito. Use a função crédito.',
    desc:
      'Transação não permitida. Cartão de crédito sendo usado com débito. Solicite ao portador que selecione a opção de pagamento Cartão de Crédito.',
    action:
      'Transação não autorizada. Tente novamente selecionando a opção de pagamento cartão de crédito.',
    repeat: 'Não',
  },

  AI: {
    message: 'Transação não autorizada. Autenticação não foi realizada.',
    desc:
      'Transação não autorizada. Autenticação não foi realizada. O portador não concluiu a autenticação. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir, entre em contato com a Cielo informando o BIN (6 primeiros dígitos do cartão)',
    action:
      'Transação não autorizada. Autenticação não foi realizada com sucesso. Tente novamente e informe corretamente os dados solicitado. Se o erro persistir, entre em contato com o lojista.',
    repeat: 'Não',
  },

  AJ: {
    message:
      'Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Tente novamente selecionando a opção Private Label.',
    desc:
      'Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Solicite ao portador que tente novamente selecionando a opção Private Label. Caso não disponibilize a opção Private Label verifique na Cielo se o seu estabelecimento permite essa operação.',
    action:
      'Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. Tente novamente e selecione a opção Private Label. Em caso de um novo erro entre em contato com a loja virtual.',
    repeat: 'Não',
  },

  AV: {
    message: 'Transação não autorizada. Dados Inválidos',
    desc:
      'Falha na validação dos dados da transação. Oriente o portador a rever os dados e tentar novamente.',
    action:
      'Falha na validação dos dados. Reveja os dados informados e tente novamente.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  BD: {
    message: 'Transação não permitida. Falha da operação.',
    desc:
      'Transação não permitida. Houve um erro no processamento.Solicite ao portador que digite novamente os dados do cartão, se o erro persistir pode haver um problema no terminal do lojista, nesse caso o lojista deve entrar em contato com a Cielo.',
    action:
      'Transação não permitida. Informe os dados do cartão novamente. Se o erro persistir, entre em contato com a loja virtual.',
    repeat: 'Não',
  },

  BL: {
    message: 'Transação não autorizada. Limite diário excedido.',
    desc:
      'Transação não autorizada. Limite diário excedido. Solicite ao portador que entre em contato com seu banco emissor.',
    action:
      'Transação não autorizada. Limite diário excedido. Entre em contato com seu banco emissor.',
    repeat: 'A partir do dia seguinte, apenas 4 vezes em 16 dias.',
  },

  BM: {
    message: 'Transação não autorizada. Cartão Inválido',
    desc:
      'Transação não autorizada. Cartão inválido. Pode ser bloqueio do cartão no banco emissor ou dados incorretos. Tente usar o Algoritmo de Lhum (Mod 10) para evitar transações não autorizadas por esse motivo.',
    action:
      'Transação não autorizada. Cartão inválido.  Refaça a transação confirmando os dados informados.',
    repeat: 'Não',
  },

  BN: {
    message: 'Transação não autorizada. Cartão ou conta bloqueado.',
    desc:
      'Transação não autorizada. O cartão ou a conta do portador está bloqueada. Solicite ao portador que entre em contato com  seu banco emissor.',
    action:
      'Transação não autorizada. O cartão ou a conta do portador está bloqueada. Entre em contato com  seu banco emissor.',
    repeat: 'Não',
  },

  BO: {
    message: 'Transação não permitida. Falha da operação.',
    desc:
      'Transação não permitida. Houve um erro no processamento. Solicite ao portador que digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco emissor.',
    action:
      'Transação não permitida. Houve um erro no processamento. Digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco emissor.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  BP: {
    message: 'Transação não autorizada. Conta corrente inexistente.',
    desc:
      'Transação não autorizada. Não possível processar a transação por um erro relacionado ao cartão ou conta do portador. Solicite ao portador que entre em contato com o banco emissor.',
    action:
      'Transação não autorizada. Não possível processar a transação por um erro relacionado ao cartão ou conta do portador. Entre em contato com o banco emissor.',
    repeat: 'Não',
  },

  BP176: {
    message: 'Transação não permitida.',
    desc:
      'Parceiro deve checar se o processo de integração foi concluído com sucesso.',
    action:
      'Parceiro deve checar se o processo de integração foi concluído com sucesso.',
    repeat: '—',
  },

  BV: {
    message: 'Transação não autorizada. Cartão vencido',
    desc: 'Transação não autorizada. Cartão vencido.',
    action:
      'Transação não autorizada. Refazer a transação confirmando os dados.',
    repeat: 'Não',
  },

  CF: {
    message: 'Transação não autorizada.C79:J79 Falha na validação dos dados.',
    desc:
      'Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.',
    action:
      'Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.',
    repeat: 'Não',
  },

  CG: {
    message: 'Transação não autorizada. Falha na validação dos dados.',
    desc:
      'Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.',
    action:
      'Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.',
    repeat: 'Não',
  },

  DA: {
    message: 'Transação não autorizada. Falha na validação dos dados.',
    desc:
      'Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.',
    action:
      'Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.',
    repeat: 'Não',
  },

  DF: {
    message: 'Transação não permitida. Falha no cartão ou cartão inválido.',
    desc:
      'Transação não permitida. Falha no cartão ou cartão inválido. Solicite ao portador que digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco',
    action:
      'Transação não permitida. Falha no cartão ou cartão inválido. Digite novamente os dados do cartão, se o erro persistir, entre em contato com o banco',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  DM: {
    message: 'Transação não autorizada. Limite excedido/sem saldo.',
    desc: 'Transação não autorizada. Limite excedido/sem saldo.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'A partir do dia seguinte, apenas 4 vezes em 16 dias.',
  },

  DQ: {
    message: 'Transação não autorizada. Falha na validação dos dados.',
    desc:
      'Transação não autorizada. Falha na validação dos dados. Solicite ao portador que entre em contato com o banco emissor.',
    action:
      'Transação não autorizada. Falha na validação dos dados. Entre em contato com o banco emissor.',
    repeat: 'Não',
  },

  DS: {
    message: 'Transação não permitida para o cartão',
    desc: 'Transação não autorizada. Transação não permitida para o cartão.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  EB: {
    message: 'Transação não autorizada. Limite diário excedido.',
    desc:
      'Transação não autorizada. Limite diário excedido. Solicite ao portador que entre em contato com seu banco emissor.',
    action:
      'Transação não autorizada. Limite diário excedido. Entre em contato com seu banco emissor.',
    repeat: 'A partir do dia seguinte, apenas 4 vezes em 16 dias.',
  },

  EE: {
    message:
      'Transação não permitida. Valor da parcela inferior ao mínimo permitido.',
    desc:
      'Transação não permitida. Valor da parcela inferior ao mínimo permitido. Não é permitido parcelas inferiores a R$ 5,00. Necessário rever calculo para parcelas.',
    action:
      'Transação não permitida. O valor da parcela está abaixo do mínimo permitido. Entre em contato com a loja virtual.',
    repeat: 'Não',
  },

  EK: {
    message: 'Transação não permitida para o cartão',
    desc: 'Transação não autorizada. Transação não permitida para o cartão.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  FA: {
    message: 'Transação não autorizada.',
    desc: 'Transação não autorizada AmEx.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  FC: {
    message: 'Transação não autorizada. Ligue Emissor',
    desc:
      'Transação não autorizada. Oriente o portador a entrar em contato com o banco emissor.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Não',
  },

  FD: {
    message: 'Transação negada. Reter cartão condição especial',
    desc: 'Transação não autorizada por regras do banco emissor.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor',
    repeat: 'Não',
  },

  FE: {
    message:
      'Transação não autorizada. Divergencia na data de transação/pagamento.',
    desc:
      'Transação não autorizada. Data da transação ou data do primeiro pagamento inválida.',
    action:
      'Transação não autorizada. Refazer a transação confirmando os dados.',
    repeat: 'Não',
  },

  FF: {
    message: 'Cancelamento OK',
    desc:
      'Transação de cancelamento autorizada com sucesso. ATENÇÂO: Esse retorno é para casos de cancelamentos e não para casos de autorizações.',
    action: 'Transação de cancelamento autorizada com sucesso',
    repeat: 'Não',
  },

  FG: {
    message: 'Transação não autorizada. Ligue AmEx 08007285090.',
    desc:
      'Transação não autorizada. Oriente o portador a entrar em contato com a Central de Atendimento AmEx.',
    action:
      'Transação não autorizada. Entre em contato com a Central de Atendimento AmEx no telefone 08007285090',
    repeat: 'Não',
  },

  GA: {
    message: 'Aguarde Contato',
    desc:
      'Transação não autorizada. Referida pelo Lynx Online de forma preventiva.',
    action: 'Transação não autorizada. Entre em contato com o lojista.',
    repeat: 'Não',
  },

  HJ: {
    message: 'Transação não permitida. Código da operação inválido.',
    desc: 'Transação não permitida. Código da operação Coban inválido.',
    action:
      'Transação não permitida. Código da operação Coban inválido. Entre em contato com o lojista.',
    repeat: 'Não',
  },

  IA: {
    message: 'Transação não permitida. Indicador da operação inválido.',
    desc: 'Transação não permitida. Indicador da operação Coban inválido.',
    action:
      'Transação não permitida. Indicador da operação Coban inválido. Entre em contato com o lojista.',
    repeat: 'Não',
  },

  JB: {
    message: 'Transação não permitida. Valor da operação inválido.',
    desc: 'Transação não permitida. Valor da operação Coban inválido.',
    action:
      'Transação não permitida. Valor da operação Coban inválido. Entre em contato com o lojista.',
    repeat: 'Não',
  },

  KA: {
    message: 'Transação não permitida. Falha na validação dos dados.',
    desc:
      'Transação não permitida. Houve uma falha na validação dos dados. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação entre loja virtual e Cielo.',
    action:
      'Transação não permitida. Houve uma falha na validação dos dados. reveja os dados informados e tente novamente. Se o erro persistir entre em contato com a Loja Virtual.',
    repeat: 'Não',
  },

  KB: {
    message: 'Transação não permitida. Selecionado a opção incorrente.',
    desc:
      'Transação não permitida. Selecionado a opção incorreta. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir deve ser verificado a comunicação entre loja virtual e Cielo.',
    action:
      'Transação não permitida. Selecionado a opção incorreta. Tente novamente. Se o erro persistir entre em contato com a Loja Virtual.',
    repeat: 'Não',
  },

  KE: {
    message: 'Transação não autorizada. Falha na validação dos dados.',
    desc:
      'Transação não autorizada. Falha na validação dos dados. Opção selecionada não está habilitada. Verifique as opções disponíveis para o portador.',
    action:
      'Transação não autorizada. Falha na validação dos dados. Opção selecionada não está habilitada. Entre em contato com a loja virtual.',
    repeat: 'Não',
  },

  N7: {
    message: 'Transação não autorizada. Código de segurança inválido.',
    desc:
      'Transação não autorizada. Código de segurança inválido. Oriente o portador corrigir os dados e tentar novamente.',
    action: 'Transação não autorizada. Reveja os dados e informe novamente.',
    repeat: 'Não',
  },

  R1: {
    message: 'Transação não autorizada. Cartão inadimplente (Do not honor).',
    desc:
      'Transação não autorizada. Não foi possível processar a transação. Questão relacionada a segurança, inadimplencia ou limite do portador.',
    action: 'Transação não autorizada. Entre em contato com seu banco emissor.',
    repeat: 'Apenas 4 vezes em 16 dias.',
  },

  U3: {
    message: 'Transação não permitida. Falha na validação dos dados.',
    desc:
      'Transação não permitida. Houve uma falha na validação dos dados. Solicite ao portador que reveja os dados e tente novamente. Se o erro persistir verifique a comunicação entre loja virtual e Cielo.',
    action:
      'Transação não permitida. Houve uma falha na validação dos dados. reveja os dados informados e tente novamente. Se o erro persistir entre em contato com a Loja Virtual.',
    repeat: 'Não',
  },
  GD: {
    message: 'Transação não permitida',
    desc: 'Transação não permitida',
    action:
      'Transação não é possível ser processada no estabelecimento. Entre em contato com a Cielo para obter mais detalhes Transação',
    repeat: 'Não',
  },
};

const codePaymentMethod = {
  ALL: 'Todos',
  CC: 'Cartão de Crédito',
  CD: 'Cartão de Débito',
  TF: 'Transferencia Eletrônica',
  BOL: 'Boleto',
};

const toCorrectSize = (value, size, order = 'E') => {
  let valueString = value.toString();

  if (valueString.length === 0) return null;

  // Pega os primeiros dígitos da
  if (valueString.length > parseInt(size, 10)) {
    if (order === 'E') {
      valueString = valueString.substring(
        valueString.length - size,
        valueString.length
      );
    } else {
      valueString = valueString.substring(0, size);
    }
  } else {
    let i = size - valueString.length;
    for (i; i > 0; i -= 1) {
      valueString = `0${valueString}`;
    }
  }

  return valueString;
};

const searchFlag = (number) => {
  const numberCard = number.replace(/\D/g, '');

  const flagInfo = flags.find(({ regex: reg }) => reg.test(numberCard));

  if (!flagInfo) return null;

  // eslint-disable-next-line no-unused-vars
  const { regex, ...flag } = flagInfo;

  return flag;
};

module.exports = {
  flags,
  searchFlag,
  banksBoletos,
  statusCodeError,
  statusCodeTransactional,
  codePaymentMethod,
  codReturn,
  toCorrectSize,
};
