const NOW = new Date()
const times = [["second", 1], ["minute", 60], ["hour", 3600], ["day", 86400], ["week", 604800], ["month", 2592000], ["year", 31536000]]

function showImage(data){
	
	eks = data.src.split(".");
	if (eks.pop() == 'mp4' || eks.pop() == 'mkv'){
		document.getElementById("vidModals").src = data.src
		document.getElementById("vidModals").style.display = "block"
		document.getElementById("imgModals").style.display = "none"
		document.getElementById("text").innerText = data.title
	} else {
		document.getElementById("imgModals").src = data.src
		document.getElementById("imgModals").style.display = "block"
		document.getElementById("vidModals").style.display = "none"
		document.getElementById("text").innerText = data.alt
	}
	document.getElementById("modal-img").style.display = "block"
}
function closeModalImg(){
	document.getElementById("modal-img").style.display = "none"
}

function logout(){
	localStorage.clear();
	document.location='login.html'
}
function cekAuth(){
	token = localStorage.getItem('token');

	if (token != null){
		var xmlAuth = new XMLHttpRequest();
		xmlAuth.open("POST", "http://localhost:4000/cekLogin");
		xmlAuth.setRequestHeader("Content-Type","application/json");
		xmlAuth.send(JSON.stringify({
			"token": token
		}));
		xmlAuth.onreadystatechange = function(){
			if (this.readyState == 4 && this.responseText != "Sukses"){
				alert('Silakan login dahulu!')
				localStorage.clear();
				document.location='login.html'
			}
		}
	} else {
		alert('Silakan login dahulu!')
		localStorage.clear();
		document.location='login.html'
	}

}
function kirimFoto() {
	document.getElementById("formProfile").submit();
}

function showModal(event) {
	document.getElementById('modal-tweet').style.display = "block"
}

function loadImage(event) {
	var modal = document.getElementById("modal-profile");
	modal.style.display = "block"

	var output = document.getElementById('show-img-profile');
	output.src = URL.createObjectURL(event.target.files[0]);
}

function loadMediaFoto(event) {
	img = document.getElementById("tweetImg").value
	eks = img.split(".");
	if (eks.pop() == 'jpg' || eks.pop() == 'jpeg' || eks.pop() == 'png' || eks.pop() == 'gif') {
		document.getElementById("insert-foto-tweet").src = URL.createObjectURL(event.target.files[0])
		document.getElementById('show-tweet-img-big').src = URL.createObjectURL(event.target.files[0])
		document.getElementById("insert-video-tweet").style.display = "none"
		document.getElementById('show-tweet-vid-big').style.display = "none"
		document.getElementById("media-title").innerText = "Image"
		document.getElementById("insert-foto-tweet").style.display = "block"
		document.getElementById('show-tweet-img-big').style.display = "block"
	} else {
		alert('Harap masukan file photo yang benar!')
	}
	document.getElementById("media").style.display = "block";
}

function loadMediaVideo(event) {
	vid = document.getElementById("tweetVideo").value
	eks = vid.split(".");
	if (eks.pop() == 'mp4' || eks.pop() == 'mkv') {
		document.getElementById("insert-video-tweet").src = URL.createObjectURL(event.target.files[0])
		document.getElementById('show-tweet-vid-big').src = URL.createObjectURL(event.target.files[0])
		document.getElementById("insert-foto-tweet").style.display = "none"
		document.getElementById('show-tweet-img-big').style.display = "none"
		document.getElementById("media-title").innerText = "Video"
		document.getElementById("insert-video-tweet").style.display = "block"
		document.getElementById('show-tweet-vid-big').style.display = "block"
	} else {
		alert('Harap masukan file video yang benar!')
	}
	document.getElementById("media").style.display = "block";
}

function closeModal(modal) {
	var modal = document.getElementById(modal);
	modal.style.display = "none"
}

function closeMedia() {
	var modal = document.getElementById("media");
	modal.style.display = "none"

	document.getElementById("tweetImg").value = '';
	document.getElementById("tweetVideo").value = '';
}

function gantiProfile() {
	var profil = document.getElementById("box-edit-profil");

	if (profil.classList.contains('show-profile')) {
		profil.style.display = "none";
		profil.classList.remove('show-profile')
	} else {
		profil.style.display = "block";
		profil.classList.add('show-profile')
	}
}

