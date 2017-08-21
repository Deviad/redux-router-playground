import * as React from 'react';

declare class PostsIndex extends React.Component<PostsIndexProps, any> {
}

export interface PostsIndexProps {
fetchPosts(): Post[]
posts: Post[]
}

export interface Post {
    id: number,
    title: string;
    categories: string;
    content: string;
}
