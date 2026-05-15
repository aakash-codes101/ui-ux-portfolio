import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const rules = [
  "Residents once admitted to the Hostel will be a Resident of the Hostel throughout the academic year unless otherwise expelled from the Hostel on disciplinary grounds and in that case the Hostel fee will be forfeited.",
  "Hostel fee once deposited shall not be refunded under any circumstances.",
  "Every Resident should stay in the accommodation allotted to him by the Management. Any change of accommodation without prior permission of the Warden/Management is not permitted and the violation of the rules will be considered as an act of indiscipline.",
  "Students are not permitted to exit the hostel premises without making an exit entry at the hostel gate.",
  "The hostel authorities are not responsible for any activity that a student indulges in, outside of the hostel premises. The student is on their own when not residing inside the hostel and no matter the time of day or night, the hostel is not responsible for the students' whereabouts, actions and misconduct, if any.",
  "Residents who are absent from the hostel without permission from the concerned Hostel authorities shall be deemed to be missing and Parents/Guardian/Police authorities may be intimated.",
  "The resident will not leave the Hostel premises on holidays for the purpose of excursion/picnic. Prior permission of the Warden/Management has to be obtained from going on any such picnic/excursion. However, the Hostel authorities will not take any kind of responsibility of such picnic/excursion nor shall be held responsible for any untoward incident or eventually connected therewith.",
  "No Residents of the hostels permitted to take any article/utensil outside the Hostel premises or in the room.",
  "Consumption, storage or supply of drugs, liquor or any sort of intoxicants is strictly prohibited and if found guilty the same will be dealt with severely (including expulsion from Hostel).",
  "Any Resident found in an intoxicated state shall be expelled from the hostel immediately.",
  "Ragging of any kind or form is severely punishable as per the Supreme Court directives. Residents are advised not to indulge in any activities. Anyone found indulging in the same shall be liable to be expelled and their actions reported to police.",
  "Hostel Residents shall take care of their health and hygiene themselves. Any resident suffering from infectious diseases will inform the Warden/Management of the same and must immediately obtain appropriate medical treatment from a proper physician/clinic/hospital.",
  "The resident will be completely responsible for their respective belongings including mobile phones/laptops etc. The hostel administration will not be responsible in case of any loss or damage to their belongings.",
  "Residents may park their vehicles at the Hostel premises up paying the requisite parking charges. Parking is on first-come-first-serve basis only. Limited parking slots are available at any given point of time, Residents shall be solely responsible for their vehicles.",
  "The hostel premises cannot be considered a hiding place for the miscreants. The police authorities may enter the campus and detain anyone in case of any criminal case or breach of any law.",
  "Any resident harboring any unauthorized person in the campus will be expelled from the hostel immediately.",
  "Pets are not allowed inside the hostel premises.",
  "In the event the Residents intending to bring a guest in their room, the same must be intimated to the Warden. Guests will not be allowed entry into the resident’s room and will be restricted. No guest is allowed to stay the night. Guest meals will cost extra. All non-residents will have to leave the hostel premises by 10:30 pm latest. Strict action will be taken if guests are found staying inside a resident’s room.",
  "Room furniture, electric fittings etc are required to be maintained by the residents in good condition. At the time of allotment or leaving the hostel room even for the vacations. Every resident must take-over and hand-over the Hostel Property carefully. Residents vacating Hostel Rooms shall do so at his own risk and for this purpose he should contact the hostel warden.",
  "In case of any damages to the hostel building, furniture, apparatus or any other property of the Hostel, caused by residents of the hostel, the loss shall be recovered from the persons identified as responsible for such damage. However, if the person causing such damage cannot be identified, the loss, as may be assessed and will be distributed equally amongst all the residents of the Hostel or group of the Hostel found responsible for the damage.",
  "The resident should lock their room properly whenever they go out. Each roommate must keep a separate key for the door lock of the room. Hostel administration is not responsible for any loss or damage to personal belongings.",
  "The resident should keep their room clean and in a hygienic condition. Residents can not store in their rooms or elsewhere in the hostel any items of poisonous, hazardous or combustible nature.",
  "The electricity of each room is to be individually paid for by the residents. Any student found violating this and trying to by-pass the sub-meter will be expelled immediately.",
  "Individual cooking in the mess is not permitted, all students will have to eat the menu prepared by the mess staff.",
  "The management warden or any authorised member of the hostel staff can inspect the room of the resident in the hostel at any time.",
  "Any incident of misbehavior in the hostel in general and during gatherings/events shall be dealt with seriously.",
  "The residents must conserve water resources. Taps in the bathroom must be closed whenever not in use.",
  "Mess menu will be finalized by the Hostel Management Committee on a seasonal basis on consultation with the mess manager and the approval of the warden.",
  "The residents should strictly adhere to the prescribed mess timings. Wastage of food in the mess must be avoided.",
  "Violation of any rule or regulation shall make the resident liable to disciplinary action including expulsion from the hostel.",
  "No student can be admitted without depositing security. This security will be returned interest free, once a student leaves the hostel premise. This security will not be used to adjust rent. If a student's room, at the time of vacating is found damaged to any extent, a penalty will be deducted from that security. If the damage is too high, no security will be returned and students can even be asked to cover damages by making an extra payment.",
  "If a student decides to vacate his room, he needs to inform the hostel administration 15 days in advance, otherwise half of his security will automatically be forfeited. If a student informs 3 days or less before vacating, the entire security amount will be forfeited.",
  "Rent for the full session will be collected in maximum 3 installments. If a student delays any installment's payment by more than a week, a penalty of INR 100 will be charged per day as late payment.",
  "Even if a student goes back home for any amount of time, no deduction would be made in the rent amount.",
  "If a student brings in student referrals and those referrals convert to residents, the student will be rewarded INR 3,000 per admission once the referral has paid 2 installments."
];

export default function RulesPage() {
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
            RULES AND <span className="gradient-text">REGULATIONS</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto" }}>
            The following rules shall apply to the Residents of the Hostel at all times.
          </p>
        </div>

        <div className="glass animate-fade-in-up anim-delay-200" style={{ borderRadius: "24px", padding: "2.5rem" }}>
          <ol style={{ 
            color: "#cbd5e1", 
            fontSize: "1rem", 
            lineHeight: "1.7", 
            paddingLeft: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem"
          }}>
            {rules.map((rule, index) => (
              <li key={index} style={{ paddingLeft: "0.5rem" }}>
                {rule}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Footer />
    </main>
  );
}
