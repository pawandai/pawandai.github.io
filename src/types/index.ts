export interface Post {
  id: number;
  title: string;
  topics: string[];
  slug: string;
  category: string;
  tags: string[];
  content: string;
  createdAt: Date | string;
  timeToRead: number;
}
