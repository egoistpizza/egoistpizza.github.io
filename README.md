# egoistpizza.github.io

Personal research portfolio of Yusuf Özçetin, live at **[egoistpizza.github.io](https://egoistpizza.github.io/)**.

I compress neural networks with tensor networks from quantum physics. The site leads with [HybridQTN](https://github.com/egoistpizza/hybrid-qtn), a U-Net whose bottleneck is replaced by a tensor-network block, and then lists my other research, engineering, teaching and events.

## What's on the page

- **HybridQTN comparison:** pick one of six held-out Kvasir-SEG test frames and switch between the ground truth, U-Net and HybridQTN masks. The masks are real predictions from the seed-43 checkpoints, including one frame where the U-Net does better.
- **Zero-shot clip:** HybridQTN, trained only on Kvasir-SEG, segmenting a CVC-ClinicDB colonoscopy sequence it never saw (mean Dice 0.805).
- **Everything else:** about 30 projects, tools, classes and events, each linked to its code or page where one exists.

## Built with

Plain HTML, CSS and JavaScript. No framework, no build step and no third-party scripts. The typeface is Clash Grotesk, self-hosted.

```
index.html        the page
styles.css        all styles
main.js           comparison viewer, entrances, clip control, clock
assets/cases/     Kvasir-SEG frames and predicted masks
assets/img/       photographs and the results chart
assets/video/     the CVC-ClinicDB clip
assets/fonts/     Clash Grotesk (woff2)
```

To preview locally:

```bash
python3 -m http.server 8000
```

then open http://localhost:8000. Deployment is GitHub Pages from `main`. When `styles.css` or `main.js` changes, bump the `?v=` number on their links in `index.html` so visitors don't get a cached copy.

## Licence

The **code** (`index.html`, `styles.css`, `main.js`) is licensed under the [GNU GPL v3](LICENSE).

The GPL does **not** cover the files in `assets/`. They keep their own terms:

| Files | Source | Terms |
|---|---|---|
| `assets/cases/*.jpg` | Kvasir-SEG, Jha et al., "Kvasir-SEG: A Segmented Polyp Dataset", MMM 2020 | Research and educational use; see the dataset's own licence |
| `assets/cases/*.png` | Masks derived from Kvasir-SEG: ground truth and model predictions | Same terms as Kvasir-SEG |
| `assets/video/*` | Frames from CVC-ClinicDB, Bernal et al., *Computerized Medical Imaging and Graphics*, 2015, with HybridQTN predictions | Research and educational use; see the dataset's own licence |
| `assets/img/talk-*`, `team-*`, `batch-*`, `audience.jpg`, `portrait.jpg` | inzva AI Projects #10 showcase, Istanbul, October 2026 | All rights reserved by their owners; not for reuse |
| `assets/img/codex-*` | CODEX AI Hackathon demo day, Turkish-German University, May 2026 | All rights reserved; not for reuse |
| `assets/img/fig-dice-hd95.png` | HybridQTN results figure | © Yusuf Özçetin and the HybridQTN team |
| `assets/fonts/*` | Clash Grotesk by the Indian Type Foundry, via Fontshare | ITF Free Font License |
| `assets/favicon.svg` | Original | GPL v3, with the code |

## Contact

[yusufozcetin@proton.me](mailto:yusufozcetin@proton.me) · [LinkedIn](https://www.linkedin.com/in/yusuf-ozcetin/)
