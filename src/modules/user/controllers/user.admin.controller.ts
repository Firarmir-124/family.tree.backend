import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../services/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiCreateUser } from '../decorators/create-user.decorator';
import { ApiFindOneUser } from '../decorators/findOne-user.decorator';
import { ApiUpdateUser } from '../decorators/update-user.decorator';
import { ApiDeleteUser } from '../decorators/delete-user.decorator';
import { RolesGuard } from '../../../global/guards/role.guard';

@Controller({
  version: '1',
  path: 'users',
})
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
@ApiTags('admin.user')
@ApiBearerAuth('access-token')
export class UserAdminController {
  constructor(private readonly userService: UserService) {}

  @ApiCreateUser()
  @Post()
  public create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

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
