import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity.js';
import { LoginDto, RegisterDto } from './dto/auth.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase().trim();
    const existing = await this.users.findOne({ where: { email } });
    if (existing) throw new ConflictException('Email is already registered');

    const user = this.users.create({
      fullName: dto.fullName.trim(),
      email,
      passwordHash: await bcrypt.hash(dto.password, 12),
      role: 'user',
    });
    const saved = await this.users.save(user);
    return this.issueToken(saved);
  }

  async login(dto: LoginDto) {
    const user = await this.users.findOne({ where: { email: dto.email.toLowerCase().trim() } });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.issueToken(user);
  }

  async findById(id: number) {
    const user = await this.users.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException('User no longer exists');
    return this.publicUser(user);
  }

  private issueToken(user: User) {
    const payload = { sub: user.id, email: user.email, fullName: user.fullName };
    return { accessToken: this.jwtService.sign(payload), user: this.publicUser(user) };
  }

  private publicUser(user: User) {
    return { id: user.id, fullName: user.fullName, email: user.email, role: user.role };
  }
}