function dropDown() {
	var dropdowns = document.getElementById("dropdown");

	if (dropdowns.classList.contains('show')) {
		dropdowns.classList.remove('show');
	} else {
		dropdowns.classList.add('show');
	}
}

function timeAgo(date) {
	var diff = Math.round((NOW - date) / 1000)
	for (var t = 0; t < times.length; t++) {
		if (diff < times[t][1]) {
			if (t == 0) {
				return "Just now"
			} else {
				diff = Math.round(diff / times[t - 1][1])
				return diff + " " + times[t - 1][0] + (diff == 1 ? " ago" : "s ago")
			}
		}
	}
}

function openTweet() {
	document.getElementById("wrapp-tweet").classList.add('bg-modal');

	document.getElementById("btnTweet").style.display = "grid"
	document.getElementById("inTweets").style.height = "80px"

	document.getElementById("box-modal-head").classList.remove('hidden-box')
	document.getElementById("box-modal-tweet").classList.add('box-modal')
}

function closeBoxTweet() {
	document.getElementById("wrapp-tweet").classList.remove('bg-modal');

	document.getElementById("box-modal-head").classList.add('hidden-box')
	document.getElementById("box-modal-tweet").classList.remove('box-modal')
}

function hapusTweet(data) {
	// debugger
	idTweet = data.getAttribute('data-id');

	if (confirm('Yakin ingin hapus tweet ini?') == true) {
		var xmlHapus = new XMLHttpRequest();
		xmlHapus.open("POST", "http://localhost:4000/delTweet", true);
		xmlHapus.setRequestHeader("Content-Type", "application/json");
		xmlHapus.send(JSON.stringify({
			"idtweet": idTweet
		}));
		xmlHapus.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("loading").style.display = "block"
				setTimeout(function () {
					document.getElementById("loading").style.display = "none"
					document.getElementById("box-tweet-" + idTweet).style.display = "none";
				}, 1500)
			}
			// alert('error')
		}
		document.getElementById('jml-tweet').innerText = parseInt(document.getElementById('jml-tweet').innerText) - 1
	}
}

function signUp() {
	// debugger
	var fullname, username, email, password;
	fullname = document.getElementById("fullname").value;
	username = document.getElementById("username").value;
	email = document.getElementById("email").value;
	password = document.getElementById("password").value;

	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://localhost:4000/signUp", true);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(JSON.stringify({
		"username": username,
		"fullname": fullname,
		"email": email,
		"password": password
	}));
	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 201) {

			document.getElementById("info").style.animation = "infos 1s";
			document.getElementById("info").style.display = "block";
			document.getElementById("info").style.borderColor = "rgb(55, 211, 164);"
			document.getElementById("info").style.backgroundColor = "rgba(154, 255, 196, 0.24)";
			document.getElementById("info").innerHTML = "Sign Up successfully!"

			setTimeout(function(){
				document.location='login.html'
			},2000)


		} else {
			document.getElementById("info").style.animation = "infos 1s";
			document.getElementById("info").style.display = "block";
			document.getElementById("info").style.borderColor = "rgb(226, 81, 93)"
			document.getElementById("info").style.backgroundColor = "rgba(255, 146, 146, 0.24)";
			document.getElementById("info").innerHTML = "Sign Up failed!"
		}
	};
}

function signIn() {
	email = document.getElementById("email").value;
	pass = document.getElementById("pass").value;

	var xmlReq = new XMLHttpRequest();
	xmlReq.open("POST", "http://localhost:4000/signIn", true);
	xmlReq.setRequestHeader("Content-Type", "application/json");
	xmlReq.send(JSON.stringify({
		"email": email,
		"password": pass
	}));

	xmlReq.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200 && this.responseText != "Gagal") {
			data = JSON.parse(this.response)

			data.forEach(function (val) {
				localStorage.setItem('token', val.token)
				document.location = 'index.html'
			});


		} else if (this.readyState == 4){
			document.getElementById("info").style.animation = "infos 1s";
			document.getElementById("info").style.display = "block";
			document.getElementById("info").style.borderColor = "rgb(226, 81, 93)"
			document.getElementById("info").style.backgroundColor = "rgba(255, 146, 146, 0.24)";
			document.getElementById("info").innerHTML = "Email atau password anda salah!";
		}
	}
}

