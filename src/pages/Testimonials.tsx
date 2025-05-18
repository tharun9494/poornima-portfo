import React from 'react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      role: "CEO, Company Inc.",
      content: "Working with this team has been an absolute pleasure. Their dedication and expertise have helped us achieve remarkable results.",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Marketing Director",
      content: "The level of professionalism and attention to detail is outstanding. I couldn't be happier with the results.",
      image: "https://via.placeholder.com/150"
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Project Manager",
      content: "Exceptional service and support throughout the entire process. Highly recommended!",
      image: "https://via.placeholder.com/150"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Testimonials</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-700 italic">"{testimonial.content}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials; 