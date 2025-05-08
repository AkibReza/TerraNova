import React from 'react';
import PageTemplate from './PageTemplate';

const Blog = () => {
  return (
    <PageTemplate title="Blog">
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700">
          Stay tuned for our latest real estate insights and market updates.
        </p>
      </div>
    </PageTemplate>
  );
};

export default Blog;