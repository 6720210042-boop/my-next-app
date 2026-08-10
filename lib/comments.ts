export interface Comment {
  id: string;
  postId: string;
  author: string;
  text: string;
  createdAt: string;
}

const comments: Comment[] = [];

export function addComment(data: Omit<Comment, 'id' | 'createdAt'>) {
  const item: Comment = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
  };
  comments.push(item);
  return item;
}

export function getCommentsByPostId(postId: string) {
  return comments.filter((c) => c.postId === postId);
}