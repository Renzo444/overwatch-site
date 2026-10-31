import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_URL = 'https://console.overwatchsecurity.tech/api/observatory/feed';

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function severityClass(score) {
  const n = parseInt(score);
  if (isNaN(n)) return 'informational';
  if (n >= 85) return 'high';
  if (n >= 60) return 'medium';
  return 'low';
}

function severityText(score) {
  const n = parseInt(score);
  if (isNaN(n)) return 'Informational';
  if (n >= 85) return 'High Confidence';
  if (n >= 60) return 'Medium Confidence';
  return 'Low Confidence';
}

// ─── Overwatch Labs research posts (Malware Analysis category) ────────────────
// A research post (kind === 'research') carries its own story, figures and tables from the feed; the
// console redacts and defangs it before it is served, so the build only escapes HTML and lays it out.

const RESEARCH_CATEGORY = 'Malware Analysis';
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// Research posts carry only the Malware Analysis tag, no severity badge (Lorenzo, Oct 31).

function researchBody(a) {
  const date = a.timestamp ? formatDate(a.timestamp) : '';
  const purpose = a.purpose || {};
  const verdict = [
    ['What it is', (purpose.categories || []).map(c => c[0].toUpperCase() + c.slice(1)).join(', ') || 'Malware'],
    ['What it wants', purpose.goal || ''],
    ['Family', purpose.family || 'No match to a known family'],
    ['Confidence', purpose.confidence || ''],
  ].filter(([, v]) => v).map(([k, v]) => `<div><span class="obs-verdict-label">${esc(k)}</span><span class="obs-verdict-value">${esc(v)}</span></div>`).join('');

  const blocks = (section) => (section.blocks || []).map(b => {
    if (b.type === 'figure') {
      const lines = (b.lines || []).map(esc).join('\n');
      return `<div class="obs-code-container"><div class="obs-code-header"><span class="obs-term-dots"><i></i><i></i><i></i></span><span class="obs-code-lang">${esc(b.title || 'tool output')}</span></div><div class="obs-code-body"><pre>${b.command ? esc(b.command) + '\n' : ''}${lines}</pre></div></div>${b.caption ? `<p class="obs-figcap">${esc(b.caption)}</p>` : ''}`;
    }
    if (b.type === 'flow') {
      const steps = (b.steps || []);
      const w = 720, bw = Math.max(110, Math.min(160, Math.floor((w - 20 - (steps.length - 1) * 36) / Math.max(1, steps.length))));
      const gap = steps.length > 1 ? (w - 16 - steps.length * bw) / (steps.length - 1) : 0;
      let x = 8;
      const nodes = steps.map((s, i) => {
        const cx = x + bw / 2; const left = x; x += bw + gap;
        const arrow = i < steps.length - 1 ? `<line x1="${left + bw}" y1="77" x2="${left + bw + gap}" y2="77" stroke="#6e7681" stroke-width="1.5" marker-end="url(#ar)"/>` : '';
        return `<g><rect x="${left}" y="42" width="${bw}" height="70" rx="10" fill="#121d18" stroke="rgba(59,221,92,0.35)"/><text x="${cx}" y="68" text-anchor="middle" fill="#e8edf5" font-weight="600" font-size="12">${esc(s.label)}</text><text x="${cx}" y="86" text-anchor="middle" fill="#8b9bb5" font-size="11">${esc(s.detail)}</text>${s.technique ? `<text x="${cx}" y="103" text-anchor="middle" fill="#3bdd5c" font-size="11">${esc(s.technique)}</text>` : ''}</g>${arrow}`;
      }).join('');
      return `<div class="obs-flow"><svg viewBox="0 0 ${w} 130" role="img" aria-label="${esc(b.caption || 'Attack flow')}"><defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 10 5 0 10z" fill="#6e7681"/></marker></defs>${nodes}</svg></div>${b.caption ? `<p class="obs-figcap">${esc(b.caption)}</p>` : ''}`;
    }
    if (b.type === 'subtitle') return `<h3 class="obs-subtitle">${esc(b.text)}</h3>`;
    return `<div class="obs-body-text"><p>${esc(b.text)}</p></div>`;
  }).join('\n');

  const sections = (a.sections || []).map(s => `<section class="obs-section"><h2 class="obs-section-title">${esc(s.title)}</h2>${blocks(s)}</section>`).join('\n');

  const iocRows = (a.iocs || []).map(i => `<tr><td>${esc(i.type)}</td><td><code>${esc(i.value)}</code></td><td>${esc(i.context || '')}</td></tr>`).join('');
  const iocTable = (a.iocs || []).length ? `<section class="obs-section"><h2 class="obs-section-title">Indicators</h2><div class="obs-body-text"><p>Every indicator the analysis found. Network indicators are defanged so they cannot be clicked. We never share the sample itself.</p></div><div class="obs-table-wrap"><table class="obs-table"><thead><tr><th>Type</th><th>Indicator</th><th>Context</th></tr></thead><tbody>${iocRows}</tbody></table></div></section>` : '';

  const attackRows = (a.attack || []).map(t => `<tr><td>${esc((t.tactics || []).join(', '))}</td><td>${esc(t.name)}</td><td class="obs-ttp">${esc(t.id)}</td><td>${esc(t.evidence || '')}</td></tr>`).join('');
  const attackTable = (a.attack || []).length ? `<section class="obs-section"><h2 class="obs-section-title">MITRE ATT&amp;CK</h2><div class="obs-table-wrap"><table class="obs-table"><thead><tr><th>Tactic</th><th>Technique</th><th>ID</th><th>Evidence</th></tr></thead><tbody>${attackRows}</tbody></table></div></section>` : '';

  const detBlocks = (a.detections || []).map((d, i) => `<h3 class="obs-subtitle">${esc(d.title)}</h3><div class="obs-code-container"><div class="obs-code-header"><span class="obs-code-lang">KQL</span><button class="obs-copy-btn" type="button" data-copy="kql${i}" aria-label="Copy KQL query"><span>Copy</span></button></div><div class="obs-code-body"><pre id="kql${i}">${esc(d.query)}</pre></div></div>${d.explanation ? `<div class="obs-body-text"><p>${esc(d.explanation)}</p></div>` : ''}`).join('\n');
  const yaraBlocks = (a.yara || []).map((y, i) => `<h3 class="obs-subtitle">YARA: ${esc(y.title)}</h3><div class="obs-code-container"><div class="obs-code-header"><span class="obs-code-lang">YARA</span><button class="obs-copy-btn" type="button" data-copy="yara${i}" aria-label="Copy YARA rule"><span>Copy</span></button></div><div class="obs-code-body"><pre id="yara${i}">${esc(y.rule)}</pre></div></div>`).join('\n');
  const yaraNote = (a.yara || []).length ? `<p class="obs-figcap">Each YARA rule matched this sample and none of our clean test files when Caleb tested it.</p>` : '';
  const detections = ((a.detections || []).length || (a.yara || []).length) ? `<section class="obs-section"><h2 class="obs-section-title">Detection</h2>${detBlocks}${yaraBlocks}${yaraNote}<div class="obs-note"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 9v4m0 4h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg><div>These queries are starting points and have not been tested against production data. Tune them to your environment before alerting.</div></div></section>` : '';

  const notCovered = (a.notCovered || []).length ? `<section class="obs-section"><h2 class="obs-section-title">What we have not covered yet</h2><div class="obs-body-text">${a.notCovered.map(v => `<p>${esc(v)}</p>`).join('')}</div></section>` : '';

  const takeaways = (a.takeaways || []).length ? `<section class="obs-section"><h2 class="obs-section-title">What defenders should do</h2><ol class="obs-takeaways">${a.takeaways.map(t => `<li><div><strong>${esc(t.title)}</strong>${esc(t.text)}</div></li>`).join('')}</ol></section>` : '';

  const findings = (a.findings || []).length ? `<div class="obs-findings"><div class="obs-findings-title">Key findings</div><ul>${a.findings.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>` : '';

  return `        <nav class="obs-breadcrumbs" aria-label="Breadcrumb">
            <a href="/blogs/">Observatory</a><span class="obs-breadcrumbs-sep">/</span>
            <a href="/blogs/?category=malware%20analysis">${RESEARCH_CATEGORY}</a><span class="obs-breadcrumbs-sep">/</span>
            <span class="obs-breadcrumbs-current">${esc(a.title)}</span>
        </nav>
        <header class="obs-article-header">
            <div class="obs-article-meta">
                <span class="obs-article-date">${esc(date)}</span>
                <span class="obs-kind-badge">${RESEARCH_CATEGORY}</span>
            </div>
            <h1 class="obs-article-title">${esc(a.title)}</h1>
            ${a.dek ? `<p class="obs-article-dek">${esc(a.dek)}</p>` : ''}
            <p class="obs-article-byline">By <strong>${esc(a.byline || 'Overwatch Labs')}</strong>${a.analyst ? ` &middot; Malware analysis by ${esc(a.analyst)}` : ''}</p>
        </header>
        ${a.methods ? `<div class="obs-methods"><div class="obs-methods-label">How this analysis was produced</div><p>${esc(a.methods)}</p></div>` : ''}
        ${verdict ? `<div class="obs-verdict">${verdict}</div>` : ''}
        ${findings}
        ${sections}
        ${iocTable}
        ${attackTable}
        ${detections}
        ${notCovered}
        ${takeaways}
        <div class="obs-cta-box">
            <h3 class="obs-cta-title">Want Research Like This Watching <span class="gradient-text">Your Environment</span>?</h3>
            <p class="obs-cta-desc">Overwatch turns its own malware research into tuned detections for your Microsoft Sentinel workspace, with AI analysts triaging every alert around the clock.</p>
            <a href="https://outlook.office.com/book/InitialCall@overwatchsecurity.tech/?ismsaljsauthenabled" class="obs-cta-btn" target="_blank" rel="noopener">Book a Consultation<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14m-7-7l7 7-7 7"/></svg></a>
        </div>`;
}

