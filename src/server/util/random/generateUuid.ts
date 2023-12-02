import { v4 } from 'uuid';

function generateUuid() {
  return v4();
}

export { generateUuid };
