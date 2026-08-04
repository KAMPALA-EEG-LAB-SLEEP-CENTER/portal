import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogPosts } from '../data/blogPosts';

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <>
      <Navbar />
      <article className="bg-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Link to="/blog" className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#0D9488] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1220] mb-10 leading-tight">{post.title}</h1>

          <div className="flex flex-col gap-6 text-sm text-gray-600 leading-relaxed">
            {post.content.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="text-lg font-semibold text-[#0B1220] mb-2 mt-2">{section.heading}</h2>
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

          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link to="/book" className="inline-flex items-center gap-2 bg-[#0D9488] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#0B7C71] transition-colors">
              Book an EEG Test
            </Link>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}

export default BlogPost;
