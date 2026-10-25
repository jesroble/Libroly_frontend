export interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    content1?: string;
    content2?: string;
    imageUrl: string;
    date: string;
    category: string;
    readTime: string;
}
