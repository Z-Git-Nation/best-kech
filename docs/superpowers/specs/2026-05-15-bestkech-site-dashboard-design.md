# Best Kech Immo — Site + Dashboard — Design Spec
**Date :** 2026-05-15 | **Statut :** Approuvé

---

## Contexte & vision

**Client :** Best Kech Immo (ex-RS Immo Marrakech) — Rachid, Sabri, Mohamed
**Positionnement :** Chaleureux / Accessible prestige. Marrakech authentique, professionnel sans être inaccessible. Palette terres cuites + blanc.
**Vision produit :** Best Kech Immo = client #1 + bêta testeur d'un SaaS de conciergerie/PMS revendable à d'autres agences. Chaque heure de dev est amortissable.
**Livrable dimanche :** Site vitrine fonctionnel + dashboard admin opérationnel + démo Hermes Telegram.

---

## Architecture générale

```
Vercel (Next.js 14 App Router)
├── Site vitrine public (/)
├── Dashboard admin (/admin/*)
└── API Routes (lecture/écriture DB + Hermes)
         │
         ▼
PostgreSQL sur Hetzner (via Prisma)
         │
         ▼
Hetzner Storage (MinIO ou /uploads — photos villas/voitures/biens)
         │
         ▼
Hermes Agent (Hetzner existant — démo Telegram)
```

**Multi-tenancy :** `agency_id UUID` présent sur toutes les tables dès J1. Aucune migration future pour passer en SaaS multi-clients.

---

## Stack technique

| Couche | Choix |
|--------|-------|
| Framework | Next.js 14 App Router |
| 3D | React Three Fiber + @react-three/drei |
| Animations | Motion + GSAP + Lenis (smooth scroll) + CSS Scroll-Driven |
| UI | Tailwind v4 + Radix UI primitives + CVA + tailwind-merge |
| Auth | Clerk (3 comptes : Rachid · Sabri · Mohamed) |
| DB | PostgreSQL self-hosted Hetzner |
| ORM | Drizzle ORM + postgres driver (cohérent workspace) |
| Storage | Hetzner (MinIO ou dossier /uploads) |
| Deploy | Vercel (app Next.js) + Hetzner (DB + storage + Hermes) |
| Domaine | bestkech.ai-nation.xyz |
| Port dev | 3035 (3030 = Song Signature) |

---

## Identité visuelle

| Token | Valeur |
|-------|--------|
| Primaire | Terracotta `#C4714A` |
| Fond | Blanc cassé `#FAF7F2` |
| Texte | Brun profond `#2C1810` |
| Accent | Or `#D4A853` |
| Typo titres | Cormorant Garamond (serif, chaleureux) |
| Typo corps | Inter (sans-serif, lisible) |

---

## Site vitrine — Structure des pages

### Navigation
`Logo · Séjour · Voitures · Immobilier`
+ Bouton chatbot flottant bas droite (WhatsApp → Hermes agent phase 2)

---

### `/` — Home (one-page long scroll)

#### Section 1 — HERO
- **Gauche :** Objet GLB 3D d'une villa/appartement qui tourne lentement sur son axe
  - Toggle "Villa de la semaine" ↔ "Villa du mois"
  - Changement de toggle → GLB actuel sort (exit animation left) + nouveau GLB entre (enter animation right)
  - Sous le GLB : carousel de cards témoignages liées au bien affiché (swap synchronisé avec le GLB)
- **Droite :** Formulaire de recherche de séjour
  - Champs : dates (check-in / check-out), nombre de personnes, budget max
  - CTA : "Voir les disponibilités" → filtre la section Séjour

#### Section 2 — SÉJOUR
- Liste exhaustive des biens (villas + appartements)
- Chaque bien : card avec GLB 3D miniature + nom + prix/nuit + capacité + CTA
- **Scroll-driven animations** : les GLB rentrent/sortent de l'écran selon le scroll (référence : Dress & Style home)
- Filtres : type (villa/appartement), capacité, prix, disponibilité

#### Section 3 — VOITURES
- Catalogue flotte de véhicules
- Même pattern GLB 3D + scroll-driven animations
- Card : photo/GLB + marque/modèle + prix/jour + CTA réservation

#### Section 4 — IMMOBILIER
- 3 cartes : **Vente** · **Construction** · **Rénovation**
- Description courte de chaque service
- CTA commun → `/immobilier`

#### Section 5 — BLOG
- 3–4 articles récents (titre + extrait + image + lien)
- Gérés depuis le dashboard

#### Section 6 — TÉMOIGNAGES
- Carousel horizontal défilant (cards carrées)
- Témoignages globaux (séjour, voiture, immo mélangés ou filtrés par section)

#### Section 7 — FOOTER
- Reveal animation (remonte depuis le bas au scroll)
- Liens : pages principales + réseaux sociaux + contact

---

### `/immobilier` — Page dédiée immobilier
- Pitch captation propriétaires/promoteurs
- 3 blocs : Vente (estimation, mandat) · Construction (promotion, chantiers) · Rénovation (travaux, valorisation)
- Formulaire de contact propriétaire (nom, bien, type de projet, téléphone)
- Témoignages propriétaires

