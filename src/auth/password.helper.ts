import * as bcrypt from 'bcrypt';

export function encryptPassword(password: string): string {
  return bcrypt.hashSync(password, 10).toString();
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
