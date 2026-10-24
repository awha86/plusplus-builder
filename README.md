# plusplus-builder
3D Plus-Plus model and buildable figure generator

Måleprotokol for fysisk reference: [docs/maaleprotokol.md](docs/maaleprotokol.md).

## 3D-prototype

Three.js-scenen viser en parametrisk voxelmodel baseret på de brugerbekræftede mål og det dokumenterede 5 × 3-gitter. Målene er ikke uafhængigt fysisk målt, og kontur, afrundinger og samling er ikke verificeret. Scenens geometri kan derfor ikke bruges som bevis for en præcis eller byggelig Plus-Plus-brik. Start appen lokalt med:

```sh
cd app
npm install
npm run dev
```

For at oprette en produktionsbuild:

```sh
npm run build
```

I browseren kan scenen drejes med musen eller touchpad, zoomes med scroll og flyttes med højreklik/shift-drag.

## GitHub Pages

En GitHub Actions-workflow bygger appen og udgiver den til Pages ved push til `master` eller manuel start af workflowen. Første gang skal repositoryts **Settings → Pages → Build and deployment → Source** sættes til **GitHub Actions**. Når workflowen er kørt færdig, findes prototypen på https://awha86.github.io/plusplus-builder/.

Pages-builden bruger projektets `/plusplus-builder/`-sti; den almindelige lokale udviklingsserver bruger fortsat roden.
