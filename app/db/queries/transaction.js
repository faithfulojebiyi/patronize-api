export default {
  createTransaction: `
    INSERT INTO transactions(
      id,
      user_id,
      wallet_id,
      operation,
      narration,
      amount
    ) VALUES(UUID_TO_BIN(?), UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?, ?)
  `,

  fetchTransaction: `
    SELECT *, BIN_TO_UUID(id) id, BIN_TO_UUID(user_id) user_id, BIN_TO_UUID(wallet_id) wallet_id
    FROM transactions
  `,

  fetchTransactionByUserId: `
    SELECT *, BIN_TO_UUID(id) id, BIN_TO_UUID(user_id) user_id, BIN_TO_UUID(wallet_id) wallet_id
    FROM transactions
    WHERE user_id = UUID_TO_BIN(?)
  `,

  fetchTransactionByWalletId: `
    SELECT *, BIN_TO_UUID(id) id, BIN_TO_UUID(user_id) user_id, BIN_TO_UUID(wallet_id) wallet_id
    FROM transactions
    WHERE wallet_id = UUID_TO_BIN(?)
  `,

  fetchTransactionById: `
    SELECT *, BIN_TO_UUID(id) id, BIN_TO_UUID(user_id) user_id, BIN_TO_UUID(wallet_id) wallet_id
    FROM transactions
    WHERE id = UUID_TO_BIN(?)
  `
}
