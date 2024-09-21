const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;

const phoneRegex = /^\d{10}$/;

export const isValidEmail = (email) => emailRegex.test(email);

export const isValidUsername = (username) => usernameRegex.test(username);

export const isValidPhone = (phone) => phoneRegex.test(phone);
