const Hero: React.FC = () => {
    return (
      <section className="relative w-full bg-gradient-to-r from-purple-800  via-black to-black text-white py-28">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Remove Background From Images For Free
            </h1>
            <p className="text-gray-300 mb-6">
              Experience accurate background removal. Sign up today to avail your first 3 credits for free!
            </p>
  
            {/* Upload Box */}
            <div className="bg-black border border-gray-700 p-20 rounded-xl shadow-lg">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg w-full">
                Upload Image
              </button>
              <p className="text-gray-400 text-sm mt-3">Or drag an image here.</p>
              <p className="text-gray-500 text-xs mt-2">
                By uploading an image or URL, you agree to our <a href="#" className="underline">Terms of Service</a>.
              </p>
            </div>
          </div>
  
          {/* Right Side - Image Preview */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <div className="relative">
              <img
                src="./images/logo/hero.gif" // Replace with actual image URL
                alt="Preview"
                className="rounded-lg border-4 border-blue-500 shadow-xl w-72"
              />
             
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Hero;
  