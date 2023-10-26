import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { PrismaService } from './database/prisma.service';
import { PrismaModule } from './database/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CommonService, PrismaService],
  exports: [CommonService],
})
export class CommonModule {}
