export default {
  CARD_CHARGE_ENPOINT: 'https://api.flutterwave.com/v3/charges?type=card',
  BANK_TRANSFER_ENPOINT: 'https://api.flutterwave.com/v3/charges?type=bank_transfer',
  BANK_CHARGE_ENPOINT: 'https://api.flutterwave.com/v3/charges?type=debit_ng_account',
  VALIDATE_CHARGE_ENDPOINT: 'https://api.flutterwave.com/v3/validate-charge',
  RESOLVE_ACCOUNT_ENDPOINT: 'https://api.flutterwave.com/v3/accounts/resolve',
  WITHDRAW_TRANSFER_ENDPOINT: 'https://api.flutterwave.com/v3/transfers',
  VERIFY_TRANSFER_ENDPOINT: (resource) => `https://api.flutter.com/v3/transfers/${resource}`,
  VERIFY_TRANSACTION_ENDPOINT: (resource) => `https://api.flutterwave.com/v3/transactions/${resource}/verify`
}
