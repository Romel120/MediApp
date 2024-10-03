import Image from "next/image";

export default function Blog() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Blog Banner Section */}
      <section
        className="relative py-20"
        style={{
          backgroundImage: `url('/assets/capture.png')`,
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-5xl font-extrabold text-white">Latest Blogs</h2>
          <p className="mt-4 text-xl text-gray-200">Insights, articles, and stories just for you</p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto py-16 px-6 flex flex-wrap justify-between space-y-10 lg:space-y-0 lg:flex-nowrap">
        {/* Cards Section */}
        <div className="w-full lg:w-3/4 flex flex-wrap justify-between gap-8">
          {/* Card 1 */}
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
            <Image
              className="w-full h-64 object-cover"
              width={500} height={500}
              src=""
              alt="Blog Post 1"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary">Blog Headline 1</h3>
              <p className="text-gray-500 text-sm mt-2">Published on September 18, 2024</p>
              <p className="text-text mt-4">
                Discover the latest insights on modern web development and design trends.
              </p>
              <a href="#" className="inline-block mt-4 text-blue-500 hover:underline">
                Read more &rarr;
              </a>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105">
            <Image
              className="w-full h-64 object-cover"
              src=""
              width={500} height={500}
              alt="Blog Post 2"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-primary">Blog Headline 2</h3>
              <p className="text-gray-500 text-sm mt-2">Published on September 18, 2024</p>
              <p className="text-text mt-4">
                Explore new innovations in technology, from AI to blockchain.
              </p>
              <a href="#" className="inline-block mt-4 text-blue-500 hover:underline">
                Read more &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar Section */}
        <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-primary mb-6">Popular Articles</h2>
          <ul className="space-y-6">
            <li>
              <a
                href="#"
                className="flex items-center text-text hover:underline transition-all duration-200"
              >
                <span className="material-icons text-primary mr-3">star</span>
                How to Become a Full-Stack Developer
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-text hover:underline transition-all duration-200"
              >
                <span className="material-icons text-primary mr-3">star</span>
                The Future of Artificial Intelligence
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-text hover:underline transition-all duration-200"
              >
                <span className="material-icons text-primary mr-3">star</span>
                Understanding Cloud Computing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center text-text hover:underline transition-all duration-200"
              >
                <span className="material-icons text-primary mr-3">star</span>
                Top 10 Web Design Trends in 2024
              </a>
            </li>
          </ul>
        </aside>
      </section>
    </div>
  );
}
