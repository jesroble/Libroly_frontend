import { Link } from 'react-router-dom';
import type { BlogPost } from '../../types';

const BlogCard = ({ post }: { post: BlogPost }) => {
  const { title, excerpt, imageUrl, date, category, readTime } = post;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>{category}</span>
          <span>{readTime}</span>
        </div>
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-2">{excerpt}</p>
        <div className="text-sm text-gray-400 mb-4">{date}</div>
        <Link
          to={`/blog/${post.id}`}
          className="text-coral-500 hover:underline font-medium text-sm"
        >
          Leer más
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
