import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="pt-20">

        {/* HERO SECTION */}
        <section className="relative h-[80vh] flex items-center justify-center">
          <Image
            src="/campus-bg.jpg"
            alt="Campus Background"
            fill
            className="object-cover brightness-50"
          />
          <div className="relative text-center text-white px-6">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              Welcome to ABC College
            </h1>
            <p className="mt-4 text-lg max-w-2xl mx-auto drop-shadow-md">
              Empowering students with world-class education, modern facilities,
              and a strong academic foundation.
            </p>

            <a
              href="/register"
              className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
            >
              Apply for Admission 2026
            </a>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">About Our College</h2>
            <p className="text-gray-50 leading-relaxed">
              ABC College is among India’s top educational institutions,
              dedicated to academic excellence, innovation, and holistic
              development. With highly qualified faculty and world-class
              infrastructure, we prepare students for global opportunities.
            </p>
            <p className="mt-4 text-gray-50 leading-relaxed">
              Our mission is to cultivate a learning environment where students
              can excel academically, grow personally, and build rewarding
              careers.
            </p>
          </div>

          <Image
            src="/campus-bg.jpg"
            width={600}
            height={350}
            alt="Campus"
            className="rounded-xl shadow-lg"
          />
        </section>

        {/* COURSES SECTION */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-10">Our Courses</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "BCA - Computer Applications",
                  desc: "Software Development, AI, Cloud & Web Technologies.",
                },
                {
                  name: "BBA - Business Administration",
                  desc: "Management, Marketing, Finance & Leadership Skills.",
                },
                {
                  name: "BA - Humanities",
                  desc: "Psychology, Sociology, Literature & Social Studies.",
                },
              ].map((course, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold">{course.name}</h3>
                  <p className="mt-3 text-gray-600">{course.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-6 text-center">
            {[
              ["10,000+", "Students"],
              ["120+", "Faculty Members"],
              ["30+", "Courses"],
              ["25 Years", "Excellence"],
            ].map(([value, label], i) => (
              <div key={i} className="p-6 shadow rounded-xl bg-gray-50">
                <h3 className="text-4xl font-bold text-blue-700">{value}</h3>
                <p className="text-gray-600 mt-2">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PRINCIPAL MESSAGE */}
        <section className="max-w-6xl mx-auto py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            Message from the Principal
          </h2>

          <div className="bg-blue-50 p-10 rounded-xl shadow-md">
            <p className="text-lg text-gray-700 leading-relaxed">
              “Education is not just about acquiring knowledge, but about
              empowering oneself to create a meaningful impact in society. At
              ABC College, we focus on holistic development, preparing students
              to face real-world challenges with confidence.”
            </p>

            <p className="mt-6 font-semibold text-blue-700">
              — Dr. R. K. Pandit, Principal
            </p>
          </div>
        </section>

        {/* FACILITIES */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-10">Campus Facilities</h2>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                ["Modern Library", "Thousands of books & digital journals."],
                ["Computer Labs", "High-end systems with fast internet."],
                ["Sports Complex", "Cricket, football, indoor games & more."],
              ].map(([title, desc], i) => (
                <div className="bg-white p-6 rounded-xl shadow" key={i}>
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="mt-2 text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EVENTS SECTION */}
        <section className="max-w-6xl mx-auto py-16 px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Latest Events & Notices</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 shadow rounded-xl">
              <h3 className="text-xl font-semibold">Annual Tech Fest 2026</h3>
              <p className="text-gray-700 mt-2">
                Competitions, Hackathons, Tech Talks & Prizes.
              </p>
            </div>
            <div className="bg-white p-6 shadow rounded-xl">
              <h3 className="text-xl font-semibold">Admissions Open 2026</h3>
              <p className="text-gray-700 mt-2">
                Apply now for undergraduate and postgraduate programs.
              </p>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="bg-gray-100 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-10">Campus Gallery</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <Image
                  key={n}
                  src={`/campus${n}.jpg`}
                  width={400}
                  height={250}
                  alt={`Campus ${n}`}
                  className="rounded-xl shadow-md"
                />
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-blue-900 text-white py-10">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-3">ABC College</h3>
              <p>Shaping the leaders of tomorrow with quality education.</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-gray-200">
                <li><a href="/">Home</a></li>
                <li><a href="/courses">Courses</a></li>
                <li><a href="/register">Admissions</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Contact</h3>
              <p>Sector 20, New Delhi</p>
              <p>📞 +91 9876543210</p>
              <p>📧 info@abccollege.edu.in</p>
            </div>
          </div>

          <p className="text-center text-gray-300 mt-6">
            © 2026 ABC College. All Rights Reserved.
          </p>
        </footer>

      </div>
    </>
  );
}
