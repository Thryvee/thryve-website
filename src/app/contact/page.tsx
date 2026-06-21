import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ContactForm from '@/components/sections/contact/ContactForm';
import ContactFAQ from '@/components/sections/contact/ContactFAQ';
import AuditCallPreview from '@/components/sections/contact/AuditCallPreview';

export default function Contact() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Nav />
      <main>
        <ContactForm />
        <AuditCallPreview />
        <ContactFAQ />
      </main>
      <Footer />
    </>
  );
}
