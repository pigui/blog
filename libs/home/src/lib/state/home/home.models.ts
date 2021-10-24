/**
 * Interface for the 'Home' data
 */
export interface BlogEntity {
  id: string; // Primary ID
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBlog {
  title: string;
  text: string;
}
