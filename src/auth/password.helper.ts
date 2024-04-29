import * as bcrypt from 'bcrypt';

export function encryptPassword(password: string): string {
  return bcrypt.hashSync(password, 10).toString();
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
