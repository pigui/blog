import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UserEntity } from '../user/entities/user.entity';
import { BlogService } from './blog.service';
import { CreatedBlogDto } from './dto/created-blog.dto';
import { BlogEntity } from './entities/blog.entity';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  find(): Observable<BlogEntity[]> {
    return this.blogService.orderByCreatedAt();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  save(
    @Body() createBlogDto: CreatedBlogDto,
    @GetUser() user: UserEntity
  ): Observable<BlogEntity> {
    return this.blogService.save(createBlogDto, user);
  }
}
