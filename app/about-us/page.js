import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 mt-20">
      <h1 className="text-4xl font-bold text-primary">About Us</h1>
      <p className="mt-4 text-text text-lg text-center max-w-2xl">
        Welcome to <span className="font-semibold text-primary">MediApp</span>, your one-stop solution for connecting patients with healthcare providers.
        Our goal is to make healthcare more accessible and efficient by providing a platform that allows patients to easily find and book appointments with qualified doctors.
      </p>

      <div className="mt-12 w-full max-w-4xl text-center">
        <h2 className="text-3xl font-semibold text-primary">Our Mission</h2>
        <p className="mt-4 text-text text-lg">
          At MediApp, we believe in providing high-quality healthcare services by connecting people with expert medical professionals. Our mission is to bridge the gap between patients and doctors through a seamless, user-friendly platform.
        </p>
      </div>

      <div className="mt-12 w-full max-w-4xl">
        <h2 className="text-3xl font-semibold text-primary text-center">Meet the Team</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-1">
          {/* Add Team Members */}
          

          <div className="flex flex-col items-center text-center">
            <Image
              src="" 
              alt="Team Member 2"
              className="w-40 h-40 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-text">Romel</h3>
            <p className="text-sm text-gray-500">Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}