function lihatTweet() {
	const tgls = new Date()
	document.getElementById("usertgl").value = tgls

	var xmlLoad = new XMLHttpRequest();
	xmlLoad.open("POST", "http://localhost:4000/readTweetHome", true);
	xmlLoad.setRequestHeader("Content-Type", "application/json");
	xmlLoad.send(JSON.stringify({
		"token": localStorage.getItem('token')
	}))

	xmlLoad.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			data = JSON.parse(this.response);
			idx = 0;
			jTweet = 0;
			data.forEach(function (dataArr) {
				idx = dataArr.idtweet
				if (dataArr.token == localStorage.getItem('token')) {
					btnHapus =
					`<a href="" class="mn-option" data-id='${idx}' onclick='hapusTweet(this); return false;'>
						<i class="fas fa-backspace"></i>
					</a>`;

					btnFollows = ``;
					btnEdit = `onclick='formEdit(this)' id='${idx}' style='cursor:pointer'`;
					jTweet += 1;

					document.getElementById('jml-tweet').innerText = jTweet;

				} else {
					btnFollows = `<button class="btn-follow btn-tooltip" data-id='${dataArr.iduser}' onclick='addFollow(this)' onmouseover='checkFollow(this)' onmouseout='checkFollowOut(this)' id='btnFollow-${dataArr.iduser}' data-refresh='refresh' value='Following'>Following</button>`
					btnHapus = ``;
					btnEdit = ``;
				}

				// alert(dataArr.photoprofile)
				tgl = new Date(dataArr.tgl)

				if (dataArr.photoprofile == "none" || dataArr.photoprofile == "") {
					userProf = 'image/akun.png';
				} else {
					userProf = 'image/profile/' + dataArr.photoprofile;
				}

				if (dataArr.media_image == "none" || dataArr.media_image == "") {
					mediaFoto = ``;
				} else {

					mediaFoto = `<img src='image/media/${dataArr.media_image}' class='tweetImg' onclick='showImage(this)' alt='${dataArr.tweet}'>`
				}

				if (dataArr.media_video == "none" || dataArr.media_video == "") {
					mediaVideo = ``;
				} else {
					mediaVideo = `<video src='image/media/${dataArr.media_video}' controls class='tweetVid'></video>`
				}

				document.getElementById("box-tweet").innerHTML +=
					`<div class="isi-tweet" id="box-tweet-${idx}">
					<img src='${userProf}' width='40px' height='40px' class='user-icon'>
					<div class="data-tweet">
					<strong class='tooltip'><a href='profile.html?token=${dataArr.token}'>${dataArr.fullname}</a>
					
					<div class='tooltip-box'>
						<div class="sampul-tt">
							<img src="image/img-profile.jpg" width="100%">
						</div>
						<div class="foto-tt">
							<div class="">
								<img src="${userProf}" width="100%">
							</div>
						</div>
						${btnFollows}
						<div class="data-tt">
							<h3>${dataArr.fullname}</h3>
							<span>@${dataArr.username}</span>
							<p>${dataArr.bio}</p>

						<ul>
							<li>
								<span>Tweets</span>
								<h3>1000</h3>
							</li>
							<li>
								<span>Following</span>
								<h3>1000</h3>
							</li>
							<li>
								<span>Follows</span>
								<h3>1000</h3>
							</li>
						</ul>
						</div>
					</div>

					</strong> <span>@${dataArr.username} . ${timeAgo(tgl)}</span>

					<div id="data-tweet-${idx}">
						<p ${btnEdit} >${dataArr.tweet}</p>
						${mediaFoto}
						${mediaVideo}
		
						<div class="btn-tweet">
							<a href=""><i class="fa fa-comment"></i></a>
							<a href=""><i class="fas fa-retweet"></i></a>
							<a href=""><i class="fa fa-heart"></i></a>
							<a href=""><i class="fab fa-gitter"></i></a>
						</div>
					</div>
					<div class='form-edit-tweet' id='edit-tweet-${idx}'>
						<textarea id='text-tweet-${idx}' onfocusout='konfirEdit(this)' tweet-id='${idx}'>${dataArr.tweet}</textarea>
					</div>

				</div>

				${btnHapus}  

				<div class="clear"></div>
				
			</div>`;
			});
		}
	}
}

