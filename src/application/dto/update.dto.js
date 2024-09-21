export const UpdateUserDto = (body) => ({
    username: body.username,
    email: body.email,
    phone: body.phone,
    sex: body.sex,
    address: body.address,
});
