# Site couvreur (statique)

Site vitrine one-page pour un couvreur, style premium glass (adapté de Cleanel Chrome).
HTML/CSS/JS pur, aucun build.

## Structure
- `index.html` — page principale (hero vidéo, 9 prestations, déroulé, zones, FAQ, devis, CTA)
- `mentions-legales.html` — page légale (placeholders à compléter)
- `assets/styles.css` — design system (accent terracotta, ink ardoise)
- `assets/script.js` — nav mobile, reveal au scroll, formulaire Web3Forms
- `assets/hero-toiture.mp4` (desktop) + `hero-toiture-mobile.mp4` + `hero-poster.jpg`
- `assets/service-*.jpg`, `split-charpente.jpg`, `cta-toiture.jpg` — photos prestations
- `robots.txt`, `sitemap.xml`, `assets/favicon.svg`

## Aperçu local
```
cd couvreur-refonte && python3 -m http.server 4188
```

## Identité intégrée (réelle)
Cycy.Couverture Zinguerie · 07 69 87 80 07 · 15 Rte de la Fère, 02410 Saint-Gobain (Aisne).
Communes zone : Saint-Gobain, La Fère, Tergnier, Chauny, Coucy-le-Château, Anizy-le-Grand.
Nom, téléphone, WhatsApp, adresse (NAP), schema.org RoofingContractor + geo, carte OSM : faits.

## À COMPLÉTER avant mise en ligne (données client — rien inventé)
1. **Clé Web3Forms** : dans `index.html`, remplacer `REMPLACER_PAR_VOTRE_CLE_WEB3FORMS`
   (gratuit sur web3forms.com). Sans clé valide, le formulaire affiche le repli téléphone.
2. **Domaine** : remplacer `cycycouverture.netfoxfood.workers.dev` (canonical, og:url, schema `url`/`@id`) par le vrai
   domaine une fois choisi.
3. **Mentions légales** : compléter forme juridique, SIREN/SIRET, APE, assurance décennale
   (et email pro si l'entreprise en a un — non fourni, donc absent du site).
4. **Communes / GPS** : ajuster la liste de communes et affiner le marker OSM si besoin.
5. **Photos manquantes** : ardoise, gouttière et charpente n'ont pas de photo dédiée
   (présentées en bande icônes) — fournir de vraies photos pour les passer en cartes.
