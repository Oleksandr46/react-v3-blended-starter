import { fetchPosts } from '@/lib/api';
import PostsClient from './Posts.client';

interface PostsPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { slug } = await params;
  const id = slug[0];
  const data = await fetchPosts({ searchText: '', page: 1, ...(id !== 'All' && { userId: id }) });
  return <PostsClient userId={id} initialData={data} />;
}
