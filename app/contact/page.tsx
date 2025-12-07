import Navbar from "../../components/Navbar";

export default function Contact() {
  return (
    <>
      <Navbar />

      <div className="pt-24 max-w-5xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

        <p className="text-gray-700 mb-4">
          Have questions? Feel free to reach out.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-semibold mb-2">College Address</h2>
            <p className="text-gray-0">
              ABC College,  
              Sector 20,  
              New Delhi, India  
            </p>
            <p className="mt-4 text-gray-100">
              📞 +91 9876543210  
              <br />
              📧 info@abccollege.edu.in
            </p>
          </div>

          <form className="bg-white p-6 shadow-md rounded-xl">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-3 rounded mb-4"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-3 rounded mb-4"
            />
            <textarea
              placeholder="Message"
              className="w-full border p-3 rounded mb-4 h-32"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
