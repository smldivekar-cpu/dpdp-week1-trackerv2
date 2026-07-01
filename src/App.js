import { useState } from "react";

const team = ["Shamuvel", "David", "Sujay", "Christopher", "Alexander"];

const days = [
  {
    day: "MON",
    date: "Day 1",
    topic: "Foundations",
    sections: "Sections 1–3",
    focus: "Definitions, applicability, who the Act covers",
    read: "Sections 1, 2, 3 of DPDP Act 2023",
    do: "List 5 key terms in your own words",
    tool: 'Ask AI: "Explain Data Fiduciary vs Data Processor using Indian startup examples"',
    david: "Set up Google Docs structure for team notes",
    output: "Personal glossary (5 terms minimum)",
    color: "#4F46E5"
  },
  {
    day: "TUE",
    date: "Day 2",
    topic: "Consent",
    sections: "Sections 4–6",
    focus: "When can you process data? What makes consent valid?",
    read: "Sections 4, 5, 6 — read every illustration",
    do: "Write 3 scenarios: valid consent / invalid consent / no consent needed",
    tool: 'Ask AI: "Give 3 examples of invalid consent under DPDP Act Section 6"',
    david: "Review Day 1 notes, flag errors in Slack",
    output: "3 consent scenarios (your own words)",
    color: "#7C3AED"
  },
  {
    day: "WED",
    date: "Day 3",
    topic: "Obligations",
    sections: "Sections 7–8",
    focus: "When is consent NOT needed? What must companies do to stay safe?",
    read: "Section 7 (all 9 sub-clauses) + Section 8(1)–(6)",
    do: "List 3 AI tool risks under Section 8(5) for a startup",
    tool: 'Ask AI: "What counts as reasonable security safeguards under DPDP Act Section 8(5)?"',
    david: "Post Day 2 corrections + common mistakes in Slack",
    output: "3 AI security risks identified",
    color: "#0891B2"
  },
  {
    day: "THU",
    date: "Day 4",
    topic: "Children + Rights",
    sections: "Sections 9–13",
    focus: "Children's data rules (₹200Cr penalty) + what users can demand",
    read: "Section 9 fully + Sections 11, 12, 13",
    do: "Write 5-point checklist: Is an EdTech app Section 9 compliant?",
    tool: 'Ask AI: "What must an EdTech app do to comply with Section 9 of DPDP Act 2023?"',
    david: "Review Day 3 notes, post Thursday Tip in Slack",
    output: "EdTech Section 9 checklist (5 points)",
    color: "#059669"
  },
  {
    day: "FRI",
    date: "Day 5",
    topic: "Penalties + Recap",
    sections: "Sections 10, 17, 33 + Schedule",
    focus: "Who gets fined, how much, and why",
    read: "Section 10, Section 17, Section 33 + full Schedule (penalty table)",
    do: "From memory: write the DPDP Act in 5 bullet points. Then check notes.",
    tool: 'Ask AI: "Quiz me on DPDP Act 2023 penalties with 5 questions"',
    david: "Grade everyone's one-pager, post feedback before Sunday call",
    output: "One-pager from memory (5 bullets)",
    color: "#DC2626"
  }
];

const penaltyTable = [
  { violation: "Security breach — S.8(5)", penalty: "₹250 Crore" },
  { violation: "Not notifying breach — S.8(6)", penalty: "₹200 Crore" },
  { violation: "Children violations — S.9", penalty: "₹200 Crore" },
  { violation: "Significant Data Fiduciary — S.10", penalty: "₹150 Crore" },
  { violation: "Other violations", penalty: "₹50 Crore" },
];

const roleWork = [
  { person: "Shamuvel", saturday: "Build AI Tool Risk Matrix (ChatGPT, Gemini, Copilot etc. → DPDP risk per tool)", sunday: "Walk team through Risk Matrix (5 min)" },
  { person: "David", saturday: "Write Answer Key: top 10 client questions + Red Lines (things never to say to clients)", sunday: "Lead 30-min correction session on call" },
  { person: "Sujay", saturday: "Build Google Form questionnaire prototype (30 questions, tagged by DPDP section)", sunday: "Live demo of Form to team (3 min)" },
  { person: "Christopher", saturday: "Draft 3 LinkedIn posts + 1 blog intro (800 words) — DPDP themes, send to David for check", sunday: "Read best post aloud, team gives 2-min feedback" },
  { person: "Alexander", saturday: "Build prospect list (50 leads: EdTech/FinTech/HealthTech) + draft cold outreach message", sunday: "Share outreach script, team gives 2-min feedback" },
];

