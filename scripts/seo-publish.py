#!/usr/bin/env python3
"""Turn a seo/drafts/<slug>.md into page body + FAQ JSON for the Astro manifests.
Usage: scripts/seo-publish.py seo/drafts/vs-praktika.md
Prints: the HTML body (frontmatter + FAQ comment stripped) and the FAQ as JSON.
Copy-paste into src/pages/... and the matching manifest entry."""
import json, re, sys
src = open(sys.argv[1]).read()
fm, body = re.match(r'^---\n(.*?)\n---\n(.*)$', src, re.S).groups()
faq_m = re.search(r'<!--\s*FAQ.*?\n(.*?)-->', body, re.S)
faq = []
if faq_m:
    for q, a in re.findall(r'Q: (.*?)\nA: (.*?)(?=\nQ: |\Z)', faq_m.group(1).strip(), re.S):
        faq.append({'q': q.strip(), 'a': ' '.join(a.split())})
    body = body[:faq_m.start()].rstrip() + '\n'
print(body)
print('/* FAQ */')
print(json.dumps(faq, ensure_ascii=False, indent=2))
