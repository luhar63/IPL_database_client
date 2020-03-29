/**
 *
 * Asynchronously loads the component for MainView
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
    loader: () => import('./index'),
    loading: () => null
});
