import { router } from '@/lib/trpc/server';
import { propertiesRouter } from './properties';
import { vehiclesRouter }   from './vehicles';
import { realestateRouter } from './realestate';
import { bookingsRouter }   from './bookings';
import { postsRouter }      from './posts';
import { contactsRouter }   from './contacts';
import { reviewsRouter }    from './reviews';

export const appRouter = router({
  properties: propertiesRouter,
  vehicles:   vehiclesRouter,
  realestate: realestateRouter,
  bookings:   bookingsRouter,
  posts:      postsRouter,
  contacts:   contactsRouter,
  reviews:    reviewsRouter,
});

export type AppRouter = typeof appRouter;
