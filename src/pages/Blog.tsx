import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts, getCategories } from '../data/blogPosts';

function Blog() {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') ?? 'All');
  const categories = useMemo(() => getCategories(), []);

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return blogPosts;
    return blogPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block bg-teal-50 text-[#0D9488] text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              Brain Health Insights
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1220] mb-3">Our Blog</h1>
            <p className="text-gray-500 text-base">
              Expert-written articles on EEG tests, epilepsy, sleep disorders, and brain health from Kampala's leading diagnostic center.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveCategory('All')}
              className={`text-xs font-medium px-4 py-2 rounded-full transition-colors ${activeCategory === 'All' ? 'bg-[#0D9488] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              All ({blogPosts.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`text-xs font-medium px-4 py-2 rounded-full transition-colors ${activeCategory === cat.name ? 'bg-[#0D9488] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all"
              >
                {post.image && (
                  <div className="relative h-52 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur text-[#0D9488] text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </div>
                  <h2 className="text-lg font-semibold text-[#0B1220] mb-2 group-hover:text-[#0D9488] transition-colors">{post.title}</h2>
                  <p className="text-sm text-gray-500 mb-4 flex-1">{post.excerpt}</p>
                  <span className="flex items-center gap-1 text-sm font-medium text-[#0D9488]">
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Blog;
