import Cryptr from "cryptr";

export function encrypt(text: string) {
  const secretKey = `${process.env.NEXTAUTH_SECRET}`;
  const cryptr = new Cryptr(secretKey);

  const encryptedString = cryptr.encrypt(text);
  return encryptedString;
}

export function decrypt(encryptedString: string) {
  console.log('🩸🩸 ~ encryptedString:', encryptedString);
  const secretKey = `${process.env.NEXTAUTH_SECRET}`;
  const cryptr = new Cryptr(secretKey);

  const text = cryptr.decrypt(encryptedString);
  return text;
}