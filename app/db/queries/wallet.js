export default {
  createWallet: `
    INSERT INTO wallet_info(
      id,
      user_id,
      balance
    ) VALUES(UUID_TO_BIN(?), UUID_TO_BIN(?), ?)
  `,

  fetchWalletById: `
    SELECT *, BIN_TO_UUID(id) id, BIN_TO_UUID(user_id) user_id
    FROM wallet_info
    WHERE id = UUID_TO_BIN(?)
  `,

  fetchWalletByUserId: `
    SELECT *, BIN_TO_UUID(id) id, BIN_TO_UUID(user_id) user_id
    FROM wallet_info
    WHERE user_id = UUID_TO_BIN(?)
  `,

  updateWalletBalanceById: `
    UPDATE
      wallet_info
    SET
      balance = ?
    WHERE id = UUID_TO_BIN(?)
  `
}
