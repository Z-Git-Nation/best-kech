import {
  pgTable, uuid, text, boolean, numeric, integer, smallint,
  timestamp, jsonb, index,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// ─── Agencies (multi-tenant root) ───────────────────────────────────────────

export const agencies = pgTable('agencies', {
  id:        uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  name:      text('name').notNull(),
  slug:      text('slug').unique().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// ─── Users ──────────────────────────────────────────────────────────────────

export const users = pgTable('users', {
  id:        uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  agencyId:  uuid('agency_id').references(() => agencies.id),
  clerkId:   text('clerk_id').unique().notNull(),
  email:     text('email').unique().notNull(),
  fullName:  text('full_name'),
  phone:     text('phone'),
  avatarUrl: text('avatar_url'),
  role:      text('role').default('staff'), // 'admin' | 'accounting' | 'sales' | 'concierge' | 'staff'
  isAdmin:   boolean('is_admin').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ─── Properties (villa / appartement) ───────────────────────────────────────

export const properties = pgTable('properties', {
  id:            uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  agencyId:      uuid('agency_id').notNull().references(() => agencies.id),
  type:          text('type').notNull().default('apartment'), // 'villa' | 'apartment'
  name:          text('name').notNull(),
  slug:          text('slug').unique().notNull(),
  description:   text('description'),
  pricePerNight: numeric('price_per_night', { precision: 10, scale: 2 }),
  capacity:      integer('capacity'),
  bedrooms:      integer('bedrooms'),
  bathrooms:     integer('bathrooms'),
  area:          numeric('area', { precision: 10, scale: 2 }),
  address:       text('address'),
  glbUrl:        text('glb_url'),
  photos:        jsonb('photos').$type<string[]>().default([]),
  services:      jsonb('services').$type<string[]>().default([]),
  active:        boolean('active').default(true),
  featuredType:  text('featured_type'), // 'week' | 'month' | null
  createdAt:     timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt:     timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (t) => [
  index('properties_agency_idx').on(t.agencyId),
  index('properties_active_idx').on(t.active),
]);

// ─── Vehicles ────────────────────────────────────────────────────────────────

export const vehicles = pgTable('vehicles', {
  id:           uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  agencyId:     uuid('agency_id').notNull().references(() => agencies.id),
  brand:        text('brand').notNull(),
  model:        text('model').notNull(),
  year:         integer('year'),
  pricePerDay:  numeric('price_per_day', { precision: 10, scale: 2 }),
  seats:        integer('seats'),
  transmission: text('transmission').default('automatic'),
  glbUrl:       text('glb_url'),
  photoUrl:     text('photo_url'),
  active:       boolean('active').default(true),
  createdAt:    timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt:    timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (t) => [
  index('vehicles_agency_idx').on(t.agencyId),
]);

// ─── Real Estate Items ───────────────────────────────────────────────────────

export const realEstateItems = pgTable('real_estate_items', {
  id:          uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  agencyId:    uuid('agency_id').notNull().references(() => agencies.id),
  type:        text('type').notNull(), // 'sale' | 'construction' | 'renovation'
  title:       text('title').notNull(),
  description: text('description'),
  price:       numeric('price', { precision: 12, scale: 2 }),
  surface:     numeric('surface', { precision: 10, scale: 2 }),
  location:    text('location'),
  photos:      jsonb('photos').$type<string[]>().default([]),
  status:      text('status').default('available'), // 'available' | 'in_progress' | 'sold' | 'delivered'
  createdAt:   timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt:   timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ─── Bookings ────────────────────────────────────────────────────────────────

export const bookings = pgTable('bookings', {
  id:          uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  agencyId:    uuid('agency_id').notNull().references(() => agencies.id),
  propertyId:  uuid('property_id').references(() => properties.id),
  vehicleId:   uuid('vehicle_id').references(() => vehicles.id),
  checkIn:     timestamp('check_in',  { withTimezone: true }),
  checkOut:    timestamp('check_out', { withTimezone: true }),
  guestName:   text('guest_name'),
  guestEmail:  text('guest_email'),
  guestPhone:  text('guest_phone'),
  guestCount:  integer('guest_count'),
  source:      text('source').default('direct'), // 'direct' | 'airbnb' | 'booking' | 'sarouty'
  status:      text('status').default('confirmed'), // 'pending' | 'confirmed' | 'checked_in' | 'checked_out' | 'cancelled'
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }),
  notes:       text('notes'),
  createdAt:   timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt:   timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (t) => [
  index('bookings_property_idx').on(t.propertyId),
  index('bookings_dates_idx').on(t.checkIn, t.checkOut),
]);

// ─── Reviews ─────────────────────────────────────────────────────────────────

export const reviews = pgTable('reviews', {
  id:         uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  agencyId:   uuid('agency_id').notNull().references(() => agencies.id),
  propertyId: uuid('property_id').references(() => properties.id),
  vehicleId:  uuid('vehicle_id').references(() => vehicles.id),
  author:     text('author').notNull(),
  rating:     smallint('rating').notNull(),
  content:    text('content').notNull(),
  published:  boolean('published').default(false),
  createdAt:  timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const blogPosts = pgTable('blog_posts', {
  id:          uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  agencyId:    uuid('agency_id').notNull().references(() => agencies.id),
  slug:        text('slug').unique().notNull(),
  title:       text('title').notNull(),
  excerpt:     text('excerpt'),
  content:     text('content'),
  imageUrl:    text('image_url'),
  tags:        jsonb('tags').$type<string[]>().default([]),
  published:   boolean('published').default(false),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt:   timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt:   timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ─── Contact Requests ─────────────────────────────────────────────────────────

export const contactRequests = pgTable('contact_requests', {
  id:         uuid('id').primaryKey().default(sql`uuid_generate_v4()`),
  agencyId:   uuid('agency_id').notNull().references(() => agencies.id),
  type:       text('type').notNull(), // 'sejour' | 'voiture' | 'immo'
  name:       text('name').notNull(),
  email:      text('email'),
  phone:      text('phone'),
  message:    text('message'),
  propertyId: uuid('property_id').references(() => properties.id),
  checkIn:    timestamp('check_in',  { withTimezone: true }),
  checkOut:   timestamp('check_out', { withTimezone: true }),
  guestCount: integer('guest_count'),
  budget:     numeric('budget', { precision: 10, scale: 2 }),
  status:     text('status').default('new'), // 'new' | 'contacted' | 'archived'
  createdAt:  timestamp('created_at', { withTimezone: true }).defaultNow(),
});
