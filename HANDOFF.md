# Best Kech Immo — Handoff de session
**Date :** 15 mai 2026 | **Statut :** Réunion client faite ✓ — week-end de travail

---

## Contexte client

**Ancien nom :** RS Immo Marrakech
**Nouveau nom :** Best Kech Immo *(changement en cours)*
**Fondateurs :** Rachid + Sabri — deux Belges expatriés à Marrakech
**Contact :** +212 664-785714 / rachid.suryimmo@gmail.com *(Gmail = à professionnaliser)*
**Adresse :** Noria Km 5, Route de Tahanaout, Marrakech

**Activités :**
- Location courte durée — ~30 villas prestige/moderne/traditionnelle + appartements
- Location de voitures (service existant, absent du site actuel)
- Conciergerie (mentionnée, non structurée)
- Prix : €50–750/nuit

**Présences actuelles :**
- Site : https://rsimmo-marrakech.com (WordPress/Divi 2022, à remplacer)
- Instagram : @rs_immo1 (probablement <2 000 abonnés)
- Facebook : 606 likes
- Sarouty.ma : https://www.sarouty.ma/agent-details/?agent_id=6494 (117 ventes, 102 locations)
- Airbnb : https://www.airbnb.com/rooms/52196982 (Villa Softsun uniquement — 1 seul listing pour 30+ biens)
- TikTok : absent
- Google Business Profile : **absent ou non réclamé**

---

## Diagnostic global (audit 15 mai 2026)

### Site actuel — scores
| Métrique | Score |
|----------|-------|
| Performance mobile | ~35/100 |
| Performance desktop | ~60/100 |
| Accessibilité | ~60/100 |
| SEO on-page | ~75/100 |
| Sécurité headers | 1/6 |
| Score global | **~42/100** |

### Problèmes critiques
- Zéro analytics (pas de GA4, GTM, Meta Pixel) — pilotent à l'aveugle
- Google Business Profile absent — invisibles sur Maps
- French-only — clientèle internationale non servie
- Location voitures absente du site
- 80% images sans alt text (WhatsApp quality)
- Zéro schema markup → pas de rich results Google
- 1 seul listing Airbnb pour 30+ biens
- Backlinks quasi-nuls (seulement Sarouty + 1 Airbnb)
- Visibles uniquement sur leur nom de marque — invisibles sur "villa location marrakech"

### Réseaux sociaux
- Stratégie actuelle : **aucune** — photos WhatsApp + prix + emojis, pas de Reels
- Concurrent direct @sr.immo.marrakech = 15 000 abonnés avec 24 posts (100% Reels)
- @conciergeriedemarrakech = 10 000 abonnés (leader du segment)

---

## Résultat de la réunion

- Client **chaud** ✓
- Constat partagé : problèmes organisationnels + digital en retard
- **Direction validée :** site internet d'abord, puis agent IA opérationnel

---

## Ce qu'on va faire — direction

### Priorité 1 — Site web (devis dimanche)

**Nouveau site sous le nom Best Kech Immo.**
Stack : Next.js 14 + Tailwind + shadcn/ui + Framer Motion

**Périmètre "Vitrine essentielle" à 10 000 DH :**
- 6–8 pages : Home, Villas (par catégorie), Location voitures, Conciergerie, À propos, Contact
- Framer Motion : reveals au scroll, transitions pages, parallax hero
- Schema markup complet (LodgingBusiness, Review, Product)
- Galerie photos optimisée (WebP, lazy load)
- Formulaire contact + redirection WhatsApp
- SEO on-page (meta, sitemap, robots.txt)
- Français uniquement dans le périmètre de base

**Options à la carte :**
- Multilingue EN/AR : +5 000 DH
- Chatbot IA : +3 000 DH
- Section voitures avec catalogue : +3 000 DH

**À définir ce week-end :**
- Identité visuelle (logo Best Kech Immo, palette couleurs, typographie)
- Charte graphique complète
- Architecture des pages
- Contenu (à rédiger avec eux ou à générer)

### Priorité 2 — Agent IA opérationnel (phase 2)

**Inspiration Z-Host** (déjà développé dans z-host-local) :
- Gestion partenaires (activités, restaurants, transferts)
- Suivi clients / CRM léger
- Construction de séjour (checklist arrivée/départ, services, personnalisation)
- Réponses automatiques DM Instagram + WhatsApp Business API
- FAQ IA multilingue (FR/EN/AR)
- Hébergement : Hetzner (comme Z-Host)

**Ce qu'on réutilise de Z-Host :**
- Architecture CRM partenaires
- Système de suivi client
- Structure de base agent Hetzner

### Priorité 3 — Community Management (après site lancé)

| Formule | Prix/mois |
|---------|-----------|
| Starter | 3 500 DH |
| Growth *(recommandé)* | 5 000 DH |
| Premium (+ TikTok) | 8 000 DH |

---

## À faire ce week-end

### Samedi
- [ ] Définir identité visuelle Best Kech Immo (logo, palette, typo)
- [ ] Créer charte graphique
- [ ] Scaffolding projet Next.js `best-kech-immo-local`
- [ ] Architecture pages + navigation
- [ ] Rédiger contenu pages principales

### Dimanche
- [ ] Pages Home + Villas fonctionnelles avec Framer Motion
- [ ] Page Contact + WhatsApp CTA
- [ ] Préparer devis formel PDF
- [ ] Présenter au client

---

## Références techniques

- **Z-Host (inspiration architecture agent)** : `z-host-local/` — port 3005/5433, branch `local-mac-dev`
- **Dress & Style (inspiration e-commerce catalogue)** : `dress-&-style-local/` — port 3015/5435
- **Hetzner** : 116.203.182.241 — SSH key `~/Documents/ssh/hetzner/hetzkey`
- **Fichiers audit sur Hetzner** : `/srv/rsimmo-audit-complet.md` + `/srv/rsimmo-brief-reunion.md`

---

## Questions ouvertes (à poser dimanche)

- Leur taux d'occupation moyen (pour calculer argument commissions Airbnb)
- Combien de voitures dans la flotte
- Langue cible prioritaire pour la V2 (EN ou AR ?)
- Budget total alloué (site + agent IA)
- Ils ont un logo actuel à récupérer ?
- Nom de domaine `bestkechimmo.com` ou `.ma` — à vérifier disponibilité

---

*Reprendre ici après redémarrage.*
