// function dropDown(){
//     document.getElementById('dropdown').classList.toggle('show');
// }

// window.onclick = function(event){
//     if (!event.target.matches('.btn-dropdown')){
//         var dropdowns = document.getElementsByClassName('dropdown');
//         var i;
//         for (i=0; i< dropdowns.length; i++){
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('show')){
//                 openDropdown.classList.remove('show');
//             }
//         }
//     }
// }

function hapusTweet(data) {
	// debugger
	tweet = data.getAttribute('data-status');
	index = data.getAttribute('data-index');
	email = localStorage.getItem('email');

	if (confirm('Yakin ingin hapus tweet ini?') == true) {
		var xmlHapus = new XMLHttpRequest();
		xmlHapus.open("POST", "http://localhost:4000/deltweet", true);
		xmlHapus.setRequestHeader("Content-Type", "application/json");
		xmlHapus.send(JSON.stringify({
			"email": email,
			"tweet": tweet
		}));
		xmlHapus.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("loading").style.display = "block"
				setTimeout(function () {
					document.getElementById("loading").style.display = "none"
					document.getElementById("box-tweet-" + index).style.display = "none";
				}, 2000)
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
		"email": email,
		"password": password,
		"fullname": fullname,
		"tweet": []
	}));

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 201) {
			document.getElementById("info").style.animation = "infos 1s";
			document.getElementById("info").style.display = "block";
			document.getElementById("info").style.borderColor = "rgb(55, 211, 164);"
			document.getElementById("info").style.backgroundColor = "rgba(154, 255, 196, 0.24)";
			document.getElementById("info").innerHTML = "Sign Up successfully!"
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
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("info").style.display = "none";
			console.log(this.response)
			console.log(typeof this.response)
			data = JSON.parse(this.response)
			console.log(data.username)
			console.log(data.email)

			localStorage.setItem('email', data.email)
			document.location = 'index.html'

		} else {
			document.getElementById("info").style.animation = "infos 1s";
			document.getElementById("info").style.display = "block";
			document.getElementById("info").style.borderColor = "rgb(226, 81, 93)"
			document.getElementById("info").style.backgroundColor = "rgba(255, 146, 146, 0.24)";
			document.getElementById("info").innerHTML = "Email atau password anda salah!";
		}
	}
}

function addTweet() {
	tweet = document.getElementById("inTweets").value;

	var xmlTweet = new XMLHttpRequest();
	xmlTweet.open("POST", "http://localhost:4000/tweet", true);
	xmlTweet.setRequestHeader("Content-Type", "application/json");
	xmlTweet.send(JSON.stringify({
		"email": localStorage.getItem('email'),
		"tweet": tweet
	}));
	xmlTweet.onreadystatechange = function () {
		console.log(this.response)
		if (this.readyState == 4 && this.status == 201) {
			console.log(this.response)
			data = JSON.parse(this.response);
			document.getElementById("box-tweet").insertAdjacentHTML("afterbegin",
				`<div class="isi-tweet">
                <i class="far fa-user-circle fa-3x fut"></i>
                <div class="data-tweet">
                    <strong>${data.fullname}</strong> <span>@${data.username} . 45m</span>
                    <p>${tweet}</p>

                    <div class="btn-tweet">
                        <a href=""><i class="fa fa-comment"></i></a>
                        <a href=""><i class="fas fa-retweet"></i></a>
                        <a href=""><i class="fa fa-heart"></i></a>
                        <a href=""><i class="fab fa-gitter"></i></a>
                    </div>
                </div>

                <a href="" title="${tweet}" class="mn-option" id="${tweet}" onclick='hapusTweet(this); return false;'>
                    <i class="fas fa-backspace"></i>
                </a>

                <div class="clear"></div>
                
            </div>`);
			document.getElementById("inTweets").value = ''
			document.getElementById('jml-tweet').innerText = parseInt(document.getElementById('jml-tweet').innerText) + 1
		}
	}
}

function lihatData() {
	var xmlLoad = new XMLHttpRequest();
	xmlLoad.open("POST", "http://localhost:4000/allData", true);
	xmlLoad.setRequestHeader("Content-Type", "application/json");
	xmlLoad.send(JSON.stringify({
		"email": localStorage.getItem('email')
	}))

	xmlLoad.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			data = JSON.parse(this.response);
			idx = 0;
			jTweet = 0;
			data.forEach(function (dataArr, index) {
				dataArr.tweet.forEach(function (dataTweet, i) {
					if (dataArr.email == localStorage.getItem('email')) {
						btnHapus =
							`<a href="" class="mn-option" data-status="${dataTweet}" data-index='${idx}' onclick='hapusTweet(this); return false;'>
                            <i class="fas fa-backspace"></i>
                        </a>`;
						btnEdit = `onclick='formEdit(this)' id='${idx}'`;
						jTweet += 1;
						document.getElementById('jml-tweet').innerText = jTweet;
					} else {
						btnHapus = ``;
						btnEdit = ``;
					}

					document.getElementById("box-tweet").insertAdjacentHTML('afterbegin',
						`<div class="isi-tweet" id="box-tweet-${idx}">
                    <i class="far fa-user-circle fa-3x fut"></i>
                    <div class="data-tweet">
                        <strong>${dataArr.fullname}</strong> <span>@${dataArr.username} . 45m</span>

                        <div id="data-tweet-${idx}">
                            <p ${btnEdit} >${dataTweet}</p>
            
                            <div class="btn-tweet">
                                <a href=""><i class="fa fa-comment"></i></a>
                                <a href=""><i class="fas fa-retweet"></i></a>
                                <a href=""><i class="fa fa-heart"></i></a>
                                <a href=""><i class="fab fa-gitter"></i></a>
                            </div>
                        </div>
                        <div class='form-edit-tweet' id='edit-tweet-${idx}'>
                            <textarea id='text-tweet-${idx}' onfocusout='konfirEdit(this)' tweet-id='${idx}'>${dataTweet}</textarea>
                        </div>

                    </div>

                    ${btnHapus}  

                    <div class="clear"></div>
                    
                </div>`);
					idx += 1;
				});
				// console.log(this.response)
			});
		}
	}
}

function getUser() {
	email = localStorage.getItem('email');

	var xmlUser = new XMLHttpRequest();
	xmlUser.open("POST", "http://localhost:4000/getUser", true);
	xmlUser.setRequestHeader("Content-Type", "application/json");
	xmlUser.send(JSON.stringify({
		"email": email
	}));
	xmlUser.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			user = JSON.parse(this.response);

			document.getElementById('profil-fullname').innerText = user.fullname
			document.getElementById('profil-username').innerText = '@' + user.username
			document.getElementById('menu-fullname').innerText = user.fullname
			document.getElementById('menu-username').innerText = '@' + user.username

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
	// id = data.getAttribute('id');
	// tweet = document.getElementById(id).innerText;
	// tweetbaru = document.getElementById('text-tweet-'+id).value;

	xmlEdit = new XMLHttpRequest();
	xmlEdit.open("POST", "http://localhost:4000/ubahTweet", true);
	xmlEdit.setRequestHeader("Content-Type", "application/json");
	xmlEdit.send(JSON.stringify({
		"email": localStorage.getItem('email'),
		"tweet": tweet,
		"tweetbaru": tweetbaru
	}));
	xmlEdit.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 201) {

			document.getElementById("loading").style.display = "block"
			setTimeout(function () {
				document.getElementById("loading").style.display = "none"

				document.getElementById(id).innerText = tweetbaru
				document.getElementById('data-tweet-' + id).style.display = "block";
				document.getElementById('edit-tweet-' + id).style.display = "none";
			}, 2000)

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