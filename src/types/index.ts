export interface Post {
  id: string;
  title: string;
  topics: string;
  slug: string;
  category: string;
  tags: string;
  content: string;
  createdAt: Date | string;
  timeToRead: string;
  [key: string]: string | Date | number | string[];
}
