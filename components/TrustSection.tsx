'use client';

export default function TrustSection() {
  return (
    <section className="py-12 bg-white w-full border-t border-gray-200 mt-10 rounded-xl shadow-sm">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8 text-black">Pourquoi choisir notre laboratoire ?</h2>
        
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-teal-50 rounded-lg hover:shadow-md transition">
            <div className="text-4xl font-bold text-teal-600 mb-2">200+</div>
            <p className="text-gray-700 font-semibold">Cliniques Partenaires</p>
          </div>
          <div className="text-center p-6 bg-teal-50 rounded-lg hover:shadow-md transition">
            <div className="text-4xl font-bold text-teal-600 mb-2">100%</div>
            <p className="text-gray-700 font-semibold">Qualité Médicale GMP</p>
          </div>
          <div className="text-center p-6 bg-teal-50 rounded-lg hover:shadow-md transition">
            <div className="text-4xl font-bold text-teal-600 mb-2">24/7</div>
            <p className="text-gray-700 font-semibold">Support WhatsApp</p>
          </div>
        </div>
      </div>
    </section>
  );
}