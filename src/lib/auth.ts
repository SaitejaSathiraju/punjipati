// Hardcoded admin credentials
// Change these to your desired username and password
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'punjipati2024';

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createSession(): string {
  // Create a simple session token (in production, use proper JWT or session management)
  const sessionToken = Buffer.from(`${ADMIN_USERNAME}:${Date.now()}`).toString('base64');
  return sessionToken;
}

export function validateSession(sessionToken: string): boolean {
  try {
    const decoded = Buffer.from(sessionToken, 'base64').toString('utf-8');
    const [username, timestamp] = decoded.split(':');
    
    // Check if session is valid (24 hours expiry)
    const sessionTime = parseInt(timestamp);
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    
    return username === ADMIN_USERNAME && (now - sessionTime) < twentyFourHours;
  } catch {
    return false;
  }
}





