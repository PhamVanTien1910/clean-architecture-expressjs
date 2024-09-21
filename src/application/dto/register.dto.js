export const RegisterDto = (body, hashedPassword = null) => ({
    username: body.username,
    email: body.email,
    password: hashedPassword || body.password,
    phone: body.phone,
    sex: body.sex,
    address: body.address,
    roleId : 2
  });