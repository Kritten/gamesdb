import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LoginGuard } from './login.guard';

class BodyDTO {
  readonly username: string;
  readonly password: string;
}

@Controller()
export class AuthController {
  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Body() login: BodyDTO, @Request() req) {
    return req.user;
  }
}
