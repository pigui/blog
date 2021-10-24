import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogRepository } from './repositories/blog.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BlogRepository])],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
