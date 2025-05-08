import React from 'react';
import PageTemplate from './PageTemplate';

const FAQs = () => {
  return (
    <PageTemplate title="Frequently Asked Questions">
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700">
          Common questions and answers about our services will be available here soon.
        </p>
      </div>
    </PageTemplate>
  );
};

export default FAQs;