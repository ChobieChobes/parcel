import { withNavigationWatcher } from './contexts/navigation';
import { HomePage, LocationPage } from './pages';

const routes = [
  {
    path: '/home',
    component: HomePage
  }, 
  {
    path: '/location',
    component: LocationPage
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
