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
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
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
import { DeleteResult } from 'typeorm';

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
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiHeader({ name: 'Bear', description: 'Bearer <token>' })
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all Users' })
  @ApiBody({ type: PaginationDto })
  @ApiResponse({ status: 200, description: 'Returns all users.' })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @ApiQuery({ name: 'perPage', type: Number, required: false })
  @ApiHeader({ name: 'Bear', description: 'Bearer <token>' })
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
  @ApiHeader({ name: 'Bear', description: 'Bearer <token>' })
  @Get('total')
  getTotal(): Promise<number> {
    return this.userService.getTotal();
  }

  @ApiOperation({ summary: 'Get User by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user with the specified ID.',
  })
  @ApiHeader({ name: 'Bear', description: 'Bearer <token>' })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserEntity> {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update User by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiHeader({ name: 'Bear', description: 'Bearer <token>' })
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
  })
  @ApiHeader({ name: 'Bear', description: 'Bearer <token>' })
  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.userService.remove(id);
  }
}
