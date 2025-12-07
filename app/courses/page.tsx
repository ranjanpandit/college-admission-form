import Navbar from "../../components/Navbar";

export default function Courses() {
  return (
    <>
      <Navbar />

      <div className="pt-24 max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-10">Our Courses</h1>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "BCA – Computer Applications",
              desc: "Learn coding, AI, ML, cloud & development.",
            },
            {
              title: "BBA – Business Administration",
              desc: "Marketing, finance, HR & entrepreneurship.",
            },
            {
              title: "BA – Arts & Humanities",
              desc: "Psychology, Literature, Sociology & Economics.",
            },
          ].map((course, index) => (
            <div className="p-6 shadow-md bg-white rounded-xl" key={index}>
              <h3 className="text-2xl text-gray-500 font-semibold">{course.title}</h3>
              <p className="text-gray-600 mt-2">{course.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
