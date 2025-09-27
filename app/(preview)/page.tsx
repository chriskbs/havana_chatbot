// app/page.tsx
import Image from "next/image";
import ChatWidget from "@/components/chatwidget";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-200">
      <header className="bg-blue-900 text-white py-6 text-center">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Havana University</h1>
          <nav className="space-x-4 hidden md:block">
            <a className="hover:underline">About</a>
            <a className="hover:underline">Admissions</a>
            <a className="hover:underline">Courses</a>
            <a className="hover:underline">Contact</a>
          </nav>
        </div>
      </header>


      <section className="relative aspect-[4/1] w-full">
        <Image
          src="/images/education_resource_centre_05.jpg"
          alt="Campus"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 text-white text-3xl font-semibold">
          Welcome to Havana University
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10 space-y-16">
   

        {/* About / Why Us */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Why Choose Havana University?</h2>
          <p className="text-gray-700 mb-6">
            At Havana University, we provide world-class education, a vibrant campus life, and countless opportunities to grow both academically and personally.
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <li className="bg-white p-6 rounded shadow">🏆 Ranked Top 100 Universities Worldwide</li>
            <li className="bg-white p-6 rounded shadow">💼 Strong Industry Partnerships & Career Support</li>
            <li className="bg-white p-6 rounded shadow">🌍 Diverse Student Community from 50+ Countries</li>
          </ul>
        </section>

        {/* Admissions Timeline */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Admissions Timeline</h2>
          <ol className="space-y-4">
            <li className="bg-white p-4 rounded shadow">
              <strong>Oct 1</strong> – Applications Open
            </li>
            <li className="bg-white p-4 rounded shadow">
              <strong>Dec 15</strong> – Early Decision Deadline
            </li>
            <li className="bg-white p-4 rounded shadow">
              <strong>Mar 31</strong> – Regular Decision Deadline
            </li>
            <li className="bg-white p-4 rounded shadow">
              <strong>Apr 15</strong> – Admission Results Announced
            </li>
          </ol>
        </section>

        {/* How to Apply */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">How to Apply</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow">1️⃣ Submit Online Application</div>
            <div className="bg-white p-6 rounded shadow">2️⃣ Upload Required Documents</div>
            <div className="bg-white p-6 rounded shadow">3️⃣ Pay Application Fee</div>
          </div>
        </section>

        {/* Tuition & Scholarships */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Tuition & Scholarships</h2>
          <p className="text-gray-700 mb-4">
            We believe education should be accessible. Demo University offers competitive tuition rates and a range of scholarships.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded shadow">💵 Tuition: $12,000/year</div>
            <div className="bg-white p-6 rounded shadow">🎓 Scholarships up to 50% available</div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded shadow">
              <strong>Q:</strong> What is the application deadline?<br />
              <strong>A:</strong> Regular applications close on March 31.
            </div>
            <div className="bg-white p-4 rounded shadow">
              <strong>Q:</strong> Are scholarships available?<br />
              <strong>A:</strong> Yes, we offer both merit and need-based scholarships.
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Contact Admissions</h2>
          <p className="text-gray-700 mb-2">📧 admissions@havanauniversity.edu</p>
          <p className="text-gray-700">📞 +65 1234 5678</p>
        </section>
      </section>


      <footer className="mt-auto bg-blue-900 border-t py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-white">
          © Havana University — built for chatbot demo
        </div>
      </footer>

      <ChatWidget />
    </main>
  );
}
