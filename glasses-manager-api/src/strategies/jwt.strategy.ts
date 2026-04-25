import {AuthenticationStrategy} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile, securityId} from '@loopback/security'; // Import UserProfile
import {JWTService} from '../services/jwt.service';

export class JWTStrategy implements AuthenticationStrategy {
  name = 'jwt';

  constructor(@inject('services.JWTService') private jwtService: JWTService) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = this.extractToken(request);
    if (!token) {
      throw new HttpErrors.Unauthorized('Token not found');
    }

    const decoded = this.jwtService.verifyToken(token);

    if (!decoded) {
      throw new HttpErrors.Unauthorized('Invalid token');
    }

    const userProfile: UserProfile = {
      [securityId]: decoded.id, // id từ payload của token
      username: decoded.username, // username từ payload của token
      email: decoded.email,
      roles: decoded.roles,
    };

    return userProfile;
  }

  private extractToken(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization;
    console.log('authorizationHeader', authorizationHeader);
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      return authorizationHeader.substring(7); // Bỏ qua 'Bearer '
    }
    return undefined;
  }
}
