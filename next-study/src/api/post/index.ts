/**
 * @DIR /src/api/post/index.ts
 */

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export async function fetchPostList(): Promise<Post[]> {
  const result = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data: Post[] = await result.json();

  return data;
}

export async function fetchPost(id: string): Promise<Post> {
  const result = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const data: Post = await result.json();

  return new Promise<Post>((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 5000);
  });
}
