import { withNavigationWatcher } from './contexts/navigation';
import { HomePage, LocationPage, TreePage } from './pages';

const routes = [
  {
    path: '/home',
    component: HomePage
  }, 
  {
    path: '/location',
    component: LocationPage
  }, 
  {
    path: '/tree',
    component: TreePage
  }
];

export default routes.map(route => {
  return {
    ...route,
    component: withNavigationWatcher(route.component)
  };
});
