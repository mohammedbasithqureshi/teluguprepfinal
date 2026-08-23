import PostForm from '@/components/admin/PostForm';

export default function NewPostPage() {
  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-bold mb-6">Add New Post</h1>
      <PostForm />
    </div>
  );
}