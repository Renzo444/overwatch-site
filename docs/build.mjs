/**
 * Builds the public product documentation at /docs from the Markdown in docs/content.
 * The Markdown is written and kept current in the Overwatch Console repository (docs/library);
 * pass --from <path to that folder> to copy the latest version in before building.
 *
 *   node docs/build.mjs
 *   node docs/build.mjs --from ../overwatch-console/docs/library
 *
 * Output: docs/index.html and docs/<section>/<page>/index.html, committed like the blog pages.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, 'content');
const SITE = 'https://www.overwatchsecurity.tech';
// Maintainer-only files in the console repository that are not published.
const INTERNAL = new Set(['MAINTAINING.md', 'coverage.json']);
const SECTIONS = ['features', 'how-to', 'concepts'];

const args = process.argv.slice(2);
if (args.includes('--from')) syncFrom(path.resolve(args[args.indexOf('--from') + 1]));

function syncFrom(source) {
  if (!fs.existsSync(path.join(source, 'README.md'))) throw new Error(`${source} is not the docs library folder`);
  fs.rmSync(contentDir, { recursive: true, force: true });
  (function copy(from, to) {
    fs.mkdirSync(to, { recursive: true });
    for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
      if (INTERNAL.has(entry.name)) continue;
      if (entry.isDirectory()) copy(path.join(from, entry.name), path.join(to, entry.name));
      else if (entry.name.endsWith('.md')) fs.copyFileSync(path.join(from, entry.name), path.join(to, entry.name));
    }
  })(source, contentDir);
  console.log(`Copied docs from ${source}`);
}

// ── Markdown ──────────────────────────────────────────────────────────────
// A small renderer for the subset the library uses: headings, paragraphs, lists (one level of
// nesting), tables, block quotes, fenced code, inline code, bold, italics and links.

const escapeHtml = text => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function frontMatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(text);
  const fields = {};
  if (match) for (const line of match[1].split(/\r?\n/)) {
    const pair = /^([\w-]+):\s*(.*?)\s*(#.*)?$/.exec(line);
    if (pair) fields[pair[1]] = pair[2];
  }
  return { fields, body: match ? text.slice(match[0].length) : text };
}

function slug(text) {
  return text.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-');
}

function inline(text, linkFor) {
  const codes = [];
  let out = text.replace(/`([^`]+)`/g, (_, code) => `\u0000${codes.push(code) - 1}\u0000`);
  out = escapeHtml(out);
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, href) => {
    const target = linkFor(href.replace(/&amp;/g, '&'));
    return target ? `<a href="${escapeHtml(target)}"${/^https?:/.test(target) ? ' rel="noopener" target="_blank"' : ''}>${label}</a>` : label;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  return out.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${escapeHtml(codes[i])}</code>`);
}

function render(markdown, linkFor) {
  const lines = markdown.replace(/\r/g, '').split('\n');
  const html = [];
  const headings = [];
  let i = 0;
  const isBlank = line => !line.trim();
  const listItem = /^(\s*)([-*]|\d+\.)\s+(.*)$/;
  const startsBlock = line => /^(#{1,6}\s|```|>|\|)/.test(line) || listItem.test(line);

  while (i < lines.length) {
    const line = lines[i];
    if (isBlank(line)) { i++; continue; }

    const heading = /^(#{1,6})\s+(.*)$/.exec(line);
    if (heading) {
      const level = heading[1].length;
      const text = inline(heading[2], linkFor);
      const id = slug(text);
      if (level === 2) headings.push({ id, text });
      html.push(level === 1 ? `<h1>${text}</h1>` : `<h${level} id="${id}">${text}</h${level}>`);
      i++; continue;
    }

    if (line.startsWith('```')) {
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++]);
      i++;
      html.push(`<pre><code>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }

    if (line.startsWith('>')) {
      const quote = [];
      while (i < lines.length && lines[i].startsWith('>')) quote.push(lines[i++].replace(/^>\s?/, ''));
      html.push(`<blockquote>${render(quote.join('\n'), linkFor).html}</blockquote>`);
      continue;
    }

    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      const cells = row => row.replace(/^\||\|$/g, '').split('|').map(cell => cell.trim());
      const head = cells(rows[0]);
      const body = rows.slice(/^\|[\s:|-]+\|$/.test(rows[1] || '') ? 2 : 1).map(cells);
      html.push(`<div class="docs-table"><table><thead><tr>${head.map(c => `<th>${inline(c, linkFor)}</th>`).join('')}</tr></thead><tbody>${body.map(r => `<tr>${r.map(c => `<td>${inline(c, linkFor)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }

    if (listItem.test(line)) {
      const items = [];
      while (i < lines.length) {
        const current = lines[i];
        const match = listItem.exec(current);
        if (match) { items.push({ indent: match[1].length, ordered: /\d/.test(match[2]), text: match[3] }); i++; continue; }
        if (!isBlank(current) && /^\s+\S/.test(current) && items.length) { items[items.length - 1].text += ` ${current.trim()}`; i++; continue; }
        if (isBlank(current) && i + 1 < lines.length && listItem.test(lines[i + 1])) { i++; continue; }
        break;
      }
      html.push(renderList(items, 0, items[0].indent).html);
      continue;
    }

    const paragraph = [];
    while (i < lines.length && !isBlank(lines[i]) && !startsBlock(lines[i])) paragraph.push(lines[i++].trim());
    html.push(`<p>${inline(paragraph.join(' '), linkFor)}</p>`);
  }

  function renderList(items, start, indent) {
    const tag = items[start].ordered ? 'ol' : 'ul';
    let out = `<${tag}>`;
    let index = start;
    while (index < items.length && items[index].indent >= indent) {
      const item = items[index];
      if (item.indent > indent) { index++; continue; }
      out += `<li>${inline(item.text, linkFor)}`;
      index++;
      if (index < items.length && items[index].indent > indent) {
        const nested = renderList(items, index, items[index].indent);
        out += nested.html;
        index = nested.next;
      }
      out += '</li>';
    }
    return { html: `${out}</${tag}>`, next: index };
  }

  return { html: html.join('\n'), headings };
}

// ── Pages ─────────────────────────────────────────────────────────────────

function collectDocs() {
  const docs = [];
  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith('.md')) docs.push(path.relative(contentDir, full).split(path.sep).join('/'));
    }
  })(contentDir);
  return docs;
}

const urlFor = doc => doc === 'README.md' ? '/docs/' : `/docs/${doc.replace(/\.md$/, '')}/`;

function main() {
  const docs = collectDocs();
  const known = new Set(docs);
  const pages = docs.map(doc => {
    const { fields, body } = frontMatter(fs.readFileSync(path.join(contentDir, doc), 'utf8'));
    return { doc, fields, body, title: fields.title || doc };
  });
  const byDoc = Object.fromEntries(pages.map(page => [page.doc, page]));

  const linkFrom = doc => href => {
    if (/^(https?:|mailto:)/.test(href)) return href;
    if (href.startsWith('#')) return href;
    const [file, hash] = href.split('#');
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(doc), file));
    if (!known.has(resolved)) return null; // maintainer-only or missing: render as plain text
    return urlFor(resolved) + (hash ? `#${hash}` : '');
  };

  const sidebar = current => {
    const group = (heading, prefix) => {
      const label = page => { const text = page.title.replace(/^How to /, ''); return text[0].toUpperCase() + text.slice(1); };
      const items = pages.filter(page => page.doc.startsWith(`${prefix}/`) && page.fields.status !== 'removed')
        .map(page => ({ ...page, label: label(page) })).sort((a, b) => a.label.localeCompare(b.label));
      if (!items.length) return '';
      return `<div class="docs-nav-group"><h4>${heading}</h4>${items.map(page => `<a href="${urlFor(page.doc)}"${page.doc === current ? ' aria-current="page"' : ''}>${escapeHtml(page.label)}</a>`).join('')}</div>`;
    };
    const start = ['README.md', 'getting-started.md'].filter(doc => byDoc[doc])
      .map(doc => `<a href="${urlFor(doc)}"${doc === current ? ' aria-current="page"' : ''}>${doc === 'README.md' ? 'Documentation home' : escapeHtml(byDoc[doc].title)}</a>`).join('');
    return `<div class="docs-nav-group">${start}</div>${group('Concepts', 'concepts')}${group('Features', 'features')}${group('How-To guides', 'how-to')}`;
  };

  for (const page of pages) {
    const { html, headings } = render(page.body, linkFrom(page.doc));
    const status = page.fields.status && page.fields.status !== 'current'
      ? `<span class="docs-status docs-status-${escapeHtml(page.fields.status)}">${escapeHtml(page.fields.status)}</span>` : '';
    const description = escapeHtml((page.body.split('\n').find(line => line && !/^[#>|\-*\d]/.test(line)) || page.title).slice(0, 160));
    const toc = headings.length > 2 ? `<nav class="docs-toc" aria-label="On this page"><h4>On this page</h4>${headings.map(h => `<a href="#${h.id}">${h.text}</a>`).join('')}</nav>` : '';
    const out = layout({
      title: page.title, description, canonical: SITE + urlFor(page.doc), sidebar: sidebar(page.doc),
      main: `${status}${html}${page.fields.reviewed ? `<p class="docs-reviewed">Last reviewed ${escapeHtml(page.fields.reviewed)}</p>` : ''}`, toc,
    });
    const target = path.join(__dirname, ...urlFor(page.doc).replace(/^\/docs\//, '').split('/').filter(Boolean), 'index.html');
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, out);
  }

  // Remove generated pages whose Markdown no longer exists.
  for (const section of SECTIONS) {
    const dir = path.join(__dirname, section);
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs.readdirSync(dir)) {
      if (!known.has(`${section}/${entry}.md`)) fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
    }
  }
  const single = path.join(__dirname, 'getting-started');
  if (fs.existsSync(single) && !known.has('getting-started.md')) fs.rmSync(single, { recursive: true, force: true });

  console.log(`Built ${pages.length} docs pages.`);
}

function layout({ title, description, canonical, sidebar, main, toc }) {
  const fullTitle = title === 'Overwatch Console documentation' ? title : `${title} | Overwatch Console docs`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(fullTitle)}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:title" content="${escapeHtml(fullTitle)}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:site_name" content="Overwatch Security">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles.css">
    <link rel="stylesheet" href="/docs/docs.css">
    <link rel="icon" href="/favicon.png" type="image/png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
<body class="docs-body">
    <nav class="nav scrolled" id="nav">
        <div class="nav-inner">
            <a href="/" class="nav-logo"><img src="/logo.png" alt="Overwatch Security" /></a>
            <div class="nav-links">
                <a href="/#home" class="nav-link">Home</a>
                <a href="/#platform" class="nav-link">Platform</a>
                <a href="/#services" class="nav-link">Services</a>
                <a href="/blogs/" class="nav-link">Observatory</a>
                <a href="/docs/" class="nav-link active">Docs</a>
                <a href="https://outlook.office.com/book/InitialCall@overwatchsecurity.tech/?ismsaljsauthenabled" class="nav-cta" target="_blank">Book a Consultation</a>
            </div>
            <button class="nav-mobile-toggle" id="mobileToggle" aria-label="Toggle menu"><span></span><span></span><span></span></button>
        </div>
    </nav>
    <div class="docs-shell">
        <details class="docs-sidebar" open>
            <summary>Documentation menu</summary>
            <nav aria-label="Documentation">${sidebar}</nav>
        </details>
        <main class="docs-main"><article class="docs-article">${main}</article></main>
        ${toc}
    </div>
    <footer class="footer">
        <div class="container">
            <div class="footer-bottom"><p>© 2026 Overwatch Security LLC. All rights reserved.</p></div>
        </div>
    </footer>
    <script>
        document.getElementById('mobileToggle')?.addEventListener('click', function() {
            this.classList.toggle('open');
            document.querySelector('.nav-links').classList.toggle('open');
        });
        if (window.matchMedia('(max-width: 900px)').matches) document.querySelector('.docs-sidebar')?.removeAttribute('open');
    </script>
</body>
</html>
`;
}

main();
