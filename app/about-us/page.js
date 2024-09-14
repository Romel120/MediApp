// pages/about-us.js

export default function AboutUs() {
  return (
    <div className="bg-background min-h-screen py-16 px-4 mt-5">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-primary mb-8">About Us</h1>
        <p className="text-lg text-text mb-12">
          Welcome to MediApp, your trusted platform for connecting with healthcare professionals and managing your health appointments effortlessly.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
            <p className="text-text">
              At MediApp, our mission is to provide patients with easy access to doctors and medical services. We strive to bridge the gap between healthcare providers and patients by offering a user-friendly platform that simplifies the healthcare journey.
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">Our Vision</h2>
            <p className="text-text">
              We envision a world where healthcare is accessible to everyone, regardless of location. Our platform is designed to empower individuals to take control of their health by providing reliable information and quick access to healthcare providers.
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-text">
              <li>Accessibility</li>
              <li>Innovation</li>
              <li>Empathy</li>
              <li>Integrity</li>
              <li>Trust</li>
            </ul>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-primary mb-4">Meet the Team</h2>
            <p className="text-text">
              MediApp is built by a team of passionate individuals who are committed to improving the healthcare experience. Our team consists of healthcare professionals, software developers, and customer service specialists working together to make healthcare more accessible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
