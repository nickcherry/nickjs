import { randomBytes } from 'crypto';

function generateSessionToken() {
  return randomBytes(64).toString('base64');
}

export { generateSessionToken };
