import Vue from 'vue'
import Router from 'vue-router'

import SignIn from '../components/SignIn'
import Signup from '../components/Signup'
import CreateUrl from '../components/CreateUrl'

Vue.use(Router)

let router = new Router({
  routes: [
		{
			path: '/:street/:address',
			name: 'GoTo'
		},
    {
      path: '/new',
      name: 'CreateUrl',
      component: CreateUrl,
      meta:{
        requiresAuth:true
      }
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
      name: 'Signup',
      component: Signup
    }
	],
	mode: 'history'  // vs. default 'hash' which uses hash tag
});

//"guarding"... before any route change, check authentication

router.beforeEach((to,from,next) => {

	// check if address/street - need to redirect
	if (to.params.street && to.params.address) {
		const redirectTo = getRedirect(to)
		if (redirectTo) {
			window.location = redirectTo
			//alert('going to: ' + redirectTo)
		}		
	}

	// otherwise regular in the app
  let currentUser=firebase.auth().currentUser;
  let requiresAuth=to.matched.some(record=>record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next('sign-in')
  else if (!requiresAuth && currentUser) next('new')
  else next()
});

function getRedirect(route) {
	var foundUrl = null
	const urlIndex = "" + route.params.street + route.params.address
	//console.log("looking for " + urlIndex)
	// search firebase
	firebase.database().ref('urls').orderByChild('index').equalTo(urlIndex).on('value',(snapshot)=>{
		foundUrl = snapshot.val();
		if (foundUrl) {
			//return here or just redirect here:
			//console.log(JSON.stringify(foundUrl));
			//get first:
			const f = Object.keys(foundUrl)[0];
			//console.log("found : " + foundUrl[f].url)
			window.location = foundUrl[f].url
			return foundUrl[f].url
		} else {
			console.log("url not found")
		}
		 
		return "nothin yet"

	});

}

export default router