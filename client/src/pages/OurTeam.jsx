import React from 'react';
import PageTemplate from './PageTemplate';

const OurTeam = () => {
  return (
    <PageTemplate title="Our Team">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Meet Our Team</h2>
          <p className="text-gray-600">
            Our team information will be available soon.
          </p>
        </div>
      </div>
    </PageTemplate>
  );
};

export default OurTeam;