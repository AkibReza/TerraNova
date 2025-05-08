import React from 'react';
import PageTemplate from './PageTemplate';

const ForSale = () => {
  return (
    <PageTemplate title="Properties For Sale">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-600">
            Our property listings will be available shortly. Please check back later.
          </p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default ForSale;