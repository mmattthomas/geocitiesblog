import Vue from 'vue'
import Router from 'vue-router'

import About from '../components/About'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'
import CreateUrl from '../components/CreateUrl'
import Splash from '../components/Splash'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/new',
      name: 'CreateUrl',
      component: CreateUrl,
      meta:{
        requiresAuth:true
      }
		},
		{
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '*',
      redirect: '/sign-in',
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
		},
		{
			path: '/:street/:address',
			name: 'Splash',
			component: Splash,
			props: true
		}
	],
	mode: 'history'  // vs. default 'hash' which uses hash tag
});

//"guarding"... before any route change, check authentication

router.beforeEach((to,from,next) => {
	// check if address/street - need to redirect
	if (to.params.street && to.params.address) {
		// if contains these params - then follow thru to Splash Route
		next()	
	} else if (to.name == "About") {
		next()
	} else {
		// otherwise regular in the app
		let currentUser=firebase.auth().currentUser;
		let requiresAuth=to.matched.some(record=>record.meta.requiresAuth);
		
		if(requiresAuth && !currentUser) next('sign-in')
		else if (!requiresAuth && currentUser) next('new')
		else next()
	}
});

export default router