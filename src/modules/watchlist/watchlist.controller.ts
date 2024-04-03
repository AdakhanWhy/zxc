import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('watchlist')
export class WatchlistController {
  constructor(private readonly watchlistService: WatchlistService) {}

  @ApiTags('API')
  @ApiResponse({ status: 201 })
  @Post('create')
  @UseGuards(JwtAuthGuard)
  createAsset(@Req() req, @Body() createAssetDto: CreateWatchlistDto) {
    const user = req.user;
    return this.watchlistService.createAsset(user, createAssetDto);
  }

  @ApiTags('API')
  @ApiResponse({ status: 200 })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteAsset(@Query('id') assetId: string, @Req() req): Promise<boolean> {
    const { id } = req.user.id;
    return this.watchlistService.deleteAsset(id, assetId);
  }
}
