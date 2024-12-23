import { Body, Controller, Get, Put, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller({
  version: '1',
  path: 'profile',
})
@UseGuards(AuthGuard('jwt'))
@ApiTags('user-profile')
@ApiBearerAuth('access-token')
export class UserProfileController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getProfile(@Request() req) {
    return this.userService.findOne(req.user.id);
  }

  @Put('update')
  async updateProfile(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    return this.userService.update(req.user.id, updateUserDto);
  }
}