async function buildSite() {
  let articles = [];
  // OBSERVATORY_FEED_FILE lets CI or a preview build from a saved feed instead of the live endpoint.
  const feedFile = process.env.OBSERVATORY_FEED_FILE;
  if (feedFile) {
    console.log(`Reading articles from ${feedFile}...`);
    articles = JSON.parse(fs.readFileSync(feedFile, 'utf8'));
  } else {
    console.log('Fetching articles from Observatory Feed...');
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      articles = await res.json();
    } catch (error) {
      console.error('Failed to fetch feed:', error.message);
      process.exit(1);
    }
  }

  console.log(`Found ${articles.length} articles.`);

  const researchArticles = articles.filter((a) => a?.kind === 'research');
  const detectionArticles = articles.filter((a) => a?.kind !== 'research');

  const templatePath = path.join(__dirname, 'detections', '_template.html');
  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  const outDir = path.join(__dirname, 'detections');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const generatedFiles = [];

  // ── Overwatch Labs research posts → /blogs/research/<slug>/ ──
  const researchTemplate = fs.readFileSync(path.join(__dirname, 'research', '_template.html'), 'utf8');
  const researchDir = path.join(__dirname, 'research');
  for (const article of researchArticles) {
    const slug = slugify(article.title);
    const dir = path.join(researchDir, slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const html = researchTemplate
      .replace(/{{TITLE}}/g, esc(article.title || ''))
      .replace(/{{META_DESCRIPTION}}/g, esc(String(article.dek || '').slice(0, 160)))
      .replace(/{{CANONICAL_SLUG}}/g, slug)
      .replace('{{BODY}}', researchBody(article))
      .replace(/href="\.\.\//g, 'href="/').replace(/src="\.\.\//g, 'src="/');
    fs.writeFileSync(path.join(dir, 'index.html'), html);
    console.log(`Generated: /blogs/research/${slug}/`);
    generatedFiles.push({ ...article, slug, url: `/blogs/research/${slug}/`, primaryTactic: RESEARCH_CATEGORY, isResearch: true });
  }

  for (const article of detectionArticles) {
    const slug = slugify(article.title);
    
    // Create specific folder for each article based on slug for beautiful URLs
    const articleDir = path.join(outDir, slug);
    if (!fs.existsSync(articleDir)) fs.mkdirSync(articleDir, { recursive: true });

    // Process variables
    const date = article.timestamp ? formatDate(article.timestamp) : '';
    const sevClass = severityClass(article.confidenceScore);
    const sevText = severityText(article.confidenceScore);
    const htmlBody = (article.article || '').split(/\n{2,}/).map(p => `<p>${p.trim()}</p>`).join('');

    // Generate KQL blocks
    const kqlBlocks = (article.kqlQueries || []).map(q => {
      // Priority: 1) reasoning from detection library, 2) detectionStrategy summary, 
      // 3) inline Description from KQL, 4) synthesized fallback
      let desc = '';
      
      if (q.reasoning) {
        // Best source: the AI-generated reasoning from the detection library
        desc = q.reasoning;
      } else if (q.detectionStrategy) {
        // Second best: compose from detectionStrategy fields
        const strat = q.detectionStrategy;
        const parts = Object.entries(strat)
          .filter(([, v]) => v)
          .map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1').trim()}: ${v}`)
          .join('. ');
        desc = parts || '';
      }
      
      if (!desc) {
        // Try extracting an inline Description from the KQL query itself
        const descMatch = q.query.match(/Description\s*=\s*"([^"]+)"/);
        if (descMatch) {
          desc = descMatch[1];
        }
      }
      
      if (!desc) {
        // Last resort: synthesize from table + technique
        const tableMatch = q.query.match(/^(\w+Events?|SecurityEvent|Syslog|SigninLogs|AuditLogs|CommonSecurityLog|OfficeActivity|ThreatIntelligenceIndicator)/m);
        const tableName = tableMatch ? tableMatch[1] : 'telemetry';
        const tableDescriptions = {
          'DeviceProcessEvents': 'process execution activity',
          'DeviceNetworkEvents': 'network connection activity',
          'DeviceFileEvents': 'file system activity',
          'DeviceRegistryEvents': 'registry modification activity',
          'DeviceImageLoadEvents': 'DLL/image load activity',
          'DeviceLogonEvents': 'logon activity',
          'SecurityEvent': 'Windows security events',
          'Syslog': 'syslog entries',
          'SigninLogs': 'Azure AD sign-in activity',
          'AuditLogs': 'audit log activity',
          'CommonSecurityLog': 'CEF-formatted security events',
          'OfficeActivity': 'Office 365 activity',
          'EmailEvents': 'email activity',
          'UrlClickEvents': 'URL click activity',
          'CloudAppEvents': 'cloud application activity',
          'IdentityLogonEvents': 'identity logon activity',
          'ThreatIntelligenceIndicator': 'threat intelligence indicators',
        };
        const tableDesc = tableDescriptions[tableName] || 'endpoint telemetry';
        const techClean = q.technique.replace(/\s*\(T\d+[\.\d]*\)\s*$/, '');
        desc = `Monitors ${tableDesc} for behavioral patterns associated with ${techClean} (${q.tactic}). Deploy this query in Microsoft Sentinel to surface suspicious activity in your environment.`;
      }

      return `
      <div style="margin-bottom:2rem">
          <div style="font-size:0.7rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--accent-green);margin-bottom:0.5rem;font-weight:600">${q.tactic} / ${q.technique}</div>
          <p style="font-size:0.88rem;line-height:1.65;color:var(--text-secondary);margin-bottom:0.75rem">${desc}</p>
          <div class="obs-code-container">
              <div class="obs-code-header">
                  <span class="obs-code-lang">KQL</span>
                  <button class="obs-copy-btn" onclick="copyKql(this)" data-query="${encodeURIComponent(q.query)}" aria-label="Copy KQL query">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      <span>Copy</span>
                  </button>
              </div>
              <div class="obs-code-body">
                  <pre>${q.query.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>
              </div>
          </div>
      </div>
      `;
    }).join('');

    const tactics = (article.kqlQueries || [])
      .map(q => q.tactic)
      .filter((t, i, arr) => arr.indexOf(t) === i)
      .map(t => `<span class="obs-mitre-tag">${t}</span>`)
      .join('');
    
    const techniques = (article.kqlQueries || [])
      .map(q => q.technique)
      .filter((t, i, arr) => arr.indexOf(t) === i)
      .map(t => `<span class="obs-mitre-tag">${t}</span>`)
      .join('');

    let finalHtml = templateHtml
      .replace(/{{TITLE}}/g, article.title || '')
      .replace(/{{META_DESCRIPTION}}/g, (article.article || '').substring(0, 150).replace(/"/g, '&quot;') + '...')
      .replace(/{{CANONICAL_SLUG}}/g, slug)
      .replace(/{{DATE}}/g, date)
      .replace(/{{SEVERITY_CLASS}}/g, sevClass)
      .replace(/{{SEVERITY}}/g, sevText)
      .replace(/{{SUMMARY}}/g, htmlBody)
      .replace(/{{SOURCE_URL}}/g, article.sourceUrl || '#')
      .replace(/{{SOURCE_NAME}}/g, article.source || 'Threat Intel')
      .replace(/{{MITRE_TACTICS}}/g, tactics || '<span class="obs-mitre-tag">N/A</span>')
      .replace(/{{MITRE_TECHNIQUES}}/g, techniques || '<span class="obs-mitre-tag">N/A</span>')
      .replace(/{{VERIFIED_DATE}}/g, date)
      .replace(/{{DESCRIPTION}}/g, '<p>This detection logic targets specific behavioral indicators mapped to the MITRE framework as identified in the source intelligence.</p>');

    // Replace the default KQL block with our dynamic blocks
    finalHtml = finalHtml.replace(
      /<!-- Detection Rule -->\s*<section class="obs-section">[\s\S]*?id="obsKqlCode"[\s\S]*?<\/section>/,
      `<!-- Detection Rule -->
      <section class="obs-section">
        <h2 class="obs-section-title">Detection Rules</h2>
        ${kqlBlocks}
        <div class="obs-verified-badge">
            <svg class="obs-verified-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            Verified against live Sentinel &mdash; ${date}
        </div>
      </section>
      <script>
        function copyKql(btn) {
          const query = decodeURIComponent(btn.dataset.query);
          const span = btn.querySelector('span');
          navigator.clipboard.writeText(query).then(() => {
              btn.classList.add('obs-copied');
              span.textContent = 'Copied';
              setTimeout(() => { btn.classList.remove('obs-copied'); span.textContent = 'Copy'; }, 2000);
          });
        }
      </script>`
    );

    // Make asset paths absolute since we are in a subfolder
    finalHtml = finalHtml.replace(/href="\.\.\//g, 'href="/');
    finalHtml = finalHtml.replace(/src="\.\.\//g, 'src="/');

    const outPath = path.join(articleDir, 'index.html');
    fs.writeFileSync(outPath, finalHtml);
    console.log(`Generated: /blogs/detections/${slug}/`);
    
    // Save metadata for the index.html build
    generatedFiles.push({
      ...article,
      slug,
      url: `/blogs/detections/${slug}/`,
      primaryTactic: tactics.match(/>([^<]+)<\/span>/)?.[1] || 'General'
    });
  }

  // Rewrite blogs/index.html to include static links
  rewriteIndexFile(generatedFiles);
}

function rewriteIndexFile(articles) {
  const indexPath = path.join(__dirname, 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf8');

  // We will replace the JS grid rendering with fully static HTML
  const staticGridHtml = articles.sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0)).map(item => {
    if (item.isResearch) {
      const date = item.timestamp ? formatDate(item.timestamp) : '';
      const cats = (item.purpose?.categories || []).slice(0, 3).map(c => `<span class="obs-tactic-tag">${esc(c[0].toUpperCase() + c.slice(1))}</span>`).join('');
      const desc = esc(item.dek ? (item.dek.length > 180 ? item.dek.slice(0, 180) + '...' : item.dek) : '');
      return `
      <a href="${item.url}" class="obs-card" data-category="malware analysis">
          <div class="obs-card-header">
              <span class="obs-badge obs-badge--research">${RESEARCH_CATEGORY}</span>
          </div>
          <h3 class="obs-card-title">${esc(item.title)}</h3>
          <p class="obs-card-desc">${desc}</p>
          <div class="obs-card-meta">
              <div class="obs-tactics">${cats}</div>
              <span class="obs-date">${esc(date)}</span>
          </div>
      </a>
    `;
    }
    const tactics = (item.kqlQueries || [])
      .map(q => q.tactic)
      .filter((t, i, arr) => arr.indexOf(t) === i)
      .map(t => `<span class="obs-tactic-tag">${t}</span>`)
      .join('');
    
    const sevClass = severityClass(item.confidenceScore);
    const date = item.timestamp ? formatDate(item.timestamp) : '';
    const desc = item.article ? (item.article.length > 180 ? item.article.substring(0, 180) + '...' : item.article) : '';

    return `
      <a href="${item.url}" class="obs-card" data-category="${item.primaryTactic.toLowerCase()}">
          <div class="obs-card-header">
              <span class="obs-badge obs-badge--detection">${item.primaryTactic}</span>
              ${item.confidenceScore ? `<span class="obs-badge ${sevClass}">${item.confidenceScore}/100</span>` : ''}
          </div>
          <h3 class="obs-card-title">${item.title}</h3>
          <p class="obs-card-desc">${desc}</p>
          <div class="obs-card-meta">
              <div class="obs-tactics">${tactics}</div>
              <span class="obs-date">${date}</span>
          </div>
      </a>
    `;
  }).join('');

  // Remove the old JS fetch logic and replace it with simple filtering
  indexHtml = indexHtml.replace(
    /<div class="obs-grid" id="obsGrid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/,
    `<div class="obs-grid" id="obsGrid">${staticGridHtml}</div></div></section>`
  );

  // Update the inline script to only handle filtering
  const newScript = `
    <script>
        // Nav scroll effect
        window.addEventListener('scroll', () => {
            document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
        });

        // Mobile toggle
        document.getElementById('mobileToggle')?.addEventListener('click', function() {
            this.classList.toggle('open');
            document.querySelector('.nav-links').classList.toggle('open');
        });

        // Category Filter buttons
        document.getElementById('obsFilters')?.addEventListener('click', (e) => {
            const btn = e.target.closest('.obs-filter-btn');
            if (!btn) return;
            
            document.querySelectorAll('.obs-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            const cards = document.querySelectorAll('.obs-card');
            
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category.includes(filter.toLowerCase())) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    </script>
  `;

  indexHtml = indexHtml.replace(/<script>[\s\S]*?<\/script>\s*<\/body>/, newScript + '\n</body>');

  fs.writeFileSync(indexPath, indexHtml);
  console.log('Rewrote /blogs/index.html with static article cards.');
}

export { buildSite, researchBody };

// Run only when invoked directly (node blogs/build.mjs), so the functions can be imported for tests.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) buildSite();
