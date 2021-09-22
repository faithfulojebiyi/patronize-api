export default {
  createUser: `
    INSERT INTO user_info(
      id,
      first_name,
      last_name,
      email,
      password
    ) VALUES(UUID_TO_BIN(?), ?, ?, ?, ?)
  `,

  fetchUserByEmail: `
    SELECT *, BIN_TO_UUID(id) id
    FROM user_info
    WHERE email = ?
  `,

  fetchUserById: `
    SELECT *, BIN_TO_UUID(id) id FROM user_info
    WHERE id=UUID_TO_BIN(?)
  `
}
