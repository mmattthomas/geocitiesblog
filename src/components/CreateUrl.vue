<template>
	<div class="row">
		<div class=" col-md-10 col-md-offset-1">
			<div class="panel panel-default">
        <div class="panel-heading">
          <strong>CREATE A SHORT URL HERE</strong>
        </div>
        <div class="panel-body">			
					<div class="form-horizontal" role="form">
						<div class="form-group">
							<label for="url" class="col-sm-3 control-label">
								URL</label>
							<div class="col-sm-9">
								<input type="text" ref="url" class="form-control" id="url" v-model="formData.url" placeholder="https://www.chumbawumba.com/whiskeydrink" required="true">
							</div>
						</div>
						<div class="form-group">
							<label for="neighborhood" class="col-sm-3 control-label">
								Neighborhood
							</label>
							<div class="col-sm-9">						
								<v-select :options="fireHoods" ref="neighborhood" v-model="formData.neighborhood"></v-select>
							</div>					
						</div>
						<div class="form-group last">
							<div class="col-sm-offset-3 col-sm-9">
								<button @click="makeURL" class="btn btn-success btn-sm">
									Create URL
								</button>                
							</div>
						</div>                 					
					<br><br><br>
						<ul>
							<li v-for="(url,key) in fireUrlsArray.slice().reverse()" :key="key" >
								<div>
									<h2>
										<a :href="url.url">{{ baseUrl + "/" + url.neighborhood + "/" + url.streetnum }} </a>
									</h2>
									<h5>{{ url.url }}</h5>
									<button class="btn btn-xs btn-danger" @click='deleteURL(key);'>Delete</button> 							
								</div>
							</li>          
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>     
</template>

<script>

import VueSelect from 'vue-select'

export default {
  //name: 'CreateUrl',
  data () {
    return {
			baseUrl: "http://geocities.blog",
			formData: {
				url: "",
				neighborhood: "",
				streetnum: "",
				index: "",
				created: 0,
				owner: ""
			},
			neighborhoods: ['SunsetStrip', 'Area51', 'HollywoodHills', 'Arcade', 'TimeSquare'],
      urls:[],
      url:null,
			fireUrls:null,
			fireUrlsArray:[],
			fireHoods:[],
      editingURL:[],
      editFormMode:[]
    }
	},
	components: {
		'v-select': VueSelect
	},
  methods: {
    makeURL(){

			const dbg = false

			// validate URL
			if (!validateUrl(this.formData.url)) {
				alert('you have entered an invalid URL - YOU MAY NOT ENTER')
				return;
			}


			const timestamp = firebase.database.ServerValue.TIMESTAMP
			let hoodSearchResult = null
			firebase.database().ref('hoods').orderByChild('name').equalTo(this.formData.neighborhood).once('value',(snapshot)=>{
					hoodSearchResult = snapshot.val();
					if (hoodSearchResult) {
						const hoodKey = Object.keys(hoodSearchResult)[0];
						const hood = hoodSearchResult[hoodKey]
						
						hood.nextStreet++
						this.formData.streetnum = hood.nextStreet
						this.formData.index = this.formData.neighborhood + this.formData.streetnum
						this.formData.owner = firebase.auth().currentUser.uid
						this.formData.created = timestamp
						this.url = this.formData
						this.urls.push(this.url)
						
						// create url											
						firebase.database().ref('urls').push(this.formData)
						.then((data) => {
							if (dbg) console.log("pushed a URL with street: " + hood.nextStreet)							
							firebase.database().ref('hoods/' + hoodKey).set({
								name: hood.name,
								description: hood.description,
								nextStreet: hood.nextStreet
							})
							.then(data => {
								this.url=null;
								this.formData = {
									url: "",
									neighborhood: "",
									created: 0,
									owner: "",
									streetnum: ""
								}
							})							
						})						
					} else {
						// error - neighborhood does not exist
						alert('neighborhood you specified does not exist')
					}
			});
		},
		deleteURL(key){
			firebase.database().ref('urls/'+key).remove();
		},
		fetchFirebaseData(){
			const currUser = firebase.auth().currentUser.uid;
			firebase.database().ref('urls').orderByChild('owner').equalTo(currUser).on('value',(snapshot)=>{
					//this.fireUrls=snapshot.val();
					this.fireUrlsArray = snapshotToArray(snapshot)
			});
			firebase.database().ref('hoods').on('value',(snapshot)=>{
					this.fireHoods = snapshotToArrayHoods(snapshot)				
			});
		}
	},
	created(){			
		this.fetchFirebaseData();					
	}
}

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}

function snapshotToArrayHoods(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;				
				returnArr.push(item.name);
				
    });

    return returnArr;
};

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;				
				returnArr.push(item);
				
    });

    return returnArr;
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
/* a {
  color: #42b983;
} */
</style>