import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../services/user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Pagination,
  PaginationDto,
} from '../../../helpers/decorators/pagination.decorator';
import { UserEntity } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller({
  version: '1',
  path: 'users',
})
@UseGuards(AuthGuard('jwt'))
@ApiTags('admin.user')
@ApiBearerAuth('access-token')
export class UserAdminController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
    type: UserEntity,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all users.',
    type: [UserEntity],
  })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'perPage', type: Number, required: false })
  @Get()
  findAll(@Pagination() pagination: PaginationDto): Promise<UserEntity[]> {
    return this.userService.findAll(pagination);
  }

  @ApiOperation({ summary: 'Get all total' })
  @ApiResponse({
    status: 200,
    description: 'Returns all total users.',
    type: Number,
  })
  @Get('total')
  getTotal(): Promise<number> {
    return this.userService.getTotal();
  }

  @ApiOperation({ summary: 'Get User by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user with the specified ID.',
    type: UserEntity,
  })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update User by ID' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserEntity,
  })
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete User by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: Number,
  })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<number> {
    return this.userService.remove(id);
  }
}
