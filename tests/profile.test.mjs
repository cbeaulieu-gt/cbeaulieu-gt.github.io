import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test from "node:test";

const htmlPath = fileURLToPath(new URL("../index.html", import.meta.url));
const resumePath = fileURLToPath(new URL("../assets/resume.pdf", import.meta.url));

const normalizeWhitespace = (value) => value.replace(/\s+/g, " ").trim();

test("public metadata identifies UKG as the current employer", async () => {
  const html = normalizeWhitespace(await readFile(htmlPath, "utf8"));
  const description =
    "Christopher Beaulieu — Senior Software Engineer at UKG specializing in backend systems, data pipelines, and cloud infrastructure. Open to new opportunities.";
  const jsonLdSource = html.match(
    /<script type="application\/ld\+json">\s*(\{.*?\})\s*<\/script>/,
  )?.[1];

  assert.match(html, /<title>Christopher Beaulieu — Senior Software Engineer at UKG<\/title>/);
  assert.match(
    html,
    /<meta property="og:title" content="Christopher Beaulieu — Senior Software Engineer at UKG" \/>/,
  );
  assert.match(
    html,
    /<meta name="twitter:title" content="Christopher Beaulieu — Senior Software Engineer at UKG" \/>/,
  );
  assert.match(html, new RegExp(`<meta name="description" content="${description}" \\/>`));
  assert.match(html, new RegExp(`<meta property="og:description" content="${description}" \\/>`));
  assert.match(html, new RegExp(`<meta name="twitter:description" content="${description}" \\/>`));
  assert.ok(jsonLdSource, "JSON-LD profile is present");
  assert.deepEqual(JSON.parse(jsonLdSource).worksFor, {
    "@type": "Organization",
    name: "UKG",
  });
});

test("profile presents the supervised orchestrator as the current focus", async () => {
  const html = normalizeWhitespace(await readFile(htmlPath, "utf8"));
  const aboutSection = html.slice(
    html.indexOf('<section id="about">'),
    html.indexOf('<section id="stack">'),
  );
  const projectsSection = html.slice(
    html.indexOf('<section id="projects">'),
    html.indexOf('<section id="contact"'),
  );
  const terminalScript = html.slice(
    html.indexOf("const lines = ["),
    html.indexOf("function typeOut"),
  );

  assert.match(aboutSection, /supervised orchestrator for agentic software development/i);
  assert.match(terminalScript, /supervised orchestrator for agentic software development/i);
  assert.match(html, /Open to opportunities/);
  assert.match(html, /Senior backend, ML platform, or full-stack roles at a team that ships\./);
  assert.doesNotMatch(projectsSection, /supervised orchestrator/i);
});

test("experience lists the current UKG role with the resume wording", async () => {
  const html = normalizeWhitespace(await readFile(htmlPath, "utf8"));
  const experienceSection = html.slice(
    html.indexOf('<section id="experience">'),
    html.indexOf('<section id="projects">'),
  );
  const firstCardStart = experienceSection.indexOf('<article class="exp-card reveal">');
  const ukgCard = experienceSection.slice(
    firstCardStart,
    experienceSection.indexOf("</article>", firstCardStart),
  );

  assert.match(experienceSection, /timeline · 2018 → present/);
  assert.match(
    ukgCard,
    /Jul 2026 — Present.*UKG.*Senior Software Engineer.*Maintain and extend an established production application using Angular, C#, and SQL, shipping new features across its full stack\..*Develop AI agents to improve internal developer workflows\./,
  );
});

test("resume download is the supplied current PDF", async () => {
  const html = await readFile(htmlPath, "utf8");
  const resume = await readFile(resumePath);
  const digest = createHash("sha256").update(resume).digest("hex");

  assert.match(html, /href="assets\/resume\.pdf" download/);
  assert.equal(resume.subarray(0, 5).toString("ascii"), "%PDF-");
  assert.equal(digest, "d223b4e6d61e6ec9b8de14f0f52c2f545c9656b5f90515de6c27f4427eee29dd");
});
