import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
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

  @Get('logout')
  async logout(@Request() req) {
    req.logout();
  }
}
