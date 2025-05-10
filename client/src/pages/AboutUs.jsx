import React from 'react';
import PageTemplate from './PageTemplate';

const AboutUs = () => {
  return (
    <PageTemplate title="About Us">
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700">
          TerraNova is a leading real estate agency committed to helping you find your perfect property.
          With years of experience in the market, we provide exceptional service and expertise to our clients.
        </p>
      </div>
    </PageTemplate>
  );
};

export default AboutUs;