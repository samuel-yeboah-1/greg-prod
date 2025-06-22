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
        // JWT tokens use dots (.) as separators, not commas
        const parts = token.split('.');
        if (parts.length !== 3) {
            console.error("JWT token should have 3 parts separated by dots");
            return null;
        }
        
        // Decode the payload (second part)
        const payload = JSON.parse(atob(parts[1]));
        console.log("Decoded JWT payload:", payload);
        return payload;
    } catch (error) {
        console.error("Invalid JWT format", error);
        return null;
    }
}

export function isTokenExpired(token: string): boolean {
    const payload = decodeJWT(token);
    if (!payload || !payload.exp) {
        console.log("Token has no expiration or invalid payload");
        return true;
    }
    
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp < currentTime;
    
    console.log("Token expiration check:", {
        exp: payload.exp,
        currentTime,
        isExpired,
        expiresAt: new Date(payload.exp * 1000).toISOString()
    });
    
    return isExpired;
}

export function isValidToken(token: string): boolean {
    if (!token) {
        console.log("No token provided");
        return false;
    }
    
    const payload = decodeJWT(token);
    if (!payload) {
        console.log("Token payload is invalid");
        return false;
    }
    
    // A token is valid if it's NOT expired
    const isValid = !isTokenExpired(token);
    console.log("Token validity check:", isValid);
    return isValid;
}
 
export function getTokenExpiration(token: string): Date | null {
    const payload = decodeJWT(token);
    if (!payload || !payload.exp) return null;
    return new Date(payload.exp * 1000);
}

/**
 * Check if token will expire within specified minutes
 */
export function willTokenExpireSoon(token: string, minutesThreshold: number = 5): boolean {
    const expirationDate = getTokenExpiration(token);
    if (!expirationDate) return true;
    
    const thresholdTime = new Date(Date.now() + minutesThreshold * 60 * 1000);
    const willExpireSoon = expirationDate <= thresholdTime;
    
    console.log("Token expiration soon check:", {
        expirationDate: expirationDate.toISOString(),
        thresholdTime: thresholdTime.toISOString(),
        willExpireSoon
    });
    
    return willExpireSoon;
}