import Header from '@/components/Header'
import Hero from '@/components/Hero'
import LeadForm from '@/components/LeadForm'
import Numbers from '@/components/Numbers'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Numbers />
        <LeadForm />
      </main>
      <Footer />
    </>
  )
}