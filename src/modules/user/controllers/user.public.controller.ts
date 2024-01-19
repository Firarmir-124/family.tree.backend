import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "../services/user.service";

@Controller({
  version: '1',
  path: 'users',
})
@ApiTags('public.user')
export class UserPublicController {
  constructor(
    private readonly userService: UserService,
  ) {
  }
  @Get()
  async users() {
    return await this.userService.getEmployees();
  }
}