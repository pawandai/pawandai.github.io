export interface Post {
  title: string;
  topics: string;
  slug: string;
  category: string;
  image: string;
  tags: string;
  content: string;
  createdAt: Date | string;
  timeToRead: string;
  [key: string]: string | Date | number | string[];
}
