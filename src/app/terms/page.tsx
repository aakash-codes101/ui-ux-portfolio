import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfUsePage() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      
      <div 
        className="section-padding" 
        style={{ 
          flex: 1, 
          marginTop: "80px", 
          maxWidth: "900px", 
          margin: "80px auto 0", 
          padding: "4rem 1.5rem" 
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }} className="animate-fade-in-up">
          <h1 style={{ 
            fontSize: "clamp(2rem, 5vw, 3rem)", 
            fontWeight: "800", 
            color: "#f1f5f9",
            marginBottom: "1rem",
            letterSpacing: "-0.02em"
          }}>
            TERMS OF <span className="gradient-text">USE</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
          </p>
        </div>

        <div className="glass animate-fade-in-up anim-delay-200" style={{ borderRadius: "24px", padding: "2.5rem", color: "#cbd5e1", lineHeight: "1.7", fontSize: "1rem" }}>
          
          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>1. Agreement to Terms</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and HMR Boys Hostel ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
          </p>

          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>2. User Representations</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            By using the Site, you represent and warrant that: 
          </p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li>All registration information you submit will be true, accurate, current, and complete.</li>
            <li>You will maintain the accuracy of such information and promptly update such registration information as necessary.</li>
            <li>You have the legal capacity and you agree to comply with these Terms of Use.</li>
            <li>You will not use the Site for any illegal or unauthorized purpose.</li>
          </ul>

          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>3. Guidelines and Rules</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Users who are residents of the hostel must abide by the official "Rules and Regulations" of HMR Boys Hostel. Any violation of the hostel rules may result in the suspension of your account on this portal and potential disciplinary actions up to eviction from the hostel premises.
          </p>

          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>4. Intellectual Property Rights</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
          </p>

          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>5. Prohibited Activities</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            You agree not to systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.
          </p>

          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>6. Site Management</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            We reserve the right, but not the obligation, to: 
          </p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li>Monitor the Site for violations of these Terms of Use.</li>
            <li>Take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Use.</li>
            <li>Otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site.</li>
          </ul>

          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>7. Modifications and Interruptions</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Site. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
          </p>

          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>8. Contact Us</h2>
          <p style={{ marginBottom: "0" }}>
            In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact the hostel administration.
          </p>

        </div>
      </div>

      <Footer />
    </main>
  );
}
