"""Copy the chosen launch video into Pages and refresh its cache version."""
import hashlib
from pathlib import Path
import re
import shutil

ROOT = Path(__file__).resolve().parents[2]


def main():
    source = ROOT / 'BRAG' / 'brag.mp4'
    target = ROOT / 'website' / 'assets' / 'launch.mp4'
    digest = hashlib.sha256(source.read_bytes()).hexdigest()[:12]
    shutil.copy2(source, target)
    index = ROOT / 'website' / 'index.html'
    content = index.read_text(encoding='utf-8')
    content, count = re.subn(r'assets/launch\.mp4(?:\?v=[^"\s<>]*)?',
                             f'assets/launch.mp4?v={digest}', content)
    if not count:
        raise RuntimeError('No launch-video references found in website/index.html')
    index.write_text(content, encoding='utf-8')
    print(f'Synced launch video ({target.stat().st_size:,} bytes), cache version {digest}')


if __name__ == '__main__':
    main()
