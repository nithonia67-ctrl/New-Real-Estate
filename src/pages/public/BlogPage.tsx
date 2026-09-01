import React, { useState } from 'react';
import { BookOpen, Clock, User, Share2, Sparkles, Search, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BlogPost } from '../../types';

export const BlogPage: React.FC = () => {
  const { blogPosts, showToast } = useApp();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleShare = (title: string) => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(`Article "${title}" link copied!`);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <span className="text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
            Market Intelligence & Due Diligence
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-1">
            East Africa Property Research & Legal Guides
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            In-depth analysis on land registry searches, diaspora mortgage structuring, rental yields in Westlands, and ZIPA investment regulations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Article Reading Modal/View if selected */}
        {selectedPost ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 mb-12 max-w-4xl mx-auto">
            <button 
              onClick={() => setSelectedPost(null)}
              className="text-xs font-bold text-emerald-600 hover:underline mb-4 inline-block"
            >
              ← Back to all articles
            </button>

            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase">
              {selectedPost.category}
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 leading-tight">
              {selectedPost.title}
            </h2>

            <div className="flex items-center space-x-4 text-xs text-slate-500 my-4 pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <img src={selectedPost.authorAvatar} alt={selectedPost.authorName} className="w-8 h-8 rounded-full object-cover" />
                <span className="font-bold text-slate-800">{selectedPost.authorName}</span>
              </div>
              <span>•</span>
              <span>{selectedPost.publishedAt}</span>
              <span>•</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <div className="h-80 rounded-2xl overflow-hidden mb-6 bg-slate-100">
              <img src={selectedPost.coverImage} alt={selectedPost.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {selectedPost.content}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
              <button 
                onClick={() => handleShare(selectedPost.title)}
                className="flex items-center space-x-2 text-xs font-bold text-slate-700 hover:text-emerald-600 bg-slate-100 px-4 py-2 rounded-xl transition"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Legal Guide</span>
              </button>

              <button 
                onClick={() => setSelectedPost(null)}
                className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
              >
                Done Reading
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div 
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-52 overflow-hidden bg-slate-100 relative">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-extrabold uppercase">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-emerald-600 transition leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 mt-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <img src={post.authorAvatar} alt={post.authorName} className="w-6 h-6 rounded-full object-cover" />
                    <span className="font-semibold">{post.authorName}</span>
                  </div>
                  <span className="text-slate-400">{post.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
