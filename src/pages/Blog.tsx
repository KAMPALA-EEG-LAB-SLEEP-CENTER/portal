import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts } from '../data/blogPosts';

function Blog() {
  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block bg-teal-50 text-[#0D9488] text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              Brain Health Insights
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1220] mb-3">Our Blog</h1>
            <p className="text-gray-500 text-base">
              Expert-written articles on EEG tests, epilepsy, sleep disorders, and brain health from Kampala's leading diagnostic center.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  {post.date}
                </div>
                <h2 className="text-lg font-semibold text-[#0B1220] mb-2">{post.title}</h2>
                <p className="text-sm text-gray-500 mb-4 flex-1">{post.excerpt}</p>
                <span className="flex items-center gap-1 text-sm font-medium text-[#0D9488]">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </span>
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