### `/villas/[slug]` ou `/sejour/[slug]` — Fiche bien
- Galerie photos (optimisée WebP)
- GLB 3D du bien (phase 1 : GLB manuel ; phase 2 : Gaussian Splatting depuis scan drone)
- Description, équipements, services disponibles
- Calendrier de disponibilité (mois courant + suivant)
- Prix par nuit (peut varier selon période)
- CTA WhatsApp direct

---

## Dashboard admin `/admin/*`

### Auth
- Clerk — 3 comptes nominaux (Rachid · Sabri · Mohamed)
- Route middleware : `/admin/*` protégée, redirect login si non authentifié

### Modules dashboard (phase 1)

#### Biens (Villa/Appart)
- Liste de tous les biens avec statut (actif/inactif)
- Clic sur un bien → fiche éditable :
  - Nom, type (villa/appartement), description
  - Upload photos (→ Hetzner storage)
  - Upload GLB (→ Hetzner storage)
  - Prix/nuit (fixe ou par période)
  - Capacité (nb personnes)
  - Services disponibles (checklist)
  - **Calendrier mensuel inline** : disponibilités + prix courant, blocage manuel de dates
  - Statut : actif / inactif / maintenance
- Créer / modifier / archiver un bien

#### Voitures
- Même structure : marque, modèle, année, photo, GLB, prix/jour, statut
- Calendrier inline de disponibilité

#### Biens immobiliers (Vente / Construction / Rénovation)
- Type de bien, surface, localisation, prix, description, photos
- Statut : disponible / en cours / vendu/livré

#### Blog
- CRUD articles : titre, contenu (rich text), image, tags, date publication
- Statut : brouillon / publié

#### Formulaires reçus
- Liste des demandes de contact (séjour + immobilier)
- Statut : nouveau / traité / archivé

---

## Schéma base de données (Prisma — simplifié)

```prisma
model Agency {
  id         String   @id @default(uuid())
  name       String
  properties Property[]
  vehicles   Vehicle[]
  realEstate RealEstateItem[]
}

model Property {
  id          String   @id @default(uuid())
  agencyId    String
  type        String   // "villa" | "apartment"
  name        String
  description String?
  pricePerNight Float
  capacity    Int
  glbUrl      String?
  photos      String[] // URLs Hetzner storage
  active      Boolean  @default(true)
  bookings    Booking[]
  reviews     Review[]
}

model Vehicle {
  id          String  @id @default(uuid())
  agencyId    String
  brand       String
  model       String
  pricePerDay Float
  glbUrl      String?
  photoUrl    String?
  active      Boolean @default(true)
}

model RealEstateItem {
  id          String  @id @default(uuid())
  agencyId    String
  type        String  // "sale" | "construction" | "renovation"
  title       String
  description String?
  price       Float?
  surface     Float?
  photos      String[]
  status      String  @default("available")
}

model Booking {
  id         String   @id @default(uuid())
  propertyId String
  checkIn    DateTime
  checkOut   DateTime
  guestName  String?
  source     String?  // "direct" | "airbnb" | "booking" | "sarouty"
  status     String   @default("confirmed")
}

model Review {
  id         String   @id @default(uuid())
  propertyId String?
  vehicleId  String?
  author     String
  rating     Int
  content    String
  published  Boolean  @default(false)
}

model Post {
  id          String   @id @default(uuid())
  agencyId    String
  title       String
  content     String
  imageUrl    String?
  published   Boolean  @default(false)
  publishedAt DateTime?
}

model ContactRequest {
  id        String   @id @default(uuid())
  agencyId  String
  type      String   // "sejour" | "immo" | "voiture"
  name      String
  phone     String?
  message   String?
  status    String   @default("new")
  createdAt DateTime @default(now())
}
```

---

## Phases de développement

### Phase 1 — Dimanche (livrable client)
- Site vitrine : Home (toutes sections) + /immobilier + /sejour/[slug]
- Dashboard admin : CRUD biens/voitures/immo + calendrier inline + blog + formulaires
- Auth Clerk
- PostgreSQL Hetzner + Prisma
- Hetzner storage (upload photos)
- GLB Three.js (objets 3D statiques fournis ou placeholders)
- Démo Hermes Telegram

### Phase 2 — Semaines suivantes
- Channel manager (Airbnb/Booking/Sarouty API sync → calendrier central)
- CRM clients (fiches détaillées, historique séjours, retargeting)
- Gestion ménages (check-in/out automatisé, femmes de ménage, photos vérification)
- Hermes agent complet (Instagram/Facebook/Snapchat inbox + WhatsApp group digest)

### Phase 3 — Productisation SaaS
- Multi-tenancy activée (agency_id déjà en place)
- Onboarding nouvelle agence
- Facturation (Stripe)
- Tableau de bord SaaS (métriques, usage)

---

## Questions ouvertes (à confirmer avec client dimanche)

- Combien de voitures dans la flotte ?
- Ils ont un logo Best Kech Immo ou on part de zéro ?
- Langue V2 prioritaire : EN ou AR ?
- Budget total alloué (site + agent IA) ?
- Taux d'occupation moyen actuel (argument commissions Airbnb) ?
- Nom de domaine `.com` ou `.ma` pour la version finale ?
