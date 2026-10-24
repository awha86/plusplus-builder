# plusplus-builder
3D Plus-Plus model and buildable figure generator

Måleprotokol for fysisk reference: [docs/maaleprotokol.md](docs/maaleprotokol.md).

## 3D-prototype

Den første Three.js-scene viser en tydeligt markeret placeholder, ikke en målepræcis Plus-Plus-brik. Start den lokalt med:

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
