import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client'
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
const prisma = new PrismaClient()
@Injectable()
export class UserService {
  private transporter: nodemailer.Transporter;
  constructor(
    private readonly jwtService: JwtService
  ) {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "gpestudosages@gmail.com",
        pass: "qyle fanv okuz cmlm"
      },
    })
  }


  //CRUD basico + hashing senha
  async create(createUserDto: CreateUserDto) {
    const password = createUserDto.password;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    createUserDto.password = hash;
    return await prisma.user.create({
      data: {
        ...createUserDto,
        created_at: new Date(),
      },
    });
  }
  async findAll() {
    return await prisma.user.findMany({
      include: {
        projects: true,
      },
    });
  }
  async findOne(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }
  async findAndVerify(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
  async update(id: string, updateUserDto: UpdateUserDto) {
    const password = updateUserDto.password;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    updateUserDto.password = hash;
    return await prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }



  //Mudança de senha
  async changePassword(email: string, oldPassword: string, newPassword: string) {
    const user = await this.findAndVerify(email, oldPassword);
    if (!user) {
      throw new NotFoundException("Login ou/e senha errados");
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = newHashedPassword;
    return await prisma.user.update({
      where: { email },
      data: user,
    });
  }
  //Esqueceu a senha
  async forgotPassword(email: string) {
    const user = await this.findOne(email);
    if (!user) {
      throw new NotFoundException("Email não existe no banco de dados")
    }
    const payload = { email: user.email }
    const resetToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_CHANGE_PASSWORD_SECRET,
      expiresIn: '10m',
    });
    this.sendPasswordResetEmail(email, resetToken)
    return { message: "Email enviado com sucesso" }
  }
  //Mandar email
  async sendPasswordResetEmail(to: string, token: string) {
    const resetLink = `http://localhost:5173/reset-password?token=${token}`;
    const mailOptions = {
      from: 'Auth-backend service',
      to: to,
      subject: 'Password Reset Request',
      html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      `
    };
    await this.transporter.sendMail(mailOptions);
  }
}
