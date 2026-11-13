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
        <Link className="landing-brand" to="/"><span className="landing-mark">K</span><span><strong>KIGOMA REGION</strong><small>EDUCATION RESULTS MANAGEMENT SYSTEM</small></span></Link>
        <nav><Link to="/results">Results</Link><Link to="/login">Staff sign in</Link></nav>
      </header>
      <main className="landing-main">
        <LandingScene />
        <section className="landing-hero">
          <div className="landing-copy">
            <p className="landing-eyebrow">KIGOMA REGIONAL EDUCATION OFFICE</p>
            <h1>One regional view of education results.</h1>
            <p className="landing-lead">A coordinated results service for schools, councils and the Kigoma Regional Education Office—from marks entry to published examination results.</p>
            <div className="landing-actions"><Link className="landing-primary" to="/results">Find examination results <span aria-hidden="true">→</span></Link><Link className="landing-secondary" to="#how-it-works">How it works</Link></div>
            <div className="landing-trust"><span className="trust-dot"></span><span>Kigoma Regional Education Office</span><i></i><span>Available for CSEE and ACSEE</span></div>
          </div>
          <div className="landing-information"><div className="information-heading"><span>PUBLIC PORTAL</span><strong>Find examination results</strong></div><div className="information-row"><b>01</b><span>Choose CSEE or ACSEE</span></div><div className="information-row"><b>02</b><span>Select the examination year</span></div><div className="information-row"><b>03</b><span>Search by centre or index number</span></div><Link to="/results" className="information-link">Start here <span aria-hidden="true">→</span></Link></div>
        </section>
        <section className="landing-section landing-about" aria-labelledby="about-title">
          <div className="landing-section-heading"><p className="landing-eyebrow">THE REGIONAL SERVICE</p><h2 id="about-title">One trusted place for Kigoma examination results.</h2></div>
          <p className="landing-section-copy">The Kigoma Regional Education Results Management System helps candidates, parents, schools, councils and regional officers access the same clear examination information—from publication to performance monitoring.</p>
        </section>
        <section className="landing-section landing-examinations" aria-labelledby="examinations-title">
          <div className="landing-section-heading"><p className="landing-eyebrow">AVAILABLE EXAMINATIONS</p><h2 id="examinations-title">Choose the examination you need.</h2></div>
          <div className="landing-exam-grid">
            <Link className="landing-exam-card" to="/results/type/csee"><span className="landing-exam-code">CSEE</span><span><strong>Certificate of Secondary Education Examination</strong><small>Ordinary level examination results</small></span><b aria-hidden="true">→</b></Link>
            <Link className="landing-exam-card" to="/results/type/acsee"><span className="landing-exam-code">ACSEE</span><span><strong>Advanced Certificate of Secondary Education Examination</strong><small>Advanced level examination results</small></span><b aria-hidden="true">→</b></Link>
          </div>
        </section>
        <section className="landing-section landing-process" id="how-it-works" aria-labelledby="process-title">
          <div className="landing-section-heading"><p className="landing-eyebrow">HOW TO ACCESS RESULTS</p><h2 id="process-title">Three simple steps.</h2></div>
          <ol className="landing-steps"><li><span>01</span><strong>Select an examination</strong><p>Choose CSEE or ACSEE from the public results service.</p></li><li><span>02</span><strong>Choose the year and centre</strong><p>Use the examination year and centre directory to find the right result.</p></li><li><span>03</span><strong>Search the result</strong><p>Enter the candidate index number when the centre result page asks for it.</p></li></ol>
        </section>
        <section className="landing-contact" aria-labelledby="contact-title"><div className="contact-copy"><p className="landing-eyebrow">SUPPORT & ENQUIRIES</p><h2 id="contact-title">Need help with regional results?</h2><p>Send a message to the Kigoma Regional Education Office and include your candidate, centre or school details where relevant.</p><div className="contact-details"><div><span>Office</span><strong>Kigoma Regional Education Office</strong></div><div><span>Service</span><strong>Results, submissions and centre information</strong></div><div><span>Response</span><strong>Messages are reviewed during office hours</strong></div></div></div><form className="contact-form" onSubmit={submitContact}>{sent ? <div className="contact-success"><span>✓</span><strong>Message received</strong><p>Thank you. Your enquiry has been recorded.</p><button type="button" onClick={() => setSent(false)}>Send another message</button></div> : <><label><span>Your name</span><input name="name" required placeholder="Enter your name" /></label><label><span>Email address</span><input name="email" type="email" required placeholder="you@example.com" /></label><label><span>Message</span><textarea name="message" required rows="4" placeholder="How can we help?"></textarea></label><button type="submit">Send enquiry <b aria-hidden="true">→</b></button></>}</form></section>
      </main>
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-brand"><span className="landing-mark">K</span><div><strong>KIGOMA REGION</strong><small>EDUCATION RESULTS MANAGEMENT SYSTEM</small></div><p>Regional examination information for candidates, schools, councils and education officers.</p></div>
          <div className="landing-footer-column"><strong>Public services</strong><Link to="/results">Find examination results</Link><Link to="/results/type/csee">CSEE results</Link><Link to="/results/type/acsee">ACSEE results</Link></div>
          <div className="landing-footer-column"><strong>System access</strong><Link to="/login">Staff sign in</Link><a href="#how-it-works">How to access results</a><a href="#contact-title">Help and support</a></div>
          <div className="landing-footer-column"><strong>Regional office</strong><span>Kigoma Regional Education Office</span><span>Kigoma, Tanzania</span><span>Results and examination services</span></div>
        </div>
        <div className="landing-footer-bottom"><span>© Kigoma Regional Education Results Management System</span><span>Public results service · CSEE · ACSEE</span></div>
      </footer>
    </div>
  );
}
