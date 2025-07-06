import Footer from "../footer/Footer";
import Header from "../header/Header";

export default function About() {
  return (
    <>
    <Header/>
    <div className="py-20 bg-white">
      <div className="container mx-auto px-6 text-gray-700 md:px-12 xl:px-6">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">

          <div className="w-full md:w-7/12">
            <h1 className="text-4xl sm:text-5xl font-bold text-center text-indigo-700 py-6">
  All in One Store
</h1>

            <h3 className="mt-2 text-lg md:text-xl font-medium text-gray-800">
              Your One-Stop Digital Bazaar
            </h3>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-600">
              <strong>AllinOneStore</strong> is your ultimate online shopping destination
              where quality meets convenience. From electronics and fashion to groceries,
              home essentials, and personal care — we bring everything you need under one roof.
            </p>

            <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-600">
              Built with the vision to simplify your shopping experience, AllinOneStore offers
              a user-friendly interface, secure payments, quick delivery, and 24/7 customer support.
              We aim to save your time, energy, and money while delivering value and satisfaction
              with every order.
            </p>

            <p className="mt-4 text-base md:text-lg leading-relaxed text-gray-600">
              With a wide product range, unbeatable deals, and trusted service, AllinOneStore is
              more than just an e-commerce platform — it’s your everyday shopping companion.
              Whether you're shopping for your home, lifestyle, or loved ones, we’ve got you covered.
            </p>

            <div className="mt-6">
              <span className="block text-lg md:text-xl font-semibold text-indigo-700">
                AllinOneStore – Everything You Need, Just a Click Away.
              </span>
            </div>
          </div>

          <div className="w-full md:w-5/12">
            <img
              src="https://inwayhosting.com/data/uploads/ecommerce.png"
              alt="E-commerce Illustration"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
