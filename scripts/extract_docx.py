import zipfile
import xml.etree.ElementTree as ET
import os

# Path to the docx in the workspace
DOCX = r"d:\projectEntrepreneur\AI_ML Portfolio Website – Requirement Document.docx"
OUT = r"d:\projectEntrepreneur\docx_extracted.txt"

if not os.path.exists(DOCX):
    print('DOCX not found:', DOCX)
    raise SystemExit(1)

with zipfile.ZipFile(DOCX) as z:
    xml = z.read('word/document.xml')

root = ET.fromstring(xml)
ns = {'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
paras = []
for p in root.findall('.//w:p', ns):
    texts = [t.text for t in p.findall('.//w:t', ns) if t.text]
    if texts:
        paras.append(''.join(texts))

text = '\n\n'.join(paras)
with open(OUT, 'w', encoding='utf-8') as f:
    f.write(text)

print('Wrote:', OUT)
print('Preview:\n')
print(text[:4000])
