import bcrypt from "bcrypt";

export async function hashPassword(unHashedPassword: string): Promise<string> {
  return await bcrypt.hash(unHashedPassword, 10).then((hash: string) => hash);
}

export async function isSamePassword(
    unHashedPassword: string,
    hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(unHashedPassword, hashedPassword).
      then((result: boolean) => result);
}