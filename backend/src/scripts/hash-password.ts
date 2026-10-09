/**
 * Prints a bcrypt hash for ADMIN_PASSWORD_HASH.
 * Usage: npm run hash-password -- "your-strong-password"
 */
import { BcryptPasswordHasher } from '@/core/security/password-hasher';

const MIN_LENGTH = 10;
const password = process.argv[2];

if (!password || password.length < MIN_LENGTH) {
  console.error(`Usage: npm run hash-password -- "<password with at least ${MIN_LENGTH} characters>"`);
  process.exit(1);
}

new BcryptPasswordHasher().hash(password).then((hash) => {
  console.log(`\nAdd this line to backend/.env:\n\nADMIN_PASSWORD_HASH='${hash}'\n`);
});