const noteFormat = `SECTION [number] — [title]
Plain English: (2–3 sentences, your words, NO copy-paste)
Real Example: (one Indian startup scenario)
Action needed: (what must a startup DO to comply?)
Penalty: (from Schedule, if any)
My question: (flag for David in Slack)`;

const checkInFormat = `Day [X] ✅
Learned: [one sentence]
Confused about: [one thing or "nothing"]
Done: [Yes / Catching up]`;

export default function App() {
  const [checkedIn, setCheckedIn] = useState({});
  const [activeDay, setActiveDay] = useState(0);
  const [activeTab, setActiveTab] = useState("schedule");

  const toggleCheckin = (person, day) => {
    const key = `${person}-${day}`;
    setCheckedIn(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", maxWidth: 900, margin: "0 auto", padding: 16, background: "#F9FAFB", minHeight: "100vh" }}>
      
      {/* Header */}
      <div style={{ background: "#1E1B4B", borderRadius: 12, padding: "20px 24px", marginBottom: 16, color: "white" }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: "#A5B4FC", marginBottom: 4 }}>WEEK 1 STUDY TRACKER</div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>DPDP Act 2023</div>
        <div style={{ fontSize: 13, color: "#C7D2FE", marginTop: 4 }}>2–3 hrs/day weekdays · 4–5 hrs Saturday · Team call Sunday</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {["schedule", "notes", "weekend", "penalties", "checkin"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 12,
              background: activeTab === tab ? "#4F46E5" : "white",
              color: activeTab === tab ? "white" : "#6B7280",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}
          >
            {tab === "schedule" ? "📅 Daily Plan" :
             tab === "notes" ? "📝 Note Format" :
             tab === "weekend" ? "💪 Weekend" :
             tab === "penalties" ? "⚠️ Penalties" :
             "✅ Check-in"}
          </button>
        ))}
      </div>

      {/* DAILY SCHEDULE TAB */}
      {activeTab === "schedule" && (
        <div>
          {/* Day Selector */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                style={{
                  padding: "10px 18px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 13,
                  background: activeDay === i ? d.color : "white",
                  color: activeDay === i ? "white" : "#374151",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                  transition: "all 0.15s"
                }}
              >
                {d.day}
              </button>
            ))}
          </div>

          {/* Day Card */}
          {(() => {
            const d = days[activeDay];
            return (
              <div>
                {/* Topic header */}
                <div style={{ background: d.color, borderRadius: 12, padding: "16px 20px", marginBottom: 12, color: "white" }}>
                  <div style={{ fontSize: 11, letterSpacing: 2, opacity: 0.8, marginBottom: 2 }}>{d.date} · {d.sections}</div>
                  <div style={{ fontSize: 20, fontWeight: 700 }}>{d.topic}</div>
                  <div style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>{d.focus}</div>
                </div>

                {/* Cards grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                  
                  <div style={{ background: "white", borderRadius: 10, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", marginBottom: 8, letterSpacing: 1 }}>📖 READ</div>
                    <div style={{ fontSize: 13, color: "#1F2937", lineHeight: 1.5 }}>{d.read}</div>
                  </div>

                  <div style={{ background: "white", borderRadius: 10, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", marginBottom: 8, letterSpacing: 1 }}>✏️ DO</div>
                    <div style={{ fontSize: 13, color: "#1F2937", lineHeight: 1.5 }}>{d.do}</div>
                  </div>

                  <div style={{ background: "#FFFBEB", borderRadius: 10, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#92400E", marginBottom: 8, letterSpacing: 1 }}>🤖 AI TOOL PROMPT</div>
                    <div style={{ fontSize: 12, color: "#78350F", lineHeight: 1.5, fontStyle: "italic" }}>{d.tool}</div>
                  </div>

                  <div style={{ background: "#F0FDF4", borderRadius: 10, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#166534", marginBottom: 8, letterSpacing: 1 }}>📦 OUTPUT</div>
                    <div style={{ fontSize: 13, color: "#14532D", lineHeight: 1.5 }}>{d.output}</div>
                  </div>
                </div>

                {/* David's task */}
                <div style={{ background: "#EFF6FF", borderRadius: 10, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#1E40AF", marginBottom: 6, letterSpacing: 1 }}>👨‍💼 DAVID ONLY</div>
                  <div style={{ fontSize: 13, color: "#1E3A8A" }}>{d.david}</div>
                </div>

                {/* Time reminder */}
                <div style={{ marginTop: 10, background: "#F3F4F6", borderRadius: 8, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#6B7280" }}>⏱ Target: 2–3 hours total</span>
                  <span style={{ fontSize: 12, color: "#6B7280" }}>Post daily check-in on WhatsApp when done</span>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* NOTE FORMAT TAB */}
      {activeTab === "notes" && (
        <div>
          <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1F2937", marginBottom: 4 }}>📝 Use This Format for Every Section</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>Copy this into your Google Doc. Same format for everyone so David can review quickly.</div>
            <pre style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: 16, fontSize: 12, color: "#1E293B", lineHeight: 1.8, whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
              {noteFormat}
            </pre>
          </div>

          <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1F2937", marginBottom: 12 }}>📁 Google Docs Structure</div>
            {[
              { label: "📂 DPDP Act 2023 — Master Folder", sub: [] },
              { label: "📄 Shamuvel — Personal Notes", sub: ["Mon notes", "Tue notes", "Wed notes", "Thu notes", "Fri one-pager"] },
              { label: "📄 Sujay — Personal Notes", sub: ["Same structure"] },
              { label: "📄 Christopher — Personal Notes", sub: ["Same structure"] },
              { label: "📄 Alexander — Personal Notes", sub: ["Same structure"] },
              { label: "📄 David — Answer Key + Red Lines", sub: ["Common mistakes", "Client Q&A", "Never say these"] },
              { label: "📄 TEAM — Master Cheat Sheet", sub: ["Built together Sunday call"] },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{item.label}</div>
                {item.sub.map((s, j) => (
                  <div key={j} style={{ fontSize: 12, color: "#6B7280", marginLeft: 20, marginTop: 2 }}>└ {s}</div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ background: "#FFF7ED", borderRadius: 12, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#C2410C", marginBottom: 8 }}>⚠️ Rules for AI Tool Usage</div>
            {[
              "Always read the actual Act section FIRST, then use AI to clarify",
              "Never copy-paste AI output directly into your notes — rewrite in your own words",
              "AI can get section numbers wrong — always verify against the actual text",
              "Questions for David go in Slack (not WhatsApp) so they're searchable",
              "Don't publish any DPDP content publicly without David's review first"
            ].map((r, i) => (
              <div key={i} style={{ fontSize: 12, color: "#7C2D12", marginBottom: 6, display: "flex", gap: 8 }}>
                <span>•</span><span>{r}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WEEKEND TAB */}
      {activeTab === "weekend" && (
        <div>
          {/* Saturday */}
          <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1F2937" }}>💪 Saturday — Deep Work (4–5 hrs, solo)</div>
              <div style={{ fontSize: 11, background: "#FEF3C7", color: "#92400E", padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>No call, independent</div>
            </div>
            {roleWork.map((r, i) => (
              <div key={i} style={{ borderLeft: "3px solid #4F46E5", paddingLeft: 12, marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#4F46E5", marginBottom: 4 }}>{r.person}</div>
                <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>{r.saturday}</div>
              </div>
            ))}
          </div>

          {/* Sunday call */}
          <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1F2937" }}>📞 Sunday — Team Call (90 min max)</div>
              <div style={{ fontSize: 11, background: "#DCFCE7", color: "#166534", padding: "4px 10px", borderRadius: 20, fontWeight: 600 }}>Everyone required</div>
            </div>
            {[
              { time: "0:00–0:15", item: "Each person: confidence score (1–10) + one thing still confusing" },
              { time: "0:15–0:45", item: "David: top 3 errors from the week's notes + correct explanations" },
              { time: "0:45–1:15", item: "Show & Tell — each person presents their Saturday output (5 min each)" },
              { time: "1:15–1:30", item: "Week 2 decision: ready for ISO 42001? Assign next topics." },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#6B7280", minWidth: 70, paddingTop: 1 }}>{s.time}</div>
                <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{s.item}</div>
              </div>
            ))}
            <div style={{ marginTop: 12, background: "#F3F4F6", borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 12, color: "#6B7280" }}>After call (1–2 hrs individual): fix errors David flagged, update your Google Doc notes</div>
            </div>
          </div>
        </div>
      )}

      {/* PENALTIES TAB */}
      {activeTab === "penalties" && (
        <div>
          <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1F2937", marginBottom: 4 }}>⚠️ DPDP Act Penalty Table</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 16 }}>Memorize this. It's your most powerful sales tool.</div>
            {penaltyTable.map((p, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < penaltyTable.length - 1 ? "1px solid #F3F4F6" : "none" }}>
                <div style={{ fontSize: 13, color: "#374151", flex: 1 }}>{p.violation}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#DC2626", minWidth: 120, textAlign: "right" }}>{p.penalty}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#FEF2F2", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", marginBottom: 12 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#991B1B", marginBottom: 10 }}>💬 How to Use These in Sales Conversations</div>
            {[
              { say: '"We\'ll deal with it later"', response: "Later could cost you ₹250Cr. Our audit costs ₹9,999. That's 0.004% of the potential penalty." },
              { say: '"We\'re a small startup, they won\'t come after us"', response: "The Board acts on complaints from users — your own customers can file against you. Size doesn't matter." },
              { say: '"We don\'t really process sensitive data"', response: "Under DPDP Act, a name + email is enough to trigger obligations. Most startups are already in scope." },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#B91C1C", marginBottom: 4 }}>Client says: "{s.say}"</div>
                <div style={{ fontSize: 12, color: "#7F1D1D", lineHeight: 1.5 }}>You say: {s.response}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CHECK-IN TAB */}
      {activeTab === "checkin" && (
        <div>
          <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1F2937", marginBottom: 4 }}>✅ Daily WhatsApp Check-in Format</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>Copy-paste this every evening after your study session.</div>
            <pre style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 8, padding: 16, fontSize: 13, color: "#14532D", lineHeight: 1.8, whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
              {checkInFormat}
            </pre>
          </div>

          <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1F2937", marginBottom: 4 }}>📊 Slack Usage Guide</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>Keep channels clean and purposeful.</div>
            {[
              { channel: "#dpdp-questions", use: "Tag @David with anything confusing. He responds within 24 hrs." },
              { channel: "#daily-output", use: "Post your Google Doc link each day when notes are done." },
              { channel: "#week1-resources", use: "Drop useful articles, AI prompts, or reference links here." },
              { channel: "#general", use: "Everything else — but keep it brief." },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#4F46E5", minWidth: 160 }}>{c.channel}</div>
                <div style={{ fontSize: 12, color: "#374151" }}>{c.use}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#1F2937", marginBottom: 12 }}>🏁 Week 1 Completion Checklist</div>
            {[
              { person: "All", item: "Read Sections 1–17 + 33 + Schedule of DPDP Act" },
              { person: "All", item: "Personal notes in Google Doc (using standard format)" },
              { person: "All", item: "Friday one-pager written from memory" },
              { person: "Shamuvel", item: "AI Tool Risk Matrix complete" },
              { person: "Sujay", item: "30-question audit form prototype live" },
              { person: "Christopher", item: "3 LinkedIn drafts + 1 blog intro ready" },
              { person: "Alexander", item: "50+ prospect list + cold outreach message" },
              { person: "David", item: "Answer Key + Red Lines doc shared" },
              { person: "All", item: "Attended Sunday team call" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center" }}>
                <div style={{ width: 16, height: 16, borderRadius: 4, border: "2px solid #D1D5DB", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#4F46E5", marginRight: 6 }}>{c.person}</span>
                  <span style={{ fontSize: 12, color: "#374151" }}>{c.item}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "#9CA3AF" }}>
        WhatsApp = quick pings · Slack = questions & outputs · Google Docs = all notes
      </div>
    </div>
  );
                  }