function lihatTweetProfile() {

	token=document.location.href.split("=")[1]

	var xmlLoad = new XMLHttpRequest();
	xmlLoad.open("POST", "http://localhost:4000/readTweetProfile", true);
	xmlLoad.setRequestHeader("Content-Type", "application/json");
	xmlLoad.send(JSON.stringify({
		"token": token
	}))

	xmlLoad.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			data = JSON.parse(this.response);
			idx = 0;
			jTweet = 0;
			data.forEach(function (dataArr) {
				idx = dataArr.idtweet
				if (dataArr.token == localStorage.getItem('token')) {
					btnHapus =
						`<a href="" class="mn-option" data-id='${idx}' onclick='hapusTweet(this); return false;'>
						<i class="fas fa-backspace"></i>
					</a>`;
					btnEdit = `onclick='formEdit(this)' id='${idx}' style='cursor:pointer'`;


				} else {
					btnHapus = ``;
					btnEdit = ``;
				}
				jTweet += 1;
				document.getElementById('jml-tweet').innerText = jTweet;

				// alert(dataArr.photoprofile)
				tgl = new Date(dataArr.tgl)

				if (dataArr.photoprofile == "none" || dataArr.photoprofile == "") {
					userProf = 'image/akun.png';
				} else {
					userProf = 'image/profile/' + dataArr.photoprofile;
				}

				if (dataArr.media_image == "none" || dataArr.media_image == "") {
					mediaFoto = ``;
				} else {
					mediaFoto = `<img src='image/media/${dataArr.media_image}' class='tweetImg' onclick='showImage(this)' alt='${dataArr.tweet}'>`
				}

				if (dataArr.media_video == "none" || dataArr.media_video == "") {
					mediaVideo = ``;
				} else {
					mediaVideo = `<video src='image/media/${dataArr.media_video}' controls class='tweetVid'></video>`
				}

				document.getElementById("box-tweet").innerHTML +=
					`<div class="isi-tweet" id="box-tweet-${idx}">
					<img src='${userProf}' width='40px' height='40px' class='user-icon'>
					<div class="data-tweet">
					<strong>${dataArr.fullname}</strong> <span>@${dataArr.username} . ${timeAgo(tgl)}</span>

					<div id="data-tweet-${idx}">
						<p ${btnEdit} >${dataArr.tweet}</p>
						${mediaFoto}
						${mediaVideo}
		
						<div class="btn-tweet">
							<a href=""><i class="fa fa-comment"></i></a>
							<a href=""><i class="fas fa-retweet"></i></a>
							<a href=""><i class="fa fa-heart"></i></a>
							<a href=""><i class="fab fa-gitter"></i></a>
						</div>
					</div>
					<div class='form-edit-tweet' id='edit-tweet-${idx}'>
						<textarea id='text-tweet-${idx}' onfocusout='konfirEdit(this)' tweet-id='${idx}'>${dataArr.tweet}</textarea>
					</div>

				</div>

				${btnHapus}  

				<div class="clear"></div>
				
			</div>`;
			});
		}
	}
}

function lihatMediaUser(){
	id = document.location.href.split("=")[1]
	
	var xmlMedia = new XMLHttpRequest();
	xmlMedia.open("POST", "http://localhost:4000/readMediaUser");
	xmlMedia.setRequestHeader("Content-Type","application/json");
	xmlMedia.send(JSON.stringify({
		"token": id
	}));
	xmlMedia.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			data = JSON.parse(this.response)
			data.forEach(function(val){

				if (val.media_image != 'none'){
					media = val.media_image
				} else {
					media = val.media_video
				}
				
				eks = media.split(".");
				if (eks.pop() == 'mp4' || eks.pop() == 'mkv'){
					document.getElementById("box-media-user").innerHTML +=
					`<li><video src='image/media/${val.media_video}' onclick='showImage(this)' title='${val.tweet}'></video></li>`
				} else {
					document.getElementById("box-media-user").innerHTML +=
					`<li><img src="image/media/${val.media_image}" onclick='showImage(this)' alt='${val.tweet}'></li>`
				}
			});
		}
	}
}

function lihatSearch(){
	cari = document.getElementById("cari").value;

	var xmlSearch = new XMLHttpRequest();
	xmlSearch.open("POST", "http://localhost:4000/readSearch");
	xmlSearch.setRequestHeader("Content-Type","application/json");
	xmlSearch.send(JSON.stringify({
		"cari": cari
	}));
	xmlSearch.onreadystatechange = function(){
		document.getElementById("list-search").innerHTML = ''
		if (this.readyState == 4 && this.status == 200){
			data = JSON.parse(this.response)
			data.forEach(function(val){
				if (val.photoprofile == 'none' || val.photoprofile == ''){
					foto = `image/akun.png`
				} else {
					foto = `image/profile/${val.photoprofile}`
				}

				document.getElementById("list-search").innerHTML +=
				`<li>
					<img src='${foto}' width='35px' height='35px'>
					<a href="profile.html?token=${val.token}">${val.fullname}</a>
					<p>@${val.username}</p>
					<div style='clear:both'></div>
				</li>`
			});
		}
	}

}

