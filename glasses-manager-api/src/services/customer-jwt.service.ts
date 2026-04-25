import jwt from 'jsonwebtoken';

export class CustomerJWTService {
  generateToken(customer: any) {
    return jwt.sign(
      {
        id: customer.id,
        name: customer.name,
        phone_number: customer.phone_number,
      },
      process.env.JWT_SECRET!,
      {expiresIn: '7d'},
    );
  }

  verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}
