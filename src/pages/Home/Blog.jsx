import { Link } from "react-router";

const Blog = () => {
  const articles = [
    {
      title: "The Rise of Home Cooking Culture",
      excerpt:
        "How LocalChefBazaar is bringing back the tradition of home-cooked meals in the digital age.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      date: "Dec 15, 2024",
      readTime: "5 min read",
    },
    {
      title: "Healthy Eating Made Easy",
      excerpt:
        "Tips and tricks for maintaining a balanced diet with our diverse meal offerings.",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
      date: "Dec 10, 2024",
      readTime: "4 min read",
    },
    {
      title: "Supporting Local Communities",
      excerpt:
        "How our platform empowers local chefs and strengthens neighborhood connections.",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400",
      date: "Dec 5, 2024",
      readTime: "6 min read",
    },
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white tracking-tight mb-4">
          Food <span className="text-primary">Stories</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Insights, tips, and stories from the world of food and our amazing
          community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                <span>{article.date}</span>
                <span className="mx-2">•</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3 line-clamp-2">
                {article.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              <Link
                to="#"
                className="text-primary font-medium hover:text-orange-600 transition-colors"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