function getUser() {
	token = localStorage.getItem('token')

	var xmlUser = new XMLHttpRequest();
	xmlUser.open("POST", "http://localhost:4000/getUser", true);
	xmlUser.setRequestHeader("Content-Type", "application/json");
	xmlUser.send(JSON.stringify({
		"token": token
	}));
	xmlUser.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			user = JSON.parse(this.response);

			user.forEach(function (data) {

				if (data.photoprofile == "none" || data.photoprofile == "") {
					foto = "image/akun.png";
				} else {
					foto = "image/profile/" + data.photoprofile;
				}

				document.getElementById('profil-fullname').innerText = data.fullname
				document.getElementById('profil-username').innerText = '@' + data.username
				document.getElementById('menu-fullname').innerText = data.fullname
				document.getElementById('menu-username').innerText = '@' + data.username
				document.getElementById("id-user-profile").value = data.token
				document.getElementById("user-profile").src = foto
				document.getElementById("img-menu").src = foto
				document.getElementById("img-tweet").src = foto
				document.getElementById("idUser").innerText = data.id
				document.getElementById("userId").value = data.token
			});

		}
		console.log(this.responseText, this.readyState, this.status)
	}
}


function getUserProfile() {
	token = document.location.href.split("=")[1]

	var xmlUser = new XMLHttpRequest();
	xmlUser.open("POST", "http://localhost:4000/getUser", true);
	xmlUser.setRequestHeader("Content-Type", "application/json");
	xmlUser.send(JSON.stringify({
		"token": token
	}));
	xmlUser.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			user = JSON.parse(this.response);

			user.forEach(function (data) {
				
				if (data.photoprofile == "none" || data.photoprofile == "") {
					foto = "image/akun.png";
				} else {
					foto = "image/profile/" + data.photoprofile;
				}

				document.getElementById('title-profile').innerText = data.fullname + ' (@' + data.username + ') | Twitter'
				document.getElementById('profile-fullname').innerText = data.fullname
				document.getElementById('profile-username').innerText = '@' + data.username
				document.getElementById("user-profile").src = foto
			});

		}
		console.log(this.responseText, this.readyState, this.status)
	}
}

function getMenuUserProfile() {
	token = localStorage.getItem('token')

	var xmlUser = new XMLHttpRequest();
	xmlUser.open("POST", "http://localhost:4000/getUser", true);
	xmlUser.setRequestHeader("Content-Type", "application/json");
	xmlUser.send(JSON.stringify({
		"token": token
	}));
	xmlUser.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			user = JSON.parse(this.response);

			user.forEach(function (data) {

				if (data.photoprofile == "none" || data.photoprofile == "") {
					foto = "image/akun.png";
				} else {
					foto = "image/profile/" + data.photoprofile;
				}

				document.getElementById('menu-fullname').innerText = data.fullname
				document.getElementById('menu-username').innerText = '@' + data.username
				document.getElementById("img-menu").src = foto
			});

		}
	}
}

function getListFollowing(){
	token = document.location.href.split("=")[1]

	var xmlFollowing = new XMLHttpRequest();
	xmlFollowing.open("POST", "http://localhost:4000/listFollowing");
	xmlFollowing.setRequestHeader("Content-Type","application/json");
	xmlFollowing.send(JSON.stringify({
		"token": token
	}));
	xmlFollowing.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			data = JSON.parse(this.response)

			data.forEach(function(val){
				if (val.photoprofile == 'none' || val.photoprofile == ''){
					foto = `image/akun.png`;
				} else {
					foto = 'image/profile/'+val.photoprofile;
				}

				document.getElementById("box-list-following").innerHTML +=
				`<div class="list-follow">
                <div class="sampul-tt">
                        <img src="image/img-profile.jpg" width="100%">
                    </div>
                    <div class="foto-tt">
                        <div class="">
                            <img src="${foto}" width="100%">
                        </div>
                    </div>
                    <button class="btn-follow btn-list-follow b-following show-btn" onclick='addFollow(this)' onmouseover='checkFollow(this)' onmouseout='checkFollowOut(this)' id='btnFollow-' data-refresh='refresh' value='Following'>Following</button>
                    <div class="data-tt">
                        <h3>${val.fullname}</h3>
                        <span>@${val.username}</span>
                        <p>Architecto quaerat quisquam eligendi vero quam expedita necessitatibus impedit mollitia dolor</p>
                    </div>          
				</div>`;
			});
		}
	}
}

