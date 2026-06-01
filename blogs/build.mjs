import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

async function buildSite() {
  console.log('Fetching articles from Observatory Feed...');
  let articles = [];
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    articles = await res.json();
  } catch (error) {
    console.error('Failed to fetch feed:', error.message);
    process.exit(1);
  }

  console.log(`Found ${articles.length} articles.`);

  const templatePath = path.join(__dirname, 'detections', '_template.html');
  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  const outDir = path.join(__dirname, 'detections');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const generatedFiles = [];

  for (const article of articles) {
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

buildSite();
