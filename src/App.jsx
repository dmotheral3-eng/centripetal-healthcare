import { useState, useEffect, useRef } from "react";

const NAVY = "#0F1B2D";
const DARK = "#1C1C1A";
const TEAL = "#0F6E56";
const TEAL_L = "#E1F5EE";
const PURPLE = "#534AB7";
const PURPLE_L = "#EEEDFE";
const CORAL = "#D85A30";
const CORAL_L = "#FAECE7";
const BLUE = "#1A5276";
const BLUE_L = "#D6EAF8";
const AMBER = "#854F0B";
const LGRAY = "#F4F3F0";
const WHITE = "#FFFFFF";
const TGRAY = "#73726C";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  return (
    <div style={{ ...style }}>
      {children}
    </div>
  );
}

function Section({ children, bg = WHITE, style = {}, id }) {
  return <div id={id} style={{ background: bg, padding: "80px 24px", ...style }}><div style={{ maxWidth: 1080, margin: "0 auto" }}>{children}</div></div>
}

function SectionLabel({ text, color = TEAL }) {
  return <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color, marginBottom: 12 }}>{text}</div>;
}

function H2({ children, color = DARK }) {
  return <h2 style={{ fontSize: 36, fontWeight: 700, color, lineHeight: 1.15, margin: "0 0 16px", fontFamily: "'Instrument Serif', Georgia, serif" }}>{children}</h2>;
}

function Sub({ children, color = TGRAY }) {
  return <p style={{ fontSize: 17, color, lineHeight: 1.6, margin: "0 0 40px", maxWidth: 640 }}>{children}</p>;
}

function StatBox({ value, label, sub, accent }) {
  return (
    <div style={{ flex: 1, minWidth: 160, padding: "28px 24px", background: WHITE, borderRadius: 12, borderTop: `3px solid ${accent}` }}>
      <div style={{ fontSize: 36, fontWeight: 700, color: accent, lineHeight: 1, fontFamily: "'Instrument Serif', Georgia, serif" }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: DARK, marginTop: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: TGRAY, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function FlowStep({ num, title, desc, accent, icon }) {
  return (
    <div style={{ display: "flex", gap: 20, alignItems: "flex-start", padding: "24px 0", borderBottom: "1px solid #e8e6df" }}>
      <div style={{ width: 48, height: 48, borderRadius: 24, background: accent, color: WHITE, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, flexShrink: 0, fontFamily: "'Instrument Serif', Georgia, serif" }}>{num}</div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 600, color: DARK, marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 14, color: TGRAY, lineHeight: 1.6 }}>{desc}</div>
      </div>
    </div>
  );
}

function SpeedRow({ time, desc, accent }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, padding: "12px 0" }}>
      <div style={{ width: 100, padding: "8px 0", background: accent + "18", borderRadius: 8, textAlign: "center", fontSize: 18, fontWeight: 700, color: accent, flexShrink: 0, fontFamily: "'Instrument Serif', Georgia, serif" }}>{time}</div>
      <div style={{ fontSize: 15, color: DARK }}>{desc}</div>
    </div>
  );
}

function EHRCard({ name, format, column, note, accent }) {
  return (
    <div style={{ flex: 1, minWidth: 170, background: WHITE, borderRadius: 12, overflow: "hidden", border: "1px solid #e8e6df" }}>
      <div style={{ background: accent, padding: "10px 16px" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: WHITE }}>{name}</div>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: TGRAY, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Export format</div>
        <div style={{ fontSize: 13, color: DARK, marginBottom: 10 }}>{format}</div>
        <div style={{ fontSize: 11, fontWeight: 600, color: TGRAY, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 4 }}>Column name</div>
        <div style={{ fontSize: 12, color: PURPLE, fontFamily: "'JetBrains Mono', monospace", marginBottom: 10 }}>{column}</div>
        <div style={{ fontSize: 12, color: TGRAY, lineHeight: 1.4 }}>{note}</div>
      </div>
    </div>
  );
}