function getListFollowers(){
	token = document.location.href.split("=")[1]

	var xmlFollowing = new XMLHttpRequest();
	xmlFollowing.open("POST", "http://localhost:4000/listFollowers");
	xmlFollowing.setRequestHeader("Content-Type","application/json");
	xmlFollowing.send(JSON.stringify({
		"token": token
	}));
	xmlFollowing.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
			data = JSON.parse(this.response)

			data.forEach(function(val){
				if (val.photoprofile == 'none' || val.photoprofile == ''){
					foto = `image/akun.png`;
				} else {
					foto = 'image/profile/'+val.photoprofile;
				}

				document.getElementById("box-list-following").innerHTML +=
				`<div class="list-follow">
                <div class="sampul-tt">
                        <img src="image/img-profile.jpg" width="100%">
                    </div>
                    <div class="foto-tt">
                        <div class="">
                            <img src="${foto}" width="100%">
                        </div>
                    </div>
                    <button class="btn-follow btn-list-follow b-following show-btn" onclick='addFollow(this)' onmouseover='checkFollow(this)' onmouseout='checkFollowOut(this)' id='btnFollow-' data-refresh='refresh' value='Following'>Following</button>
                    <div class="data-tt">
                        <h3>${val.fullname}</h3>
                        <span>@${val.username}</span>
                        <p>Architecto quaerat quisquam eligendi vero quam expedita necessitatibus impedit mollitia dolor</p>
                    </div>          
				</div>`;
			});
		}
	}
}

function cekBtnUser(){

	token = document.location.href.split("=")[1]
	myToken = localStorage.getItem('token');

	btnEditP = document.getElementById("b-edit").classList
	btnFollowing = document.getElementById("b-following").classList
	btnFollow = document.getElementById("b-follow").classList

	if (myToken == token){
		btnEditP.add('show-btn')
		btnFollow.add('hide-btn')
		btnFollowing.add('hide-btn')
	} else {

		var xmlBtn = new XMLHttpRequest();
		xmlBtn.open("POST", "http://localhost:4000/cekBtnUser");
		xmlBtn.setRequestHeader("Content-Type","application/json");
		xmlBtn.send(JSON.stringify({
			"token": token,
			"mytoken": myToken
		}));
		xmlBtn.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 200){
				if (this.responseText == "Teman"){
					btnEditP.add('hide-btn')
					btnFollow.add('hide-btn')
					btnFollowing.add('show-btn')
				} else {
					btnEditP.add('hide-btn')
					btnFollow.add('show-btn')
					btnFollowing.add('hide-btn')
				}
			}
		}

	}

}

function getAccount() {
	token = localStorage.getItem('token')

	var xmlUser = new XMLHttpRequest();
	xmlUser.open("POST", "http://localhost:4000/getUser", true);
	xmlUser.setRequestHeader("Content-Type", "application/json");
	xmlUser.send(JSON.stringify({
		"token": token
	}));
	xmlUser.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			user = JSON.parse(this.response);
			user.forEach(function (data) {

				document.getElementById("acc-username").value = data.username
				document.getElementById("acc-fullname").value = data.fullname
				document.getElementById("acc-email").value = data.email
				document.getElementById("acc-bio").value = data.bio

				document.getElementById('menu-fullname').innerText = data.fullname
				document.getElementById('menu-username').innerText = '@' + data.username

			});

		}
	}
}

function formEdit(data) {
	id = data.getAttribute('id');
	document.getElementById('data-tweet-' + id).style.display = "none";
	document.getElementById('edit-tweet-' + id).style.display = "block";
	document.getElementById('text-tweet-' + id).focus();
}

