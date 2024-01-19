import { Body, Controller, Delete, Get, Injectable, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserService } from "../services/user.service";
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Pagination, PaginationDto } from "../../../helpers/decorators/pagination.decorator";

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
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all Users' })
  @ApiBody({ type: PaginationDto })
  @ApiResponse({ status: 200, description: 'Returns all users.' })
  @Get()
  findAll(
    @Pagination() pagination: PaginationDto,
  ) {
    return this.userService.findAll({}, {
      skip: (pagination.page - 1) * pagination.perPage,
      limit: pagination.perPage,
    });
  }

  @Get('total')
  getTotal() {
    return this.userService.getTotal({});
  }

  @ApiOperation({ summary: 'Get User by ID' })
  @ApiResponse({ status: 200, description: 'Returns the user with the specified ID.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update User by ID' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete User by ID' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
