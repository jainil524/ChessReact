import { randomBytes } from 'crypto';

// Generate a secure JWT secret
function generateJwtSecret() {
    // Generate 32 random bytes
    const secretBytes = randomBytes(32);
    // Convert to base64 string
    const secret = secretBytes.toString('base64');
    return secret;
}

// Usage example
const jwtSecret = generateJwtSecret();
console.log('Generated JWT Secret:', jwtSecret);