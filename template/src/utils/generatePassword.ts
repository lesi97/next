export function generatePassword(): string {
  const numbers = '0123456789';
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const symbols = '[!@#$£%^&*()+=-.,]';

  const characters = 16;
  const chars = letters + numbers + symbols;

  const array = new Uint32Array(characters);
  crypto.getRandomValues(array);

  let password = '';

  for (let i = 0; i < characters; i++) {
    password += chars[array[i] % chars.length];
  }

  if (!/\d/.test(password)) {
    const randomIndex = Math.floor(Math.random() * password.length);
    const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
    password =
      password.substring(0, randomIndex) +
      randomNumber +
      password.substring(randomIndex + 1);
  }

  if (!/!@#$£%^&*()+=-.,/.test(password)) {
    const randomIndex = Math.floor(Math.random() * password.length);
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    password =
      password.substring(0, randomIndex) +
      randomSymbol +
      password.substring(randomIndex + 1);
  }

  return password;
}
