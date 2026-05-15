import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
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
            PRIVACY <span className="gradient-text">POLICY</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
          </p>
        </div>

        <div className="glass animate-fade-in-up anim-delay-200" style={{ borderRadius: "24px", padding: "2.5rem", color: "#cbd5e1", lineHeight: "1.7", fontSize: "1rem" }}>
          
          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>1. Introduction</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            Welcome to HMR Boys Hostel. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at our provided contact details.
          </p>

          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>2. Information We Collect</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            We collect personal information that you voluntarily provide to us when registering at the hostel, expressing an interest in obtaining information about us or our services, or otherwise contacting us.
            The personal information that we collect depends on the context of your interactions with us, and may include:
          </p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li><strong>Personal details:</strong> Name, phone number, email address, student ID, and residential address.</li>
            <li><strong>Emergency contact:</strong> Name and contact details of parents or guardians.</li>
            <li><strong>Payment data:</strong> Information necessary to process your payments (e.g., payment receipts, transaction IDs).</li>
          </ul>

          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>3. How We Use Your Information</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            We use personal information collected via our website or during admission for a variety of business purposes described below:
          </p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li>To facilitate room allocation and manage your stay.</li>
            <li>To send administrative information to you, such as fee reminders, announcements, and policy changes.</li>
            <li>To protect our hostel premises and ensure the safety of all residents.</li>
            <li>To respond to your inquiries and offer support.</li>
          </ul>

          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>4. Will Your Information Be Shared?</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            We only share and disclose your information in the following situations:
          </p>
          <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <li><strong>Compliance with Laws:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
            <li><strong>Vital Interests:</strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, or situations involving potential threats to the safety of any person.</li>
          </ul>

          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>5. How Long Do We Keep Your Information?</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements).
          </p>

          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>6. How Do We Keep Your Information Safe?</h2>
          <p style={{ marginBottom: "1.5rem" }}>
            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our services is at your own risk.
          </p>

          <h2 style={{ color: "#f1f5f9", fontSize: "1.25rem", fontWeight: "700", marginBottom: "1rem" }}>7. Contact Us</h2>
          <p style={{ marginBottom: "0" }}>
            If you have questions or comments about this policy, you may contact the Hostel Administration office or reach out to the Warden directly.
          </p>

        </div>
      </div>

      <Footer />
    </main>
  );
}
