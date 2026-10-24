# Måleprotokol for en standard Plus-Plus-brik

Formålet er at indsamle nok reference til senere at beskrive brikkens omrids og tykkelse. Protokollen forudsætter ikke CAD-erfaring. Brugeroplyste modelmål er registreret nedenfor, men er ikke dermed fysisk verificerede. Skeln altid mellem brugeroplysninger, direkte målinger, estimater og ukendte værdier.

## Udstyr

- En standard Plus-Plus-brik, helst uden synlige skader.
- En lineal med millimeterinddeling.
- Gerne en skydelære til tykkelse og andre små mål.
- En telefon eller et kamera, hvis billeder kan vedhæftes.
- En plan, ensfarvet overflade og godt lys.

## Måle- og fototjekliste

1. Notér hvilken brik der måles: fx produktvariant/størrelse, farve og eventuelle synlige skader. Hvis varianten er ukendt, skriv `ukendt`.
2. Mål den samlede længde og største bredde med lineal eller skydelære. Notér i millimeter, og mål hver dimension tre gange. Skriv alle aflæsninger ned i stedet for kun gennemsnittet.
3. Mål brikkens tykkelse med skydelære tre steder: midt på og nær hver ende. Gentag målingen tre gange hvert sted. Luk skydelæren forsigtigt, så brikken ikke klemmes.
4. Beskriv omridset med almindelige ord: antal og placering af indhak/afrundinger, om enderne ser ens ud, og eventuelle synlige forskelle mellem over- og underside. Mål kun ekstra konturdetaljer, hvis de kan identificeres entydigt.
5. Hvis du kan vedhæfte billeder, så tag:
   - top og bund lige på, med hele brikken synlig;
   - sideprofiler fra to retninger, så tykkelsen kan ses;
   - en lineal ved siden af brikken i samme plan som den fotograferede flade.
6. Hold kameraet så vinkelret på fladen som muligt, undgå perspektiv/skygger der skjuler kanten, og sørg for at linealens nulpunkt og millimeterstreger kan læses.
7. Hvis billeder ikke kan vedhæftes, fortsæt med målene og konturbeskrivelsen. Skriv senere målingerne direkte i en kommentar eller besked; billeder er nyttige, men ikke nødvendige for at udarbejde denne protokol.

## Oplyste modelmål — Mini

Følgende geometri er oplyst af brugeren til brug som programmeringsgrundlag. Den beskriver en 5 × 3 gittermodel med kubiske moduler på 4 mm. Kilden er brugerens specifikation, ikke uafhængig måling eller fysisk kontrol.

- Ydre mål: 20 mm (X) × 12 mm (Y) × 4 mm (Z).
- Modulstørrelse: 4 × 4 × 4 mm.
- Gitterets belægning set ovenfra (`M` = modul, `.` = tom):

  ```text
  Top:    . M . M .
  Midte:  M M M M M
  Bund:   . M . M .
  ```

- I alt 9 moduler: 5 i midterstriben, 2 i øverste række og 2 i nederste række. Hele gitteret har ét modul i Z-retningen.
- Koordinater med origo i gitterets nederste venstre hjørne: midterrækken har X-intervallerne 0–4, 4–8, 8–12, 12–16 og 16–20 mm ved Y=4–8 mm; de fire øvrige moduler ligger ved X=4–8 og 12–16 mm, med Y=0–4 mm eller Y=8–12 mm. Alle moduler ligger ved Z=0–4 mm.

Disse værdier kan bruges som en foreløbig, deterministisk voxel-geometri. Indtil de er sammenholdt med en fysisk brik, skal de mærkes `brugeroplyst/ikke verificeret` og ikke `maalt`. De siger heller ikke noget om brikkens faktiske kurver eller mekaniske samling.

## Registrering

Brug skabelonen herunder. Angiv måleenhed og metode. For hver værdi vælges præcis én status:

- `maalt`: direkte aflæst på den fysiske brik.
- `brugeroplyst`: oplyst af brugeren, men ikke uafhængigt fysisk verificeret.
- `estimat`: anslået fra et billede eller en indirekte metode; ikke verificeret.
- `ukendt`: endnu ikke målt eller kan ikke bestemmes.

| Egenskab | Værdi(er) | Enhed | Status | Metode/noter |
| --- | --- | --- | --- | --- |
| Samlet længde (3 aflæsninger) |  | mm | ukendt |  |
| Største bredde (3 aflæsninger) |  | mm | ukendt |  |
| Tykkelse nær ende A (3 aflæsninger) |  | mm | ukendt |  |
| Tykkelse midt på (3 aflæsninger) |  | mm | ukendt |  |
| Tykkelse nær ende B (3 aflæsninger) |  | mm | ukendt |  |
| Kontur og indhak |  |  | ukendt | Beskriv placering og synlige forskelle |
| Referencebilleder |  |  | ukendt | Filnavne eller “kan ikke vedhæftes” |

Alternativt kan data sendes som JSON. Lad værdier være `null`, indtil de er målt; ændr ikke status til `maalt`, hvis værdien kun er skønnet.

```json
{
  "variant": { "value": null, "status": "ukendt", "notes": "" },
  "unit": "mm",
  "overall_length": { "values": [], "status": "ukendt", "method": "" },
  "max_width": { "values": [], "status": "ukendt", "method": "" },
  "thickness_end_a": { "values": [], "status": "ukendt", "method": "" },
  "thickness_center": { "values": [], "status": "ukendt", "method": "" },
  "thickness_end_b": { "values": [], "status": "ukendt", "method": "" },
  "outline_description": { "value": null, "status": "ukendt" },
  "photo_files": []
}
```

Den oplyste voxel-geometri kan registreres særskilt sådan:

```json
{
  "source": "user-provided",
  "status": "brugeroplyst",
  "unit": "mm",
  "overall_size_xyz": [20, 12, 4],
  "voxel_size_xyz": [4, 4, 4],
  "occupancy_top_to_bottom": [
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 0, 1, 0]
  ],
  "physical_verification": "ukendt"
}
```

## Det skal stadig leveres fra en fysisk brik

- Variant/størrelse, hvis den kendes, og om brikken er beskadiget.
- Tre aflæsninger af samlet længde og største bredde.
- Tre tykkelsesmålinger ved hver af de tre angivne positioner.
- En kort beskrivelse af omridset og eventuelle forskelle mellem over- og underside.
- Billederne på tjeklisten, hvis det er muligt. Hvis ikke, notér det; manglende billeder udfyldes ikke med antagelser.

De oplyste modelmål kan bruges som foreløbig geometri, men en fysisk sammenligning er stadig nødvendig for at kalde dem verificerede specifikationer. Denne protokol siger ikke noget om, hvorvidt brikker kan samles stabilt.
