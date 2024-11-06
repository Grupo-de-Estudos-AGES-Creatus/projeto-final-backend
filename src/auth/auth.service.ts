import {Injectable, NotFoundException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {EmailService} from '../email/email.service';
import {Auth, google} from 'googleapis';
import {UserService} from "../user/user.service";


@Injectable()
export class AuthService {
    oauthClient: Auth.OAuth2Client;
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService,
        private readonly emailService: EmailService
    ) {
        const clientID = this.configService.get('gpestudosages@outlook.com');
        const clientSecret = this.configService.get('grupodeestudos1');
        this.oauthClient = new google.auth.OAuth2(clientID, clientSecret);
    }

    async forgotPassword(email: string): Promise<void> {
        const user = await this.userService.findOne(email);

        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }
        await this.emailService.sendResetPasswordLink(email);
    }

    async resetPassword(token: string, password: string): Promise<void> {
        const email = await this.emailService.decodeConfirmationToken(token);

        const user = await this.userService.findOne(email);

        if (!user) {
            throw new NotFoundException(`No user found for email: ${email}`);
        }

        const updateUserDto = {
            password: password,
            resetToken: ""
        }

        await this.userService.update(email, updateUserDto);

    }
}