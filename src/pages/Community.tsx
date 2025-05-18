import React from 'react';

const Community: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Community</h1>
        <div className="grid gap-6">
          {/* Add your community content here */}
          <p className="text-gray-600">
            Welcome to our community page. This is where we'll showcase our community initiatives and engagement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Community; 