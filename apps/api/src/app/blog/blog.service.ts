import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { UserEntity } from '../user/entities/user.entity';
import { CreatedBlogDto } from './dto/created-blog.dto';
import { BlogEntity } from './entities/blog.entity';
import { BlogRepository } from './repositories/blog.repository';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogRepository)
    private readonly blogRepository: BlogRepository
  ) {}
  find(): Observable<BlogEntity[]> {
    return from(this.blogRepository.find());
  }

  orderByCreatedAt(): Observable<BlogEntity[]> {
    return from(this.blogRepository.find());
  }

  save(
    createBlogDto: CreatedBlogDto,
    user: UserEntity
  ): Observable<BlogEntity> {
    return from(this.blogRepository.saveBlog(createBlogDto, user));
  }
}
