import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { CreatedBlogDto } from '../dto/created-blog.dto';
import { BlogEntity } from '../entities/blog.entity';

@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity> {
  async orderByCreatedAt(): Promise<BlogEntity[]> {
    return await this.createQueryBuilder('blog').getMany();
  }

  async saveBlog(
    newBlog: CreatedBlogDto,
    user: UserEntity
  ): Promise<BlogEntity> {
    const blog = this.create({ ...newBlog, user: user });
    await blog.save();
    return blog;
  }
}