function prosesEdit(id, tweet, tweetbaru) {
	xmlEdit = new XMLHttpRequest();
	xmlEdit.open("POST", "http://localhost:4000/ubahTweet", true);
	xmlEdit.setRequestHeader("Content-Type", "application/json");
	xmlEdit.send(JSON.stringify({
		"token": localStorage.getItem('token'),
		"tweet": tweet,
		"tweetbaru": tweetbaru
	}));
	xmlEdit.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {

			document.getElementById("loading").style.display = "block"
			setTimeout(function () {
				document.getElementById("loading").style.display = "none"

				document.getElementById(id).innerText = tweetbaru
				document.getElementById('data-tweet-' + id).style.display = "block";
				document.getElementById('edit-tweet-' + id).style.display = "none";
			}, 1500)

		}
	}
}

function konfirEdit(data) {
	id = data.getAttribute('tweet-id');
	tweetlama = document.getElementById(id).innerText;
	tweetbaru = document.getElementById('text-tweet-' + id).value

	if (tweetlama != tweetbaru) {

		if (confirm('Simpan perubahan?') == true) {
			prosesEdit(id, tweetlama, tweetbaru)
		} else {
			document.getElementById('data-tweet-' + id).style.display = "block";
			document.getElementById('edit-tweet-' + id).style.display = "none";
			// document.getElementById(id).innerText = tweetlama
			document.getElementById('text-tweet-' + id).value = tweetlama
		}

	} else {
		document.getElementById('data-tweet-' + id).style.display = "block";
		document.getElementById('edit-tweet-' + id).style.display = "none";
	}
}

function addFollow(data) {
	id = data.getAttribute('data-id')
	ref = data.getAttribute('data-refresh')

	token = localStorage.getItem('token')
	btn = document.getElementById("btnFollow-" + id);

	if (btn.value == "Follow" || btn.innerText == "Follow") {
		xmlFollow = new XMLHttpRequest();
		xmlFollow.open("POST", "http://localhost:4000/addfollow");
		xmlFollow.setRequestHeader("Content-Type", "application/json");
		xmlFollow.send(JSON.stringify({
			"token": token,
			"following": id
		}))
		xmlFollow.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				btn.innerText = "Following";
				btn.value = "Following";
				btn.style.color = "#fff";
				btn.style.backgroundColor = "#37A9F1";

				setTimeout(function () {
					document.getElementById("info-follow-" + id).style.display = "none";
				}, 2000)
			}
		}
	} else if (btn.value = "UnFollow" || btn.innerText == "UnFollow") {

		xmlFollow = new XMLHttpRequest();
		xmlFollow.open("POST", "http://localhost:4000/cancelfollow");
		xmlFollow.setRequestHeader("Content-Type", "application/json");
		xmlFollow.send(JSON.stringify({
			"token": token,
			"following": id
		}))

		xmlFollow.onreadystatechange = function () {
			if (ref == 'refresh'){
				document.location='index.html';
			}

			btn.value = "Follow"
			btn.innerText = "Follow";
			btn.style.color = "#37A9F1";
			btn.style.backgroundColor = "#fff";
			btn.style.borderColor = "#37A9F1";
		}
	}
}

function checkFollow(data) {
	id = data.getAttribute('data-id')
	idCurrentLogin = document.getElementById("idUser").innerText
	btn = document.getElementById("btnFollow-" + id);

	if (btn.value == "Following" || btn.innerText == "Following") {
		btn.value = "UnFollow"
		btn.innerText = 'UnFollow';
		btn.style.color = "#fff";
		btn.style.backgroundColor = "rgb(216, 70, 70)";
		btn.style.borderColor = "rgb(170, 43, 43)";
	} else {
		btn.style.backgroundColor = "rgba(54, 207, 253, 0.151)";
	}

}

function checkFollowOut(data) {
	id = data.getAttribute('data-id')
	idCurrentLogin = document.getElementById("idUser").innerText
	btn = document.getElementById("btnFollow-" + id);

	if (btn.value == "Follow" || btn.innerText == "Follow") {
		btn.value = "Follow"
		btn.innerText = "Follow";
		btn.style.color = "#37A9F1";
		btn.style.backgroundColor = "#fff";
		btn.style.borderColor = "#37A9F1";
	} else if (btn.value == "UnFollow" || btn.innerText == "UnFollow") {
		btn.innerText = "Following";
		btn.value = "Following";
		btn.style.color = "#fff";
		btn.style.borderColor = "#37A9F1";
		btn.style.backgroundColor = "#37A9F1";
	}
}

