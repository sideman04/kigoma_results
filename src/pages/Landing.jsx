import { useState } from 'react';
import { Link } from 'react-router-dom';
import './landing.css';
import './landing-overrides.css';
import './landing-contact.css';
import LandingScene from '../components/LandingScene';

export default function Landing() {
  const [sent, setSent] = useState(false);

  function submitContact(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="landing-page">
      <header className="landing-header">
        <Link className="landing-brand" to="/"><span className="landing-mark">K</span><span><strong>KIGOMA REGION</strong><small>EXAMINATION RESULTS PORTAL</small></span></Link>
        <nav><Link to="/results">Results</Link></nav>
      </header>
      <main className="landing-main">
        <LandingScene />
        <section className="landing-hero">
          <div className="landing-copy">
            <p className="landing-eyebrow">KIGOMA REGIONAL EDUCATION OFFICE</p>
            <h1>Examination results, <em>made clear.</em></h1>
            <p className="landing-lead">Access examination results for schools and candidates across Kigoma Region from one simple, trusted portal.</p>
            <div className="landing-actions"><Link className="landing-primary" to="/results">View examination results <span aria-hidden="true">→</span></Link></div>
            <div className="landing-trust"><span className="trust-dot"></span><span>Official regional results portal</span><i></i><span>Available for CSEE and ACSEE</span></div>
          </div>
          <div className="landing-information"><div className="information-heading"><span>PUBLIC PORTAL</span><strong>Find examination results</strong></div><div className="information-row"><b>01</b><span>Choose CSEE or ACSEE</span></div><div className="information-row"><b>02</b><span>Select the examination year</span></div><div className="information-row"><b>03</b><span>Search by centre or index number</span></div><Link to="/results" className="information-link">Start here <span aria-hidden="true">→</span></Link></div>
        </section>
        <section className="landing-contact" aria-labelledby="contact-title"><div className="contact-copy"><p className="landing-eyebrow">SUPPORT & ENQUIRIES</p><h2 id="contact-title">Need help with results?</h2><p>Send a message to the Kigoma Regional Education Office and include your candidate or centre number where relevant.</p><div className="contact-details"><div><span>Office</span><strong>Kigoma Regional Education Office</strong></div><div><span>Enquiry type</span><strong>Examination results and centre information</strong></div><div><span>Response</span><strong>Messages are reviewed during office hours</strong></div></div></div><form className="contact-form" onSubmit={submitContact}>{sent ? <div className="contact-success"><span>✓</span><strong>Message received</strong><p>Thank you. Your enquiry has been recorded.</p><button type="button" onClick={() => setSent(false)}>Send another message</button></div> : <><label><span>Your name</span><input name="name" required placeholder="Enter your name" /></label><label><span>Email address</span><input name="email" type="email" required placeholder="you@example.com" /></label><label><span>Message</span><textarea name="message" required rows="4" placeholder="How can we help?"></textarea></label><button type="submit">Send enquiry <b aria-hidden="true">→</b></button></>}</form></section>
      </main>
      <footer className="landing-footer"><span>© Kigoma Regional Examination Results</span><span>Public access portal</span></footer>
    </div>
  );
}
