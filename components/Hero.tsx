import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-black text-white px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black z-10" />
      
      <div className="relative z-20 max-w-5xl text-center">
        <span className="inline-block mb-4 text-sm font-medium tracking-[0.3em] uppercase text-gray-400">
          Motive sua audiência
        </span>
        
        <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-tighter leading-none mb-6">
          Eleve sua <span className="text-orange-500">marca</span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
          Transformamos sua visão em impacto cinematográfico. Filmes que não apenas mostram, mas comunicam, emocionam e geram resultados reais para o seu negócio.
        </p>

        <a 
          href="#form" 
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 rounded-full transition-all hover:scale-105 active:scale-95 uppercase tracking-wider"
        >
          Quero elevar o nível
        </a>
      </div>
    </section>
  )
}