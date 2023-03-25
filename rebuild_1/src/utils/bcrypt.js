import bcrypt from "bcrypt";

//Hashing the password
export async function hashearPassword(pasword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pasword, salt);
    return hash;
  } catch (error) {
    throw new Error(error);
  }
}

//Comparing the password
export async function comparePassword(password, savedPassword) {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (error) {
    throw new Error(error);
  }
}
