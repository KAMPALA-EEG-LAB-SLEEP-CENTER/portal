import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Link2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts, getCategories, getRecentPosts, getRelatedPosts } from '../data/blogPosts';

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const [copied, setCopied] = useState(false);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const categories = getCategories();
  const recentPosts = getRecentPosts(post.slug, 3);
  const relatedPosts = getRelatedPosts(post.category, post.slug, 2);
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <Link to="/blog" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0D9488] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            <article className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 sm:p-10">
              <span className="inline-block bg-teal-50 text-[#0D9488] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {post.category}
              </span>

              <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </div>

              <h1 className="text-2xl sm:text-4xl font-bold text-[#0B1220] mb-6 leading-tight">{post.title}</h1>

              {post.image && (
                <img src={post.image} alt={post.title} className="w-full h-64 sm:h-96 object-cover rounded-2xl mb-6 shadow-md" />
              )}

              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
                <span className="text-xs text-gray-400 font-medium">Share this article:</span>
                {/* <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-[#0D9488] hover:text-white transition-colors" aria-label="Share on Facebook">
                  <Share2 className="w-4 h-4" />
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-[#0D9488] hover:text-white transition-colors" aria-label="Share on X">
                  <Share2 className="w-4 h-4" />
                </a> */}
                <button onClick={handleCopyLink} className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-[#0D9488] hover:text-white transition-colors" aria-label="Copy link">
                  <Link2 className="w-4 h-4" />
                </button>
                {copied && <span className="text-xs text-[#0D9488] font-medium">Link copied!</span>}
              </div>

              <div className="flex flex-col gap-6 text-sm text-gray-600 leading-relaxed">
                {post.content.map((section, i) => (
                  <div key={i}>
                    {section.heading && (
                      <h2 className="text-lg font-semibold text-[#0B1220] mb-2 mt-2">{section.heading}</h2>
                    )}
                    {section.image && (
                      <img src={section.image} alt={section.heading ?? post.title} className="w-full h-56 object-cover rounded-xl my-4" />
                    )}
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="mb-3">{p}</p>
                    ))}
                    {section.list && (
                      <ul className="list-disc pl-5 flex flex-col gap-1.5">
                        {section.list.map((item, k) => (
                          <li key={k}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs text-gray-500 leading-relaxed">
                <strong className="text-[#0B1220]">Medical Disclaimer:</strong> The information provided in this article is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <Link to="/book" className="inline-flex items-center gap-2 bg-[#0D9488] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#0B7C71] transition-colors">
                  Book an EEG Test
                </Link>
              </div>
            </article>

            <aside className="flex flex-col gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-sm font-semibold text-[#0B1220] mb-4">Categories</h3>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <Link key={cat.name} to={`/blog?category=${encodeURIComponent(cat.name)}`} className="flex items-center justify-between text-sm text-gray-600 hover:text-[#0D9488] transition-colors py-1">
                      {cat.name}
                      <span className="text-xs text-gray-400">{cat.count}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {recentPosts.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-sm font-semibold text-[#0B1220] mb-4">Recent Posts</h3>
                  <div className="flex flex-col gap-4">
                    {recentPosts.map((p) => (
                      <Link key={p.slug} to={`/blog/${p.slug}`} className="flex gap-3 group">
                        {p.image && (
                          <img src={p.image} alt={p.title} className="w-16 h-16 object-cover rounded-lg shrink-0" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-[#0B1220] group-hover:text-[#0D9488] transition-colors leading-snug mb-1">{p.title}</p>
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="w-3 h-3" />
                            {p.date}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-[#0B1220] rounded-2xl p-6 text-white">
                <h3 className="text-sm font-semibold mb-2">Ready to Get Answers?</h3>
                <p className="text-xs text-gray-300 mb-5">
                  If you or a loved one are experiencing symptoms, an EEG test can provide clarity. Book a consultation today.
                </p>
                <Link to="/book" className="block text-center bg-[#0D9488] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#0B7C71] transition-colors">
                  Book an EEG Test
                </Link>
              </div>
            </aside>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-semibold text-[#0B1220] mb-6">Related Articles</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {relatedPosts.map((p) => (
                  <Link key={p.slug} to={`/blog/${p.slug}`} className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all">
                    {p.image && (
                      <img src={p.image} alt={p.title} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                    )}
                    <div className="p-5">
                      <p className="text-xs text-[#0D9488] font-medium mb-1">{p.category}</p>
                      <p className="text-sm font-semibold text-[#0B1220] group-hover:text-[#0D9488] transition-colors">{p.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default BlogPost;