function CompRow({ cap, legacy, enterprise, us }) {
  const X = () => <span style={{ color: "#A32D2D", fontSize: 18, fontWeight: 700 }}>✗</span>;
  const Check = () => <span style={{ color: TEAL, fontSize: 18, fontWeight: 700 }}>✓</span>;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 0, padding: "12px 16px", borderBottom: "1px solid #e8e6df" }}>
      <div style={{ fontSize: 14, color: DARK }}>{cap}</div>
      <div style={{ textAlign: "center" }}>{legacy ? <Check /> : <X />}</div>
      <div style={{ textAlign: "center" }}>{enterprise ? <Check /> : <X />}</div>
      <div style={{ textAlign: "center" }}>{us ? <Check /> : <X />}</div>
    </div>
  );
}

export default function HealthcarePage() {
  return (
    <div style={{ fontFamily: "'Outfit', system-ui, sans-serif", color: DARK, background: WHITE, overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* NAV */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: NAVY + "f0", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#5DCAA5", letterSpacing: "0.1em", textTransform: "uppercase" }}>Centripetal</div>
          <div style={{ display: "flex", gap: 28, fontSize: 13, color: "#b0b0b0" }}>
            <a href="#how" style={{ color: "inherit", textDecoration: "none" }}>How it works</a>
            <a href="#speed" style={{ color: "inherit", textDecoration: "none" }}>Speed</a>
            <a href="#dashboards" style={{ color: "inherit", textDecoration: "none" }}>Dashboards</a>
            <a href="mailto:dave@dm3-consulting.com?subject=Centripetal%20demo%20request" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div style={{ background: NAVY, padding: "140px 24px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(93,202,165,0.06) 0%, transparent 70%)" }} />
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
          <FadeIn delay={0.1}>
            <h1 style={{ fontSize: 52, fontWeight: 700, color: WHITE, lineHeight: 1.08, margin: "0 0 20px", maxWidth: 700, fontFamily: "'Instrument Serif', Georgia, serif" }}>
              AI-powered quality analytics for clinically integrated networks
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: 18, color: "#b0b0b0", lineHeight: 1.6, maxWidth: 560, margin: "0 0 40px" }}>
              Upload a CSV from any EHR system. See a unified quality dashboard in under 10 seconds. No middleware. No interface engines. No new software at any hospital.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <a href="mailto:dave@dm3-consulting.com?subject=Centripetal%20demo%20request" style={{ display: "inline-block", padding: "14px 32px", background: "#5DCAA5", color: NAVY, fontWeight: 600, fontSize: 14, borderRadius: 8, textDecoration: "none", letterSpacing: "0.02em" }}>See the demo</a>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div style={{ display: "flex", gap: 16, marginTop: 60, flexWrap: "wrap" }}>
              <StatBox value="43" label="Hospitals" sub="14 EHR systems" accent="#5DCAA5" />
              <StatBox value="$6.45M" label="At stake / year" sub="ATLIS Medicaid incentives" accent={CORAL} />
              <StatBox value="< 10s" label="To normalize" sub="Any CSV, any EHR vendor" accent={PURPLE} />
              <StatBox value="1 week" label="To deploy" sub="Phase 1 fully operational" accent={BLUE} />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* PROBLEM */}
      <Section bg={LGRAY}>
        <FadeIn>
          <SectionLabel text="The problem" />
          <H2>14 EHR systems. Zero unified analytics.</H2>
          <Sub>Rural CINs manage hospitals running TruBridge, Epic, Meditech, MEDHOST, and a dozen other systems. Each exports data in a different format. Quality coordinators spend days compiling spreadsheets. Leadership sees stale data. Millions in incentive payments go uncaptured because nobody can measure performance across the network.</Sub>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
            <div style={{ background: "#FCEBEB", borderRadius: 12, padding: "28px 24px", borderLeft: "4px solid #A32D2D" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#A32D2D", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>Today</div>
              {["Staff pull data from 14 EHRs by hand weekly", "Spreadsheet compilation takes days", "Each payer needs different report formats", "Data is weeks old when leadership sees it", "$6.45M in ATLIS incentives left uncaptured"].map((t, i) =>
                <div key={i} style={{ fontSize: 14, color: "#712B13", padding: "6px 0", display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "#A32D2D", fontWeight: 700, fontSize: 16, lineHeight: 1 }}>✗</span> {t}
                </div>
              )}
            </div>
            <div style={{ background: TEAL_L, borderRadius: 12, padding: "28px 24px", borderLeft: `4px solid ${TEAL}` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: TEAL, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.06em" }}>With Centripetal</div>
              {["AI ingests any EHR export in seconds", "Dashboard updates instantly after upload", "All 5 payer reports auto-generated", "Real-time network quality view", "Every ATLIS dollar tracked and prioritized"].map((t, i) =>
                <div key={i} style={{ fontSize: 14, color: "#085041", padding: "6px 0", display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: TEAL, fontWeight: 700, fontSize: 16, lineHeight: 1 }}>✓</span> {t}
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* EHR SYSTEMS */}
      <Section>
        <FadeIn>
          <SectionLabel text="Universal compatibility" color={PURPLE} />
          <H2>Every hospital already exports data</H2>
          <Sub>They do it for CMS, Medicaid, and payers. We use the same exports. Different column names, different formats — the AI handles all of it.</Sub>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <EHRCard name="TruBridge" format="CSV" column="HBA1C_VAL" note="Dominant rural EHR. Scheduled SFTP export built-in." accent={BLUE} />
            <EHRCard name="Epic" format="FHIR + CSV" column="A1C_RESULT" note="Enterprise EHR. FHIR API + Caboodle export." accent={PURPLE} />
            <EHRCard name="Meditech" format="CSV / Batch" column="HEMOGLOBIN_A1C" note="Legacy + Expanse. NPR report writer to CSV." accent={TEAL} />
            <EHRCard name="MEDHOST" format="CSV" column="HgbA1c_Value" note="Community hospitals. Standard report downloads." accent={CORAL} />
            <EHRCard name="+10 others" format="Any format" column="Any column name" note="athenahealth, Allscripts, NextGen, eCW, Netsmart..." accent="#5F5E5A" />
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ marginTop: 28, background: PURPLE_L, borderRadius: 12, padding: "20px 24px", borderLeft: `4px solid ${PURPLE}` }}>
            <div style={{ fontSize: 14, color: PURPLE, lineHeight: 1.6 }}>
              <strong>All columns map to one schema automatically.</strong> HBA1C_VAL, A1C_RESULT, HEMOGLOBIN_A1C, HgbA1c_Value — the AI reads English, not schemas. When a hospital changes their column names, it still works. Zero maintenance.
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* HOW IT WORKS */}
      <Section bg={LGRAY} style={{ scrollMarginTop: 60 }} id="how">
        <FadeIn>
          <SectionLabel text="How it works" color={CORAL} />
          <H2>CSV in, dashboard out. That's the whole workflow.</H2>
          <Sub>Four steps. Under 30 seconds per hospital. No middleware, no interface engines, no IT tickets.</Sub>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ background: WHITE, borderRadius: 16, padding: "8px 28px", border: "1px solid #e8e6df" }}>
            <FlowStep num="1" title="Hospital exports a CSV" desc="The same report they already produce for CMS quality reporting. TruBridge, Epic, Meditech, MEDHOST — any EHR, any format. No new reports to create." accent={BLUE} />
            <FlowStep num="2" title="AI normalizes the data" desc="Maps any column format to a unified schema. Calculates APP Plus quality measures. Identifies patient-level care gaps. Checks ATLIS qualification. Under 10 seconds." accent={PURPLE} />
            <FlowStep num="3" title="Unified database updates" desc="All hospitals, all measures, all payer contracts in one schema. Row-level security ensures Hospital A can't see Hospital B's data. Full audit trail." accent={TEAL} />
            <FlowStep num="4" title="Dashboards + AI recommendations" desc="Network overview, care gap action lists, ATLIS tracker, multi-payer reporting. Click any metric, see the patient-level data. AI tells you what to do next — not just what the numbers are." accent={CORAL} />
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ marginTop: 28, background: NAVY, borderRadius: 12, padding: "20px 28px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#5DCAA5", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Automation layer</div>
            <div style={{ fontSize: 14, color: "#b0b0b0", lineHeight: 1.6 }}>Phase 1 is manual upload. Phase 2 adds scheduled email and SFTP ingestion — zero human involvement. Phase 3 adds automated collection from EHR web portals for hospitals without export capabilities. Phase 4 connects Epic hospitals via FHIR API directly.</div>
          </div>
        </FadeIn>
      </Section>

      {/* SPEED */}
      <Section id="speed">
        <FadeIn>
          <SectionLabel text="Speed" color={TEAL} />
          <H2>Running in one week. Not 12 months.</H2>
          <Sub>No committee approvals. No vendor calls. No new hardware. A quality coordinator with a browser and a CSV file.</Sub>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ background: WHITE, borderRadius: 16, padding: "12px 28px", border: "1px solid #e8e6df" }}>
            <SpeedRow time="< 10 sec" desc="AI normalizes a CSV from any EHR system into structured quality data" accent={TEAL} />
            <SpeedRow time="< 1 min" desc="Upload a hospital export and see it on the dashboard with measures calculated" accent={TEAL} />
            <SpeedRow time="< 1 hour" desc="Onboard a new hospital — one CSV, all measures populated" accent={BLUE} />
            <SpeedRow time="< 1 day" desc="Train a quality coordinator to use the platform independently" accent={BLUE} />
            <SpeedRow time="1 week" desc="Phase 1 fully operational across your first 10 hospitals" accent={PURPLE} />
            <SpeedRow time="30 days" desc="All hospitals live with automated delivery — zero manual work" accent={PURPLE} />
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ marginTop: 28, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ background: "#FCEBEB", borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#A32D2D", marginBottom: 8 }}>Legacy approach</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#A32D2D", fontFamily: "'Instrument Serif', Georgia, serif" }}>12-18 months</div>
              <div style={{ fontSize: 12, color: "#712B13", marginTop: 4 }}>Per-vendor interfaces. $500K+ setup. Ongoing maintenance.</div>
            </div>
            <div style={{ background: TEAL_L, borderRadius: 12, padding: "20px 24px" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: TEAL, marginBottom: 8 }}>Centripetal</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: TEAL, fontFamily: "'Instrument Serif', Georgia, serif" }}>1 week</div>
              <div style={{ fontSize: 12, color: "#085041", marginTop: 4 }}>Upload a CSV. See results in 10 seconds. No IT tickets.</div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* COMPARISON */}
      <Section bg={LGRAY}>
        <FadeIn>
          <SectionLabel text="Why this is different" />
          <H2>Every legacy approach has the same problem</H2>
          <Sub>Per-vendor integration. Enterprise budgets. Rural hospitals can't absorb it.</Sub>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ background: WHITE, borderRadius: 16, overflow: "hidden", border: "1px solid #e8e6df" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 0, padding: "12px 16px", background: NAVY }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#b0b0b0", textTransform: "uppercase", letterSpacing: "0.06em" }}>Capability</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e07070", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center" }}>Interface engines</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e0b050", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center" }}>Enterprise BI</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#5DCAA5", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center" }}>Centripetal</div>
            </div>
            <CompRow cap="Works with TruBridge" us={true} />
            <CompRow cap="Deploy in under 1 week" us={true} />
            <CompRow cap="No software at hospitals" us={true} />
            <CompRow cap="Handles 14+ EHR systems" us={true} />
            <CompRow cap="AI recommendations" us={true} />
            <CompRow cap="Adapts to format changes" us={true} />
            <CompRow cap="Affordable for 25-bed CAH" us={true} />
            <CompRow cap="Multi-payer auto-reporting" us={true} />
            <div style={{ padding: "14px 16px", background: TEAL_L }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: TEAL, textAlign: "center" }}>8 for 8. Every capability a rural CIN needs. Only Centripetal delivers all of them.</div>
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* DASHBOARDS */}
      <Section id="dashboards">
        <FadeIn>
          <SectionLabel text="What you get" color={CORAL} />
          <H2>5 new dashboards per week for 4 weeks</H2>
          <Sub>20 dashboards built from your real data. Whatever you need, we build it. Here's what the first month looks like.</Sub>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
            {[
              { wk: "Week 1", items: ["Network overview", "Hospital rankings", "ATLIS tracker", "Quality measures", "CSV upload portal"], color: TEAL },
              { wk: "Week 2", items: ["Care gap alerts", "Patient-level actions", "Multi-payer view", "Board summary", "Trend analysis"], color: BLUE },
              { wk: "Week 3", items: ["Provider scorecards", "Hospital drill-down", "Measure comparison", "Compliance tracker", "Payer export tools"], color: PURPLE },
              { wk: "Week 4", items: ["AI recommendations", "Predictive risk scores", "Custom payer formats", "Committee reports", "Executive summary"], color: CORAL },
            ].map((wk, wi) => (
              <div key={wi} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #e8e6df" }}>
                <div style={{ background: wk.color, padding: "10px 16px" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: WHITE, textTransform: "uppercase", letterSpacing: "0.06em" }}>{wk.wk}</div>
                </div>
                {wk.items.map((item, ii) => (
                  <div key={ii} style={{ padding: "10px 16px", borderBottom: "1px solid #e8e6df", fontSize: 13, color: DARK, display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ color: wk.color, fontWeight: 700 }}>✓</span> {item}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ marginTop: 28, background: PURPLE_L, borderRadius: 12, padding: "20px 24px", borderLeft: `4px solid ${PURPLE}` }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: PURPLE, marginBottom: 4 }}>The differentiator</div>
            <div style={{ fontSize: 14, color: PURPLE, lineHeight: 1.6 }}>BI tools show you the numbers. Centripetal shows you the numbers <strong>and tells you what to do next.</strong> Click any metric, see the underlying patient data, and get AI-generated recommendations for the highest-impact interventions.</div>
          </div>
        </FadeIn>
      </Section>

      {/* WHO WE SERVE */}
      <Section>
        <FadeIn>
          <SectionLabel text="Who we serve" color={PURPLE} />
          <H2>Four organization types. One platform.</H2>
          <Sub>The platform scales from a single rural hospital to a statewide CIN managing 50+ facilities across multiple payer contracts.</Sub>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
            {[
              { badge: "CIN", name: "Clinically Integrated Network", example: "TORCH CIN (43 hospitals)", lives: "30K-80K covered lives", color: CORAL, desc: "Multi-payer contracts across independent hospitals on different EHRs. The Command Center was built for this." },
              { badge: "ACO", name: "Accountable Care Organization", example: "250+ physician networks", lives: "5K-25K beneficiaries", color: BLUE, desc: "Single Medicare MSSP contract. Quality score is the multiplier on their shared savings check." },
              { badge: "CAH", name: "Critical Access Hospital", example: "25-bed rural facilities", lives: "500-5K attributed patients", color: TEAL, desc: "Too small to buy enterprise analytics alone. Access the platform through their CIN membership." },
              { badge: "IDN", name: "Health System", example: "Regional systems (2-10 hospitals)", lives: "10K-50K across facilities", color: PURPLE, desc: "Owns multiple facilities. Needs unified data across the system plus participation in ACOs/CINs." },
            ].map((org, i) => (
              <div key={i} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #e8e6df", background: WHITE }}>
                <div style={{ background: org.color, padding: "14px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: WHITE, fontFamily: "'Instrument Serif', Georgia, serif" }}>{org.badge}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>{org.name}</div>
                </div>
                <div style={{ padding: "16px" }}>
                  <div style={{ fontSize: 12, color: TGRAY, marginBottom: 8 }}>{org.example}</div>
                  <div style={{ fontSize: 13, color: DARK, lineHeight: 1.5, marginBottom: 12 }}>{org.desc}</div>
                  <div style={{ borderTop: "1px solid #e8e6df", paddingTop: 10 }}>
                    <div style={{ fontSize: 12, color: TGRAY }}>{org.lives}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* PLATFORM ARCHITECTURE */}
      <Section bg={NAVY}>
        <FadeIn>
          <SectionLabel text="Architecture" color="#5DCAA5" />
          <H2 color={WHITE}>Four layers. Zero legacy middleware.</H2>
          <p style={{ fontSize: 17, color: "#b0b0b0", lineHeight: 1.6, margin: "0 0 40px", maxWidth: 640 }}>
            The platform replaces the entire legacy healthcare integration stack — interface engines, ETL pipelines, vendor-specific connectors — with four clean layers.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { layer: "Integration", desc: "EHR connections via CSV, FHIR API, scheduled exports, and automated browser collection for systems without APIs. One connection method per hospital — whatever works.", color: BLUE, items: ["CSV / batch file ingestion", "FHIR R4 for Epic hospitals", "Scheduled email + SFTP", "Automated portal collection"] },
              { layer: "Intelligence", desc: "AI-powered normalization, field mapping, quality measure calculation, care gap detection, and clinical recommendations. The engine that makes raw data actionable.", color: PURPLE, items: ["AI field mapping (any column names)", "eCQM quality measure calculation", "Patient-level care gap detection", "Actionable clinical recommendations"] },
              { layer: "Platform", desc: "HIPAA-compliant cloud database with row-level security, real-time subscriptions, edge computing, and full audit trail. Multi-tenant — one instance serves the whole network.", color: TEAL, items: ["Encrypted database (AES-256)", "Row-level security per hospital", "Real-time dashboard updates", "Immutable audit trail"] },
              { layer: "Presentation", desc: "Custom dashboards, embedded analytics, AI recommendation panels, and auto-generated payer reports. 5 new dashboards per week for the first 4 weeks.", color: CORAL, items: ["Interactive quality dashboards", "AI recommendation engine", "Multi-payer report generation", "Board-ready PDF exports"] },
            ].map((l, i) => (
              <div key={i} style={{ display: "flex", gap: 16, padding: "20px 24px", borderRadius: 12, border: `1px solid ${l.color}30`, background: `${l.color}08` }}>
                <div style={{ width: 120, flexShrink: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: l.color, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "'JetBrains Mono', monospace" }}>{l.layer}</div>
                  <div style={{ width: 40, height: 3, background: l.color, borderRadius: 2, marginTop: 6 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, color: "#b0b0b0", lineHeight: 1.6, marginBottom: 10 }}>{l.desc}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {l.items.map((item, j) => (
                      <span key={j} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: `${l.color}15`, color: l.color, border: `1px solid ${l.color}25` }}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* COMMAND CENTER FEATURES */}
      <Section>
        <FadeIn>
          <SectionLabel text="Command Center" color={TEAL} />
          <H2>Everything the quality team needs. Start free.</H2>
          <Sub>Command Center Lite is free — CSV upload, quality scores, gap list. Upgrade when you need EHR connections, multi-payer tracking, and automated reporting.</Sub>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {/* Free tier */}
            <div style={{ borderRadius: 12, border: `2px solid ${TEAL}`, overflow: "hidden" }}>
              <div style={{ background: TEAL, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: WHITE }}>Command Center Lite</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: WHITE, fontFamily: "'Instrument Serif', Georgia, serif" }}>Free</div>
              </div>
              <div style={{ padding: "16px 20px" }}>
                {["CSV upload → AI field mapping → unified scorecards", "APP Plus eCQM quality measure engine", "Care gap tracker with daily worklists", "Financial dashboard with savings projections", "PDF board reports for quarterly meetings"].map((f, i) => (
                  <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid #e8e6df", fontSize: 13, color: DARK, display: "flex", gap: 8 }}>
                    <span style={{ color: TEAL, fontWeight: 700 }}>✓</span> {f}
                  </div>
                ))}
                <div style={{ marginTop: 12, fontSize: 12, color: TGRAY }}>Single payer contract. Manual CSV upload. Perfect for getting started.</div>
              </div>
            </div>
            {/* Paid tier */}
            <div style={{ borderRadius: 12, border: "1px solid #e8e6df", overflow: "hidden" }}>
              <div style={{ background: NAVY, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: WHITE }}>Command Center Full</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#5DCAA5", fontFamily: "'Instrument Serif', Georgia, serif" }}>Contact for pricing</div>
              </div>
              <div style={{ padding: "16px 20px" }}>
                {["Everything in Lite, plus:", "Direct EHR connections (overnight refresh)", "Multi-payer contract tracking (MSSP + HEDIS + Medicaid)", "One-click QRDA III export for CMS submission", "Automated portal collection for legacy systems", "Provider scorecards per-practice, per-physician", "Attribution reconciliation (CMS list vs rosters)", "Payer-specific reporting with auto-generated exports"].map((f, i) => (
                  <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid #e8e6df", fontSize: 13, color: i === 0 ? PURPLE : DARK, fontWeight: i === 0 ? 600 : 400, display: "flex", gap: 8 }}>
                    {i > 0 && <span style={{ color: PURPLE, fontWeight: 700 }}>✓</span>} {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ marginTop: 20, background: TEAL_L, borderRadius: 12, padding: "20px 24px", borderLeft: `4px solid ${TEAL}`, textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: TEAL }}>Start free. Upload your first CSV today. Upgrade when you're ready.</div>
          </div>
        </FadeIn>
      </Section>

      {/* INTEGRATION METHODS */}
      <Section bg={LGRAY}>
        <FadeIn>
          <SectionLabel text="Integration" color={BLUE} />
          <H2>Four ways to connect. Start with the easiest.</H2>
          <Sub>Every hospital already exports data. We start there and progressively automate.</Sub>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14 }}>
            {[
              { phase: "Phase 1", method: "CSV upload", desc: "Quality coordinator uploads the same CSV they already produce for CMS reporting. Drag, drop, done.", time: "Immediate", effort: "Zero IT involvement", color: TEAL },
              { phase: "Phase 2", method: "Scheduled delivery", desc: "Hospital configures their EHR to email or SFTP exports on a schedule. Platform ingests automatically.", time: "30 days", effort: "One-time EHR setup", color: BLUE },
              { phase: "Phase 3", method: "Automated collection", desc: "Platform logs into EHR web portals and retrieves data automatically. For hospitals that can't export.", time: "60 days", effort: "Zero — fully automated", color: PURPLE },
              { phase: "Phase 4", method: "Direct API", desc: "FHIR R4 connections for Epic and other API-enabled EHR systems. Real-time data flow.", time: "90 days", effort: "IT approval for API", color: CORAL },
            ].map((p, i) => (
              <div key={i} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid #e8e6df", background: WHITE }}>
                <div style={{ background: p.color, padding: "12px 16px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.phase}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: WHITE }}>{p.method}</div>
                </div>
                <div style={{ padding: "16px" }}>
                  <div style={{ fontSize: 13, color: DARK, lineHeight: 1.5, marginBottom: 12 }}>{p.desc}</div>
                  <div style={{ fontSize: 12, color: TGRAY, borderTop: "1px solid #e8e6df", paddingTop: 10 }}>
                    <div><strong style={{ color: DARK }}>Timeline:</strong> {p.time}</div>
                    <div><strong style={{ color: DARK }}>Hospital effort:</strong> {p.effort}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* SECURITY */}
      <Section bg={NAVY}>
        <FadeIn>
          <SectionLabel text="Security & compliance" color="#5DCAA5" />
          <H2 color={WHITE}>HIPAA-compliant by design</H2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 20 }}>
            {[
              { title: "Encryption", desc: "AES-256 at rest. TLS 1.3 in transit. End-to-end." },
              { title: "Access control", desc: "Row-level security. Hospital A can't see Hospital B. Board sees aggregates only." },
              { title: "Audit trail", desc: "Every upload, query, and export logged with timestamp and user." },
              { title: "BAA chain", desc: "Business Associate Agreements with all technology providers." },
              { title: "AI processing", desc: "Stateless. Data processed and returned. Nothing stored or trained on." },
              { title: "Infrastructure", desc: "SOC 2 Type II certified hosting. HIPAA-compliant cloud." },
            ].map((s, i) => (
              <div key={i} style={{ padding: "20px", borderRadius: 12, border: "1px solid rgba(93,202,165,0.15)", background: "rgba(93,202,165,0.04)" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#5DCAA5", marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#b0b0b0", lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* CTA */}
      <Section id="contact" bg={LGRAY}>
        <FadeIn>
          <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <SectionLabel text="Get started" color={PURPLE} />
            <H2>Upload a CSV. See it work.</H2>
            <p style={{ fontSize: 17, color: TGRAY, lineHeight: 1.6, margin: "0 0 32px" }}>
              30-minute demonstration with sample hospital data. If it works with your data, we deploy. If it doesn't, lunch is on us.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="mailto:dave@dm3-consulting.com?subject=Centripetal%20demo%20request" style={{ display: "inline-block", padding: "14px 32px", background: PURPLE, color: WHITE, fontWeight: 600, fontSize: 14, borderRadius: 8, textDecoration: "none" }}>Request a demo</a>
              <a href="#how" style={{ display: "inline-block", padding: "14px 32px", background: WHITE, color: DARK, fontWeight: 600, fontSize: 14, borderRadius: 8, textDecoration: "none", border: "1px solid #e8e6df" }}>See how it works</a>
            </div>
            <div style={{ marginTop: 40, fontSize: 14, color: TGRAY }}>
              <strong style={{ color: DARK }}>Centripetal</strong><br />
              Fort Worth, Texas
            </div>
          </div>
        </FadeIn>
      </Section>

      {/* FOOTER */}
      <div style={{ background: NAVY, padding: "24px", textAlign: "center" }}>
        <div style={{ fontSize: 11, color: "#666" }}>© 2026 Centripetal · DM3 Consulting LLC · All rights reserved</div>
      </div>
    </div>
  );
}
