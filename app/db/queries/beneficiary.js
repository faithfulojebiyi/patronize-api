export default {
  createBeneficiary: `
    INSERT INTO beneficiaries(
      id,
      user_id,
      account_no,
      bank_code,
      bank_name
    ) VALUES(UUID_TO_BIN(?), UUID_TO_BIN(?), ?, ?, ?)
  `,

  fetchBeneficiary: `
    SELECT *, BIN_TO_UUID(id) id, BIN_TO_UUID(user_id) user_id
    FROM beneficiaries
  `,

  fetchBeneficiaryById: `
    SELECT *, BIN_TO_UUID(id) id, BIN_TO_UUID(user_id) user_id
    FROM beneficiaries
    WHERE id = UUID_TO_BIN(?)
  `,

  fetchBeneficiaryByAccountNo: `
    SELECT *, BIN_TO_UUID(id) id, BIN_TO_UUID(user_id) user_id
    FROM beneficiaries
    WHERE account_no = ?
  `,

  fetchBeneficiaryByUserId: `
    SELECT *, BIN_TO_UUID(id) id, BIN_TO_UUID(user_id) user_id
    FROM beneficiaries
    WHERE user_id = UUID_TO_BIN(?)
  `
}