function lihatUser() {
	token = localStorage.getItem('token');

	xmlLihat = new XMLHttpRequest();
	xmlLihat.open("POST", "http://localhost:4000/readUser")
	xmlLihat.setRequestHeader("Content-Type", "application/json")
	xmlLihat.send(JSON.stringify({
		"token": token
	}))
	xmlLihat.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {

			data = JSON.parse(this.response)
			data.forEach(function (val) {

				if (val.photoprofile == "none" || val.photoprofile == "") {
					imgFollow = `image/akun.png`;
				} else {
					imgFollow = `image/profile/${val.photoprofile}`;
				}

				document.getElementById("body-follow").innerHTML +=
					`<div id="info-follow-${val.id}" class='info-follow'>
				<img src="${imgFollow}" class='info-follow-img'>

				<div class="follow-data">
					<strong>
					<a class='tooltip'>${val.fullname}					
						<div class='tooltip-box'>
						
						<div class="sampul-tt">
							<img src="image/img-profile.jpg" width="100%">
						</div>
						<div class="foto-tt">
							<div class="">
								<img src="${imgFollow}" width="100%">
							</div>
						</div>
						<button class="btn-follow btn-tooltip" data-id='${val.id}' onclick='addFollow(this)' onmouseover='checkFollow(this)' onmouseout='checkFollowOut(this)' id='btnFollow-${val.id}' value='Follow'>Follow</button>
						<div class="data-tt">
							<h3>${val.fullname}</h3>
							<span>@${val.username}</span>
							<p>${val.bio}</p>

						<ul>
							<li>
								<span>Tweets</span>
								<h3>1000</h3>
							</li>
							<li>
								<span>Following</span>
								<h3>1000</h3>
							</li>
							<li>
								<span>Follows</span>
								<h3>1000</h3>
							</li>
						</ul>
						</div>
						</div>

					</a></strong> 
					<span>@${val.username}</span>
					<br>
					<button class="btn-follow" data-id='${val.id}' onclick='addFollow(this)' onmouseover='checkFollow(this)' onmouseout='checkFollowOut(this)' id='btnFollow-${val.id}' value='Follow'>Follow</button>
				</div>

				<div class="clear"></div>
			</div>`;

			});
		}
	}
}

function getCountFollow() {
	var xmlGetCount = new XMLHttpRequest();
	xmlGetCount.open("POST", "http://localhost:4000/getCountFollow")
	xmlGetCount.setRequestHeader("Content-Type", "application/json")
	xmlGetCount.send(JSON.stringify({
		"token": localStorage.getItem('token')
	}))
	xmlGetCount.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			data = JSON.parse(this.response)
			document.getElementById("jml-follows").innerText = data.jmlFollows;
			document.getElementById("jml-followed").innerText = data.jmlFollowed;
		}
	}
}

function ubahAkun() {

	token = localStorage.getItem('token')
	username = document.getElementById("acc-username").value
	fullname = document.getElementById("acc-fullname").value
	email = document.getElementById("acc-email").value
	bio = document.getElementById("acc-bio").value

	var xmlUbah = new XMLHttpRequest();
	xmlUbah.open("POST", "http://localhost:4000/ubahAkun");
	xmlUbah.setRequestHeader("Content-Type", "application/json");
	xmlUbah.send(JSON.stringify({
		"token": token,
		"username": username,
		"fullname": fullname,
		"email": email,
		"bio": bio
	}));
	xmlUbah.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			alert('Account Success Edited');
			document.location = 'profile.html?token='+token
		}
	}
}

function ubahPassword() {

	token = localStorage.getItem('token')
	currentpass = document.getElementById("pass-current").value
	newpas = document.getElementById("pass-new").value
	verpas = document.getElementById("pass-ver").value

	var xmlUbah = new XMLHttpRequest();
	xmlUbah.open("POST", "http://localhost:4000/ubahAkun");
	xmlUbah.setRequestHeader("Content-Type", "application/json");
	xmlUbah.send(JSON.stringify({
		"token": token,
		"current_pass": currentpass,
		"new_pass": newpas,
		"ver_pass": verpas
	}));
	xmlUbah.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			alert('Password Success Edited');
		}
	}
}

function openRecent(){
	box = document.getElementById("box-recent-search")
	box.style.display = "block"
}
function closeRecent(){
	box = document.getElementById("box-recent-search")
	box.style.display = "none"
}