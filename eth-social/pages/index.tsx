// pages/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import PostComposer from '../components/PostComposer';
import PostCard from '../components/PostCard';


type Post = {
  id: number;
  wallet_address: string;
  content: string;
  timestamp: string;
};

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    axios.get('/api/posts').then((res) => setPosts(res.data));
  }, []);

  const handleNewPost = async (content: string) => {
  const response = await axios.post('/api/posts', { content });
  const newPost = response.data;
  setPosts([newPost, ...posts]);
};


  return (
    <div className="max-w-xl mx-auto mt-8 px-4">
      <PostComposer onPost={handleNewPost} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
