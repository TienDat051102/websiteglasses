import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile, securityId} from '@loopback/security';
import {CustomerJWTService} from '../services';

export class CustomerJWTStrategy implements AuthenticationStrategy {
  name = 'customer-jwt';

  constructor(
    @service(CustomerJWTService) // 🔥 ĐỔI Ở ĐÂY
    private jwtService: CustomerJWTService,
  ) {
    console.log('Customer JWT Strategy Loaded');
  }

  async authenticate(request: Request): Promise<UserProfile> {
    const auth = request.headers.authorization;

    console.log('AUTH HEADER:', auth);

    if (!auth || !auth.startsWith('Bearer ')) {
      throw new HttpErrors.Unauthorized('No token');
    }

    const token = auth.replace('Bearer ', '');

    let decoded: any;

    try {
      decoded = this.jwtService.verifyToken(token);
    } catch (err) {
      console.log('JWT ERROR:', err);
      throw new HttpErrors.Unauthorized('Invalid token');
    }

    if (!decoded?.id) {
      throw new HttpErrors.Unauthorized('Invalid payload');
    }

    return {
      [securityId]: decoded.id.toString(),
      id: decoded.id,
      name: decoded.name,
      phone_number: decoded.phone_number,
    };
  }
}
