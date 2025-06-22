interface JWTPayload {
    exp: number;
    iat: number;
    sub: string;
    email?: string;
    name?: string;
    [key: string]: any;
}

export function decodeJWT(token: string): JWTPayload | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) {
            return null;
        }
        
        const payload = JSON.parse(atob(parts[1]));
        return payload;
    } catch (error) {
        console.error("Invalid JWT format", error);
        return null;
    }
}

export function isTokenExpired(token: string): boolean {
    const payload = decodeJWT(token);
    if (!payload || !payload.exp) {
        return true;
    }
    
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp < currentTime;
    
    return isExpired;
}

export function isValidToken(token: string): boolean {
    if (!token) {
        return false;
    }
    
    const payload = decodeJWT(token);
    if (!payload) {
        return false;
    }
    
    // A token is valid if it's NOT expired
    const isValid = !isTokenExpired(token);
    return isValid;
}
 
export function getTokenExpiration(token: string): Date | null {
    const payload = decodeJWT(token);
    if (!payload || !payload.exp) return null;
    return new Date(payload.exp * 1000);
}

export function willTokenExpireSoon(token: string, minutesThreshold: number = 5): boolean {
    const expirationDate = getTokenExpiration(token);
    if (!expirationDate) return true;
    
    const thresholdTime = new Date(Date.now() + minutesThreshold * 60 * 1000);
    const willExpireSoon = expirationDate <= thresholdTime;
    
    return willExpireSoon;
}