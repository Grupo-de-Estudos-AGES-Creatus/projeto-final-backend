import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import {createTransport} from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {UserService} from "../user/user.service";

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);
    private nodemailerTransport: Mail;

    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {
        this.nodemailerTransport = createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: true,
            auth: {
                user: configService.get('gpestudosages@outlook.com'),
                pass: configService.get('grupodeestudos1')
            }
        });
    }

    private sendMail(options: Mail.Options) {
        this.logger.log('Email sent out to', options.to);
        return this.nodemailerTransport.sendMail(options);
    }

    public async decodeConfirmationToken(token: string) {
        try {
            const payload = await this.jwtService.verify(token, {
                secret: process.env.JWT_RESET_PASSWORD_SECRET,
            });

            if (typeof payload === 'object' && 'email' in payload) {
                return payload.email;
            }
            throw new BadRequestException();
        } catch (error) {
            if (error?.name === 'TokenExpiredError') {
                throw new BadRequestException(
                    'Email confirmation token expired'
                );
            }
            throw new BadRequestException('Bad confirmation token');
        }
    }

    public async sendResetPasswordLink(email: string): Promise<void> {
        const payload = {email};

        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_RESET_PASSWORD_SECRET,
            expiresIn: "10m"
        });

        const user = await this.userService.findOne(email);
        user.resetToken = token;

        const url = `${this.configService.get('EMAIL_RESET_PASSWORD_URL')}?token=${token}`;

        const text = `Hi, \nTo reset your password, click here: ${url}`;

        return this.sendMail({
            to: email,
            subject: 'Reset password',
            text
        });
    }
}