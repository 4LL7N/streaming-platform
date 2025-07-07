import { PrismaService } from '@/src/core/prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { CreateUserInput } from './input/create-user.input';

@Injectable()
export class AccountService {
  public constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  public async create(input: CreateUserInput) {
    const { username, email, password } = input;

    const isUsernameExists = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (isUsernameExists) {
      throw new ConflictException(`Username ${username} already exists`);
    }

    console.log(input);
    
    const user = await this.prisma.user.create({
      data: {
        username,
        email,
        password: await hash(password),
        displayName: username,
      },
    });
    return user
  }
}
