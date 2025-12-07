import Navbar from "../../components/Navbar";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="pt-24 px-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Our College</h1>
        <p className="text-gray-50 text-lg leading-relaxed">
          ABC College is one of India's premier institutions committed to
          excellence in education, research, and innovation. With a legacy of
          academic brilliance, we aim to nurture young minds into future
          leaders.
        </p>
      </div>
    </>
  );
}
