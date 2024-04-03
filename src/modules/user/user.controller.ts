import {
  Body,
  Controller,
  Delete,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiTags('API')
  @ApiResponse({ status: 200, type: UpdateUserDto })
  @Patch()
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    const user = req.user;
    return this.userService.updateUser(user.email, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteUser(@Req() req): Promise<boolean> {
    const user = req.user;
    return this.userService.deleteUser(user.email);
  }
}
