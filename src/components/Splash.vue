<template>
	<div class="row">
		<div class=" col-md-6 col-md-offset-3">
			<span v-if="!error">
				<h3 style="text-align:center">LOADING YOUR WEBPAGE IN 3...2...1...</h3>
				<img src="../assets/under-construction.gif" alt="YOUR WEB PAGE IS LOADING SOON">			
			</span>
			<span v-if="error">
				<img src="../assets/404.png" alt="I CANNOT FIND THIS PAGE">
			</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			error: false
		}
	},
	props: ['street', 'address'],
	methods: {
		redirectMe() {
		var foundUrl = null
		const urlIndex = "" + this.street + this.address
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

				window.setTimeout(function(){ window.location = foundUrl[f].url; }, 2000)

			} else {
				console.log("url not found")
				//TBD: enable div with error picture
				this.error = true
			}
			})
		}
	},
	created() {
		this.redirectMe()
	}
}
</script>
<style scoped>
	img {
			display: block;
			margin-left: auto;
			margin-right: auto;
	}
	h3 {
		color: white
	}

	/* body {
    background-image: url("../assets/blinkstars.gif");
    background-repeat: repeat;
	} */
</style>


