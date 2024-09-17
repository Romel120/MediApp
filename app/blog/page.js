export default function Blog() {
  return (
    <div>
      {/* Blog Banner Section */}
      <section
        className="py-10 px-4 bg-white mt-24"
        style={{
          backgroundImage: `url('/assets/capture.png')`,
          backgroundRepeat: 'repeat',
        }}
      >
        <h2 className="text-4xl font-bold text-white mb-6 text-center">Blogs</h2>
      </section>

      {/* Main Content Section with Cards and Sidebar */}
      <section className="py-10 px-4 bg-white mt-18 flex justify-evenly">
        {/* Cards Section */}
        <div className="w-3/4 flex space-x-8 p-8">
          {/* Card 1 */}
          <div className="w-1/2 bg-white rounded-lg shadow-lg  overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src="/path/to/your/image1.jpg" // Replace with your image path
              alt="Card 1"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-primary">Card Headline 1</h2>
              <p className="text-gray-500 text-sm">September 18, 2024</p>
              <p className="text-text mt-2">This is a short description of the card. It gives an overview of the content.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="w-1/2 bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src="/path/to/your/image2.jpg" // Replace with your image path
              alt="Card 2"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-primary">Card Headline 2</h2>
              <p className="text-gray-500 text-sm">September 18, 2024</p>
              <p className="text-text mt-2">This is a short description of the card. It gives an overview of the content.</p>
            </div>
          </div>
        </div>

        

        {/* Sidebar Section */}
        <aside className="w-1/5 bg-slate-50 p-6 shadow-xl border-2  ">
          <h2 className="text-2xl font-bold text-primary mb-4">Popular Articles</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <span className="material-icons text-primary mr-2">star</span>
              <a href="#" className="text-text hover:underline">Card Headline 1</a>
            </li>
            <li className="flex items-center">
              <span className="material-icons text-primary mr-2">star</span>
              <a href="#" className="text-text hover:underline">Card Headline 2</a>
            </li>
            {/* Add more list items as needed */}
          </ul>
        </aside>
      </section>
    </div>
  );
}
