export default function Numbers() {
  const stats = [
    { label: "Anos de Atuação", value: "+10", category: "Market Presence" },
    { label: "Clientes Satisfeitos", value: "+300", category: "Partnerships" },
    { label: "Filmes Registrados", value: "+500", category: "Database Log" },
    { label: "Projetos Entregues", value: "+2k", category: "Success Rate" },
  ]

  return (
    <section className="bg-black text-white py-24 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-mono text-orange-500 mb-2">System Metrics</h2>
          <p className="text-3xl font-bold uppercase tracking-tight">Impacto em Números</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center md:items-start border-l border-white/20 pl-6">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">
                {stat.category}
              </span>
              <span className="text-4xl md:text-5xl font-black text-white mb-1">
                {stat.value}
              </span>
              <span className="text-xs uppercase font-medium text-gray-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}