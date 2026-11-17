# FileScout website

Plain HTML, CSS and JavaScript. No build step, account, analytics or remote fonts.
The final video is `BRAG/BRAG-FINAL.mp4`. The Pages workflow automatically copies
it into `assets/launch.mp4` and versions the video URL by its content hash to avoid
stale browser caches. Replacing that BRAG file triggers a new deployment.
For local preview after replacing it, run `python tools/website/sync_video.py`.

## Preview locally

From the repository root:

```powershell
.venv\Scripts\python.exe -m http.server 8080 --bind 127.0.0.1 --directory website
```

Open http://127.0.0.1:8080. The video requests muted inline autoplay; browsers
can block it, so Play and Enable sound controls are provided. Reduced-motion
preferences show the poster with manual playback instead.

## Publish the download

Create a public GitHub Release in `vikramgt/Better-Windows-Search` and attach:

- `installer/output/FileScout-Windows-0.1.0.zip`
- Optionally `installer/output/FileScout-Setup-0.1.0-x64.exe` and `SHA256SUMS.txt`.

The ZIP includes setup, the first-run README and the checksum. Do not put the
168 MB ZIP in the Pages folder or commit it to Git. Use a regular public release,
not a draft or prerelease, for the latest-release lookup.

The Download button links directly to the already-published
`Recall-Windows-0.1.0.zip` asset on release tag `v0.1.0`. This is the existing
public download; the newly built FileScout installer has not been uploaded.
No release API lookup or intermediate downloads page is used.

## Publish on GitHub Pages

1. In repository Settings > Pages, select **GitHub Actions** as the source.
2. Push `website/` and `.github/workflows/pages.yml` to `main`, or run the
   **Publish FileScout website** workflow manually.
3. Expected address: https://vikramgt.github.io/Better-Windows-Search/

Only `website/` is uploaded. FileScout's app files, local data, BRAG development
files and installer build environment are not part of the Pages artifact.

No release, commit, push or deployment is performed by creating these files.
For another repo/domain, update the download and GitHub links in
`index.html`, and its Open Graph image URL. Music attribution is in the footer.

References: [GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages),
[browser autoplay](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Autoplay).
