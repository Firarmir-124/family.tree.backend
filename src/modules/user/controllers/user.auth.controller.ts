import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../services/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiFindOneUser } from '../decorators/findOne-user.decorator';
import { ApiUpdateUser } from '../decorators/update-user.decorator';
import { ApiDeleteUser } from '../decorators/delete-user.decorator';

@Controller({
  version: '1',
  path: 'users',
})
@UseGuards(AuthGuard('jwt'))
@ApiTags('auth.users')
@ApiBearerAuth('access-token')
export class UserAuthController {
  constructor(private readonly userService: UserService) {}

  @ApiFindOneUser()
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @ApiUpdateUser()
  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiDeleteUser()
  @Delete(':id')
  public remove(@Param('id') id: string): Promise<string> {
    return this.userService.remove(id);
  }
}
