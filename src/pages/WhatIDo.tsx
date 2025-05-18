import React from 'react';

function WhatIDo() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">What I Do</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Service 1 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Service 1</h2>
          <p className="text-gray-600">
            Detailed description of service 1 and how it benefits clients.
          </p>
        </div>

        {/* Service 2 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Service 2</h2>
          <p className="text-gray-600">
            Detailed description of service 2 and how it benefits clients.
          </p>
        </div>

        {/* Service 3 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Service 3</h2>
          <p className="text-gray-600">
            Detailed description of service 3 and how it benefits clients.
          </p>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">How I Can Help You</h2>
        <div className="bg-gray-50 rounded-xl p-8">
          <p className="text-gray-700 leading-relaxed mb-6">
            Comprehensive description of your approach, methodology, and the value you bring to clients.
            This section can detail your experience, expertise, and what makes your services unique.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Additional information about your process, success stories, or any other relevant details
            that would help potential clients understand the benefits of working with you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default WhatIDo;