import { compare, genSalt, hash } from "bcrypt";

export const hashPassword = async (password:string) => {
  const salt = await genSalt(10)
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

export const verifyPassword = async (password:string, hashedPassword:string) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}


