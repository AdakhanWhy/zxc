import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Watchlist } from './models/watchlist.model';
import { CreateWatchlistDto } from './dto/create-watchlist.dto';

@Injectable()
export class WatchlistService {
  constructor(
    @InjectModel(Watchlist)
    private readonly watchlistRepository: typeof Watchlist,
  ) {}

  async createAsset(user, createAssetDto: CreateWatchlistDto) {
    const watchlist = {
      user: user.id,
      name: createAssetDto.name,
      assetId: createAssetDto.assetId,
    };
    await this.watchlistRepository.create(watchlist);
    return watchlist;
  }

  async deleteAsset(userId: number, assetId: string): Promise<boolean> {
    await this.watchlistRepository.destroy({
      where: { id: userId, user: assetId },
    });
    return true;
  }
}
