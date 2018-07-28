var auth = firebase.auth();
var db = firebase.database();

var userNameRef = document.getElementById('userName');
var emailRef = document.getElementById('email');
var passwordRef = document.getElementById('password');
var phoneRef = document.getElementById('phone');

function signup() {
    let userObject = {
        userName: userNameRef.value,
        email: emailRef.value,
        password: passwordRef.value,
        contact: phoneRef.value
    };
    // console.log('signup invoke', emailRef.value, passwordRef.value, phoneRef.value);
    firebase.auth().createUserWithEmailAndPassword(userObject.email, userObject.password)
        .then((success) => {
            delete userObject.password;
            db.ref(`users/${success.user.uid}/`).set(userObject);
            emailRef.value = '';
            passwordRef.value = '';
            phoneRef.value = '';
            // console.log('signup successfully', success);
            location = './login.html'
        })
        .catch((error) => {
            console.error('something went wrong', error);
        })
}
function login() {
    // console.log('login invoke', emailRef.value, passwordRef.value);
    firebase.auth().signInWithEmailAndPassword(emailRef.value, passwordRef.value)
        .then((success) => {
            console.log('signin successfully', success);
            localStorage.setItem("currentUserUid", success.user.uid);
            //      // getting messaging Object from firebase
            //      const messaging = firebase.messaging();

            // messaging.requestPermission().then(function () {
            //     console.log('Notification permission granted.');
            //     return messaging.getToken();
            // }).then(function (token) {
            //     // Displaying user token
            //     userObject={
            //         token:token,
            //     }
            //     db.ref(`users/${success.user.uid}/`).push(userObject);
            //     console.log('token >>>> ', token);

            // }).catch(function (err) { // Happen if user deney permission
            //     console.log('Unable to get permission to notify.', err);
            // });
            location = 'olx-main.html';

        })
        .catch((error) => {
            console.log('something went wrong', error)
        })
}

// function containToken(){
//          var userKey=localStorage.getItem('currentUserUid');
//     messaging.requestPermission().then(function () {
//         console.log('Notification permission granted.');
//         return messaging.getToken();
//     }).then(function (token) {
//         // Displaying user token
//         userObject={
//             token:token,
//         }
//         db.ref(`users/${userKey}/`).set(userObject);
//         console.log('token >>>> ', token);

//     }).catch(function (err) { // Happen if user deney permission
//         console.log('Unable to get permission to notify.', err);
//     });
// }



var myAccountRef = document.getElementById('myAccount');
function signoutUser() {
    firebase.auth().signOut()
        .then((success) => {
            localStorage.clear();
            // myAccountRef.innerHTML = 'My Account';
            location = 'index.html';
        })
}


function checkLogin() {
    if (localStorage.getItem('currentUserUid')) {
        location = 'createAd.html';
    }
    else {
        alert('you have not login');
    }
}

function alreadylogin() {
    if (localStorage.getItem('currentUserUid')) {
        location = 'olx-main.html';
    }

    // else{
    //     alert('Kindly first you Login');
    // }
}

var globalPathForImg;
function encodeImageFileAsURL() {

    // var filesSelected = document.getElementById("inputFileToLoad").files;
    var filesSelected = document.getElementById("gallery").files;
    if (filesSelected.length > 0) {
        var fileToLoad = filesSelected[0];

        var fileReader = new FileReader();

        fileReader.onload = function (fileLoadedEvent) {
            var srcData = fileLoadedEvent.target.result; // <--- data: base64
            globalPathForImg = srcData;

        }
        fileReader.readAsDataURL(fileToLoad);
    }
    filesSelected.files = '';
}



function sumbitAd() {
    var titleRef = document.getElementById("title");
    var categoriesRef = document.getElementById("categories");
    var descriptionRef = document.getElementById("description");
    var prizeRef = document.getElementById('prize');
    var nameRef = document.getElementById("name");
    var modelRef = document.getElementById("model");
    var phoneRef = document.getElementById("phoneCat");

    let currentUid = localStorage.getItem('currentUserUid');
    // var myImage = galleryRef.files[0];


    // if(image){

    //         var spaceRef=firebase.storage().ref().child('images/space.jpg');
    //      var file = image; // use the Blob or File API
    //         spaceRef.put(file).then(function(snapshot) {
    //         console.log(snapshot,'Uploaded a blob or file!');
    //        imgRef=snapshot;    

    //     });
    // }

    submitAd = {
        title: titleRef.value,
        categories: categoriesRef.value,
        description: descriptionRef.value,
        prize: prizeRef.value,
        imgUrl: globalPathForImg,
        name: nameRef.value,
        model: modelRef.value,
        phone: phoneRef.value
    }
    submitAd.adCreatedBy = currentUid;
    db.ref(`users/ads/${submitAd.categories}/`).push(submitAd);


    // console.log(submitAd);

    // db.ref(`/ads/${currentUid}/`).push(submitAd);
    // if (myImage) {
    // var storageRef = firebase.storage().ref().child('images/crime-2.png');

    //     //console.log(storageRef);
    //     var file = myImage;
    //     var metadata = {
    //         contentType: 'image/png'
    //     };
    //     var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
    //     console.log(file);
    //     //let that = this;
    //     storageRef.put(file).then(function (snapshot) {
    //         console.log(snapshot);
    //         uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
    //             console.log('File available at', downloadURL);
    //             submitAd.imgUrl = downloadURL;
    //             submitAd.adCreatedBy = currentUid;
    //             //   db.ref(`users/ads/${submitAd.categories}/${currentUid}/`).push(submitAd);
    //             // db.ref(`users/${currentUid}/ads/${submitAd.categories}/`).push(submitAd);
    //             db.ref(`users/ads/${submitAd.categories}/`).push(submitAd);

    //         });
    //     })
    // }





    // console.log(galleryRef.files[0]);


    titleRef.value = "";
    categoriesRef.value = "";
    descriptionRef.value = "";
    prizeRef.value = '';
    // filesSelected.value = "";
    // galleryRef.value = "";
    nameRef.value = "";
    modelRef.value = "";
    phoneRef.value = "";


    // console.log(submitAd);
}




function openNav() {
    document.getElementById("mySidenav").style.width = "70%";
    // document.getElementById("flipkart-navbar").style.width = "50%";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "rgba(0,0,0,0)";
}

function createCustomeElement(element, customeText) {
    var myEl = document.createElement(element);
    var myText = document.createTextNode(customeText);
    myEl.appendChild(myText);
    // console.log(myEl)
    return myEl;
}


//    ****************Search By Ads**************

var searchAdsRef = document.getElementById('searchAds');
function searchByads() {
    usersChatRoomsRef.style.display = 'none';
    // adsRef.style.display = 'block';
    adsRef.innerHTML = '';
    db.ref(`users/ads/`).once('value', (AdsSnapshot) => {
        var searchAdsValue = AdsSnapshot.val();
        for (var key in searchAdsValue) {
            for (var subKey in searchAdsValue[key]) {
                var existAAds = mySearchFunction(searchAdsValue[key][subKey].title);
                if (existAAds !== -1) {
                    var specificCatogory = searchAdsValue[key][subKey];

                    var parentDiv = creatingAdsFun(specificCatogory, key, subKey);

                    adsRef.appendChild(parentDiv);
                }
                else {
                    customDiv = document.createElement('div');
                    customDiv.setAttribute('class', 'notfound');
                    var h3 = createCustomeElement('h3', 'Not found');
                    customDiv.appendChild(h3);
                }


                // console.log(searchAdsValue[key][subKey].title);


            }
        }
    })
}

function mySearchFunction(str) {
    var strFind = str.toLowerCase();
    var n = strFind.search(searchAdsRef.value.toLowerCase());
    return n;
}


//    **************** My Ads Show Fucntion**************
var currentUserUid = localStorage.getItem('currentUserUid');

function myAds() {
    if (localStorage.getItem('currentUserUid')) {
        usersChatRoomsRef.style.display = 'none';
        // adsRef.style.display = 'block';
        adsRef.innerHTML = '';
        // var myId=localStorage.getItem('currentUserUid');
        db.ref(`users/ads/`).once('value', (myAdsSnapshot) => {
            var myAdsValue = myAdsSnapshot.val();
            for (var key in myAdsValue) {
                for (var subKey in myAdsValue[key]) {
                    // console.log(myAdsValue[key][subKey].adCreatedBy);
                    if (myAdsValue[key][subKey].adCreatedBy === currentUserUid) {
                        var specificCatogory = myAdsValue[key][subKey];

                        var parentDiv = creatingAdsFun(specificCatogory, key, subKey);

                        adsRef.appendChild(parentDiv);

                        console.log(myAdsValue[key][subKey].adCreatedBy);

                    }

                }

            }
        })
    }
    else {
        // alert('you have not Login');
        var popup = document.getElementById('container-popup');

        popup.innerHTML = `
    // <h2>Modal Example</h2>
    // <!-- Button to Open the Modal -->
    // <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
    //   Open modal
    // </button>
  
    // <!-- The Modal -->
    <div class="modal" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
        
        //   <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Alert</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          
        //   <!-- Modal body -->
          <div class="modal-body">
            You have Not login
          </div>
          
        //   <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
          
        </div>
      </div>
    </div>
    
  </div>
  `
    }


}

var adsRef = document.getElementById('ads');


//    ****************Show All Ads function**************
function showAllAds() {
    usersChatRoomsRef.style.display = 'none';
    // adsRef.style.display = 'block';
    adsRef.innerHTML = '';
    db.ref(`/users/ads/`).on('value', (categorySnapshot) => {
        // console.log('Function Run sor show All ads');
        var categoryList = categorySnapshot.val();
        console.log(categoryList);
        for (var key in categoryList) {

            for (var subKey in categoryList[key]) {

                var specificCatogory = categoryList[key][subKey];
                console.log(specificCatogory);

                var parentDiv = creatingAdsFun(specificCatogory, key, subKey);
                console.log(parentDiv);
                adsRef.appendChild(parentDiv);
            }
            //  console.log(adsRef);
        }
    }, (e) => {
        console.log('e', e);

    })


}






var userSearch = document.getElementById('search-category');

//    ****************Search By category Function**************
function searchingFunc(categoryName) {
    usersChatRoomsRef.style.display = 'none';
    // adsRef.style.display = 'block';
    // location='olx-main.html';
    // console.log(adsRef);
    // console.log(categoryName);

    //  a1.appendChild(div1);
    // adsRef.appendChild(a1);
    // console.log(adsRef);

    adsRef.innerHTML = '';
    var userSearchValue = categoryName;
    // console.log(userSearchValue); 
    db.ref(`/users/ads/`).once('value', (categorySnapshot) => {
        var categories = categorySnapshot.val();
        console.log(categories);
        for (var key in categories) {
            // console.log(categories);
            // console.log(`${key} ${userSearchValue}`);
            // console.log(key === userSearchValue);
            if (key === userSearchValue) {
                //    console.log(key,categories[key]);
                for (subKey in categories[key]) {
                    //    console.log(subKey);
                    var specificCatogory = categories[key][subKey];

                    console.log(specificCatogory)
                    var parentDiv = creatingAdsFun(specificCatogory, key, subKey);

                    adsRef.appendChild(parentDiv);
                    // console.log(adsRef);


                }
            }
        }
    })


}


// function for creating ads structure
function creatingAdsFun(categoriesObj, adsKey, adsSubKey, forCondition) {
    // console.log(forCondition);
    var a1 = document.createElement('a');
    var img1 = document.createElement('img');
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    var div3 = document.createElement('div');
    var btnDiv = document.createElement('div');
    btnDiv.setAttribute('class', 'Favbtn');
    if (forCondition != undefined) {
        var btnEl = createCustomeElement('button', 'Delete Favourite Ad');
        btnEl.setAttribute('onClick', 'delToFav(this)');
    }
    else {
        var btnEl = createCustomeElement('button', 'Add to favourite');
        btnEl.setAttribute('onClick', 'addToFav(this)');
    }
    // btnEl.setAttribute('class','Favbtn');
    div1.setAttribute('id', adsSubKey);
    console.log(adsSubKey);

    div1.setAttribute('class', 'col-md-4');
    // div1.style.display='flex';
    // div1.style.flexDirection='column';
    // div1.style.alignItems='center'; 
    div2.setAttribute('class', 'thumbnail');
    div2.setAttribute('onClick', 'adsDetail(this)');
    // div2.setAttribute('id','ads-detail');


    div3.setAttribute('class', 'caption');

    img1.src = categoriesObj.imgUrl;
    // img1.setAttribute('src',specificCatogory.imgUrl);
    img1.setAttribute('ALT', `img-${categoriesObj.categories}`);
    img1.setAttribute('style', 'width:100%');
    img1.setAttribute('style', 'height:70%');
    img1.setAttribute('id', adsKey);
    console.log(adsKey);

    var ulEl = createCustomeElement('ul', '');
    for (var pickProperty in categoriesObj) {
        if (pickProperty !== 'adCreatedBy' && pickProperty != 'imgUrl') {
            if (pickProperty == 'prize' || pickProperty === 'title') {
                // var sEl=document.createElement('s');
                var liEl = createCustomeElement('li', `${pickProperty}:${categoriesObj[pickProperty]}`);
                liEl.setAttribute('class', 'title-style');
                // sEl.appendChild(liEl);
                ulEl.appendChild(liEl);
            }


        }

    }

    div3.appendChild(ulEl);
    div2.appendChild(img1);
    //  div2.appendChild(hrel);
    div2.appendChild(div3);
    a1.appendChild(div2);
    div1.appendChild(a1);
    btnDiv.appendChild(btnEl);
    div1.appendChild(btnDiv);
    // console.log(div1);
    return div1;
}





function delToFav(reference) {
    var currentUserUid = localStorage.getItem('currentUserUid');
    var AdsDetailobjId = reference.parentNode.parentNode.id;
    var AdsDetailobjId2 = reference.parentNode.parentNode.parentNode;
    db.ref(`/users/${currentUserUid}/favourite Ads/${AdsDetailobjId}/`).remove();
    for (var i = 0; i < AdsDetailobjId2.childNodes.length; i++) {
        if (AdsDetailobjId2.childNodes[i].id === AdsDetailobjId) {
            console.log(AdsDetailobjId2.childNodes[i]);
            adsRef.removeChild(AdsDetailobjId2.childNodes[i]);
        }
    }
    favouritAds();
    // snapshotFavAd.val()
    // console.log(snapshotFavAd.val());

}













// var favAdsOfflineShow=[];
function addToFav(adKey) {
    if (localStorage.getItem('currentUserUid')) {

        // console.log(adKey.parentNode.parentNode.id);
        // console.log(currentUserUid);
        db.ref(`/users/${currentUserUid}/favourite Ads/${adKey.parentNode.parentNode.id}`).set(adKey.parentNode.parentNode.id);
        favouritAds();
        // showAllAds();   
    }
    else {
        alert('you have not Login');
        // location.reload();
    }
}

//    ****************Favourite Ads Function**************
var flagShow = false;
var favAdsobj = {};
var num = 0;
function favouritAds() {
    num = 0;
    favAdsOfflineShow = [];
    if (localStorage.getItem('currentUserUid')) {
        usersChatRoomsRef.style.display = 'none';
        // adsRef.style.display = 'block';
        db.ref(`/users/${currentUserUid}/favourite Ads/`).once('value', (favouritAdsSnapshot) => {
            //    console.log(favouritAdsSnapshot.val());
            // for(var favouritAdsKey in favouritAdsSnapshot.val())
            // {
            var pKey = favouritAdsSnapshot.val();
            favAdsobj = pKey;

            // console.log(favAdsobj);

            db.ref(`/users/ads/`).once('value', (adsSnapshot) => {
                var adsList = adsSnapshot.val();
                // console.log(adsList);
                for (var favouritAdsKey in favAdsobj) {
                    for (var key in adsList) {
                        // console.log(adsList[key]);
                        for (var subKey in adsList[key]) {
                            if (favouritAdsKey === subKey) {
                                var specificCatogory = adsList[key][subKey];
                                // specificCatogory.key=key;
                                specificCatogory.subKey = subKey;
                                // console.log(specificCatogory);
                                favAdsOfflineShow[num] = specificCatogory;
                                num++;

                            }


                            // console.log(` fav Key${favouritAdsKey}`);
                            // console.log(subKey);
                            // console.log(favouritAdsSnapshot.val()[favouritAdsKey]);
                            // console.log([subKey]===favouritAdsSnapshot.val()[favouritAdsKey]);



                        }
                    }
                }
            })
            // console.log(favAdsOfflineShow);
            localStorage.setItem('favouritAds', JSON.stringify(favAdsOfflineShow));
        })
    }
    else {
        alert('you have not Login');
        // location.reload();
    }

}



// *********************Favourite Ads retrive from local storage for offline view
function ShowOfflineModefavouritAds() {
    usersChatRoomsRef.style.display = 'none';
    adsRef.innerHTML = '';

    var favouritAdsObj = localStorage.getItem('favouritAds');
    var favouritAdsObj = JSON.parse(favouritAdsObj);
    for (var i = 0; i < favouritAdsObj.length; i++) {
        key = favouritAdsObj[i].categories;
        subKey = favouritAdsObj[i].subKey;
        console.log(`${key} ${subKey}`);

        var parentDiv = creatingAdsFun(favouritAdsObj[i], key, subKey, true);
        adsRef.appendChild(parentDiv);

    }

    // console.log(adsRef);



}




//   *************Show Ad Deatil*****************
function adsDetail(el) {

    if (localStorage.getItem('currentUserUid')) {
        // localStorage.clear();
        // var currentUserUid=auth.currentUser.uid;
        // localStorage.setItem('currentUserUid',currentUserUid);
        // console.log(currentUserUid);
        var adsObj = {};
        var AdsDetailobjId;
        var AdsDetailobjId2
        console.log(el);
        if (el.hasAttribute("key")) {
            console.log('if side...........');
            AdsDetailobjId = el.attributes[1].value;
            AdsDetailobjId2 = el.attributes[0].value;
            oponent = el.attributes[2].value;
            adsObj.key = AdsDetailobjId2;
            adsObj.subKey = AdsDetailobjId;
            adsObj.oponentUser = oponent;
        }
        else {

            console.log('else side...........');
            var AdsDetailobjId = el.parentNode.parentNode.id;
            var AdsDetailobjId2 = el.childNodes[0].id;
            adsObj.key = AdsDetailobjId2;
            adsObj.subKey = AdsDetailobjId;
        }
        // console.log(adsObj);

        localStorage.setItem('singleAd', JSON.stringify(adsObj));
        location = 'single-Ad-show.html';

        // console.log(adsObj);
        // for(var key in AdsDetailobj){
        // console.log(AdsDetailobjId,AdsDetailobjId2);
        // db.ref(`/users/ads/${AdsDetailobjId2}/${AdsDetailobjId}`).once('value',(singleAdSnapshot)=>{

        //     for(var key in singleAdSnapshot.val()){
        // if(key!=='adCreatedBy'){
        //             adsObj[key]=singleAdSnapshot.val()[key];
    }
    else {
        alert('you have not login');
    }
}

//  else if(key==='description'){
//     adsObj.description=singleAdSnapshot.val()[key];
// }        
// else if(key==='imgUrl'){
//     adsObj.imgUrl=singleAdSnapshot.val()[key];
// }        
// else if(key==='model'){
//     adsObj.model=singleAdSnapshot.val()[key];
// }        
// else if(key==='name'){
//     adsObj.name=singleAdSnapshot.val()[key];
// }        
// else if(key==='phone'){
//     adsObj.phone=singleAdSnapshot.val()[key];
// }        
// else if(key==='prize'){
//     adsObj.prize=singleAdSnapshot.val()[key];
// }        
// else if(key==='title'){
//     adsObj.title=singleAdSnapshot.val()[key];
// } 



//         // console.log(`${key}: ${singleAdSnapshot.val()[key]}`);

// }
// })
// console.log(adsObj);
// localStorage.setItem('desiredAd',JSON.stringify(adsObj));
// location='single-Ad-show.html';

// }

var singleAdRef = document.getElementById('single-ad');
function singleAdShow() {
    conversation();
    var div1 = document.createElement('div');
    div1.setAttribute('class', 'title-clas');
    var selectEl = document.createElement('section');
    var div2 = document.createElement('div');
    div2.setAttribute('class', 'media');
    var div3 = document.createElement('div');
    div3.setAttribute('class', 'list-class');
    var ulEl = document.createElement('ul');
    // div1.setAttribute('class','flex-container');

    var adsObj = JSON.parse(localStorage.getItem('singleAd'));

    // console.log(`${adsObj.key+ adsObj.subKey}`);
    db.ref(`/users/ads/${adsObj.key}/${adsObj.subKey}`).once('value', (singleAdSnapshot) => {

        console.log(singleAdSnapshot.val());
        // var oponentUser;
        if (adsObj.oponentUser) {
            oponentUser = adsObj.oponentUser;
        }
        else {
            oponentUser = singleAdSnapshot.val().adCreatedBy;
        }
        localStorage.setItem('oponentUser', oponentUser);
        for (var key in singleAdSnapshot.val()) {

            if (key !== 'adCreatedBy') {
                if (key == 'title') {
                    var h3El = createCustomeElement('h3', singleAdSnapshot.val()[key]);
                    h3El.style.textAlign = 'center';
                    div1.appendChild(h3El);
                    // singleAdRef.appendChild(div1);
                    // console.log(singleAdRef);
                    // adsFlag=true;
                }

                else if (key === 'imgUrl') {
                    var imgEl = document.createElement('img');
                    // imgEl=`img ${singleAdSnapshot().categories}`;
                    imgEl.setAttribute('src', singleAdSnapshot.val()[key]);
                    selectEl.appendChild(imgEl);
                    div2.appendChild(selectEl);
                    // singleAdRef.appendChild(selectEl);
                }
                else {
                    var liEl = createCustomeElement('li', `${key} : ${singleAdSnapshot.val()[key]}`);
                    ulEl.appendChild(liEl);
                    div3.appendChild(ulEl);
                    //  singleAdRef.appendChild(div3);
                }

                // console.log(`${key} : ${singleAdSnapshot.val()[key]}`);


            }


        }

        // console.log(singleAdRef);

    })
    singleAdRef.appendChild(div1);
    singleAdRef.appendChild(div2);
    singleAdRef.appendChild(div3);
}

// console.log(`component used Id ${oponentUserId}`);
var messageRef = document.getElementById('userMessage');
var chatRef = document.getElementById('chat');

function chat() {

    var oponentUserId = localStorage.getItem('oponentUser');
    var currentUserUid = localStorage.getItem('currentUserUid');
    var adsObj = JSON.parse(localStorage.getItem('singleAd'));
    // console.log(`component User ${oponentUser}` );
    // console.log(`current User ${currentUserUid}` );
    if (messageRef.value !== '') {
        var chatObj = {
            senderId: currentUserUid,
            reciverId: oponentUserId,
            message: messageRef.value,
        };

        // db.ref(`/users/${currentUserUid}/conversation/`).once('value',(chatRoomSnapshot)=>{
        //     var chatRoomUsers=chatRoomSnapshot.val();     
        //     for(var key in chatRoomUsers){
        //         if(chatRoomUsers[key]!==oponentUser){
        //         }

        //     }         
        // })


        // db.ref(`/users/${oponentUser}/conversation/`).once('value',(chatRoomSnapshot)=>{
        //     var chatRoomUsers=chatRoomSnapshot.val();     
        //     for(var key in chatRoomUsers){
        //         if(chatRoomUsers[key]!==currentUserUid){
        //         }

        //     }         
        // })
        //  console.log(`${currentUserUid}
        //    ${oponentUserId}`);

        var identityChatAd1 = {
            oponentUser: oponentUserId,
            category: adsObj.key,
        }
        var identityChatAd2 = {
            oponentUser: currentUserUid,
            category: adsObj.key,
        }
        db.ref(`/users/${currentUserUid}/conversation/${adsObj.subKey}/`).set(identityChatAd1);
        db.ref(`/users/${oponentUserId}/conversation/${adsObj.subKey}/`).set(identityChatAd2);

        // db.ref(`/users/${currentUserUid}/conversation/${oponentUserId}/`).set(oponentUserId);
        // db.ref(`/users/${oponentUserId}/conversation/${currentUserUid}/`).set(currentUserUid);
        db.ref(`/messages/`).push(chatObj);

        messageRef.value = '';
    }
}


var senderId, reciverId;

function conversation() {
    var oponentObj =JSON.parse( localStorage.getItem('singleAd'));
    var currentUserUid = localStorage.getItem('currentUserUid');
var oponentUserId=oponentObj.oponentUser;
    console.log('conversation called');
    console.log(oponentUserId);

    chatRef.innerHTML = '';
    // console.log('function run.....');

    db.ref(`/messages/`).on('child_added', (snapshotMessage) => {
        var mess = snapshotMessage.val();
        // console.log(currentUserUid);
        // console.log(oponentUserId);
        useSenderId = mess.senderId;
        useReciverId = mess.reciverId;
        useMessage = mess.message;

        // console.log(useSenderId === currentUserUid, useReciverId === oponentUserId), (useSenderId === oponentUserId, useReciverId === currentUserUid)
        if ((useSenderId === currentUserUid && useReciverId === oponentUserId) || (useSenderId === oponentUserId && useReciverId === currentUserUid)) {
            // console.log(`${useSenderId} 
            //              ${useReciverId} 
            //              ${useMessage}` );
            //             // console.log(chatRef);
            // console.log(message);
            divP = document.createElement('div');
            var pEl = createCustomeElement('p', useMessage);
            if (useSenderId === currentUserUid) {
                pEl.style.float = "right";
                pEl.style.fontSize = '16px';
                pEl.style.display = 'inline-block';
                pEl.style.padding = '6px';
                pEl.style.border = '1px solid black';
                pEl.style.borderRadius = '25px';
                pEl.style.backgroundColor = '#95a4bc';
                pEl.style.color = '#ffffff';


                // pEl.setAttribute('class','fa fa-circle');
                // pEl.setAttribute.style.fontSize='24px';
                // pEl.setAttribute.style.color='red';
            }
            else {
                pEl.style.float = "left";
                pEl.style.display = 'inline-block';
                pEl.style.fontSize = '16px';
                pEl.style.padding = '6px';
                pEl.style.border = '1px solid black';
                pEl.style.borderRadius = '25px';
                pEl.style.backgroundColor = '#f2e398';
                pEl.style.color = '#4f4b4b';
                // pEl.setAttribute('class','fa fa-dot-circle-o');
                // pEl.setAttribute.style.fontSize='24px';
                // pEl.setAttribute.style.color='black';

            }
            divP.appendChild(pEl);
            chatRef.appendChild(divP);
            //         // console.log(chatRef.id);
            //             // console.log(`messages:  ${message}`);
        }



    })
}


var usersChatRoomsRef = document.getElementById('usersChatRooms');
function chatPersonList() {
    if (localStorage.getItem('currentUserUid')) {
        adsRef.style.display = 'none';
        usersChatRoomsRef.style.display = 'block';
        var currentUserUid = localStorage.getItem('currentUserUid');
        db.ref(`/users/${currentUserUid}/conversation/`).once('value', (conversationSnapshot) => {
            console.log(conversationSnapshot.val());
            for (var key in conversationSnapshot.val()) {
                //  console.log();
                var oponentUserKey = conversationSnapshot.val()[key].oponentUser;
                var adcategory = conversationSnapshot.val()[key].category;
                //         //   for(var subKey in conversationSnapshot.val()[key])
                //             //   {
                console.log(oponentUserKey);
                console.log('_---------------------')

                //   console.log(`/users/ads/${adcategory}/${key}/`);
                fetchPro(adcategory, key, oponentUserKey);
                //      db.ref(`/users/ads/${adcategory}/${key}/`).once('value',(adSnapshot)=>{
                //          var adObj=adSnapshot.val();
                //         //  console.log(adObj,'====================================');
                //          var adKey=adSnapshot.key;
                //          console.log(conversationSnapshot.val()[key].oponentUser);
                //          console.log('===========================');
                //          var trEl=createTableRow(adObj,adObj.categories,adKey,oponentUserKey);
                //         //  console.log(usersChatRoomsRef.childNodes[1].childNodes[1])
                //            usersChatRoomsRef.childNodes[1].appendChild(trEl);
                //     // console.log(usersChatRoomsRef);



                // })
                //     //     // console.log(conversationSnapshot.val()[key].oponentUser);
                //     // }
            }
        })
    }

    else {
        alert('you have not Login');
    }

}

// ***********closure fu******
function fetchPro(adcategory, key, oponentUserKey) {
    db.ref(`/users/ads/${adcategory}/${key}/`).once('value', (adSnapshot) => {
        var adObj = adSnapshot.val();
        //  console.log(adObj,'====================================');
        var adKey = adSnapshot.key;
        console.log(oponentUserKey);
        // console.log(adObj);
        console.log('===========================');
        db.ref(`/users/${oponentUserKey}`)
        var trEl = createTableRow(adObj, adObj.categories, adKey, oponentUserKey);
        //  console.log(usersChatRoomsRef.childNodes[1].childNodes[1])
        usersChatRoomsRef.childNodes[1].appendChild(trEl);
        // console.log(usersChatRoomsRef);



    })
}

function createTableRow(adObj, category, adKey, oponentUserKey) {
    var tr1 = document.createElement('tr');
    tr1.setAttribute('key', category);
    tr1.setAttribute('subKey', adKey);
    tr1.setAttribute('oponentKey', oponentUserKey);

    console.log(tr1);
    tr1.setAttribute('onClick', 'adsDetail(this)');

    tdEl = createCustomeElement('td', adObj.title);
    tr1.appendChild(tdEl);
    tdEl2 = createCustomeElement('td', adObj.name);
    tr1.appendChild(tdEl2);
    return tr1;
}




// checking is Browser supports the Service Worker..
if ('serviceWorker' in navigator) {

    console.log('Service Worker is supported');

    // if service worker supported then register my service worker
    navigator.serviceWorker.register('service-worker.js').then(function (reg) {
        console.log('Successfully Register :^)', reg);

        reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function (subscription) {
            console.log('subscription:', subscription.toJSON());
            // GCM were used this endpoint
            console.log('endpoint:', subscription.endpoint);
        });

    }).catch(function (error) {
        console.log('SW Registration Failed: :^(', error);
    });

}



// function checkFun(){
//     console.log(`yah function run`);
// }


// const messaging = firebase.messaging();

// messaging.requestPermission()
// .then(()=>{
//     console.log('have a permission');
//      return messaging.getToken();
// })
// .then((currentToken)=>{
// console.log(currentToken);
//     if (currentToken) {
//         console.log(currentToken);
//     } else {
//         console.log('No Instance ID token available. Request permission to generate one.');
//     }

// })
// .catch((error)=>{
//     console.log('An error occurred while retrieving token. ', error);

// })


// .catch((err)=>{
//     console.log('Unable to get permission to notify. ', err);
// })










// adsRef.innerHTML='';
// var userSearchValue = userSearch.value;
// // console.log(userSearchValue); 
    // db.ref(`/users/ads/`).once('value', (categorySnapshot) => {
    //     var categories = categorySnapshot.val();
    //     for (var key in categories) {
    //         // console.log(categories);
    //         // console.log(key);
    //         // console.log(key === userSearchValue);
    //         if(key === userSearchValue){
    //         //    console.log(categories[key]);
    //            for(subKey in categories[key]){
    //                   var specificCatogory= categories[key][subKey]
    //             //    console.log(specificCatogory);

    //             var aEl=createCustomeElement('A','');
    //             aEl.setAttribute('src','#');

    //                var divEl=document.createElement('DIV');

    //                divEl.setAttribute('class','col-md-4');
    //                var divEl2=document.createElement('DIV');
    //                divEl2.setAttribute('class','thumbnail');
    //             //    divEl2.setAttribute('class','img-div');
    //                var imgEl=document.createElement('IMG');
    //             //    imgEl.src=specificCatogory.imgUrl;
                //    imgEl.setAttribute('src',specificCatogory.imgUrl);
                //    imgEl.setAttribute('ALT',`img-${specificCatogory.categories}`);
                //    imgEl.setAttribute('style','width:50%');

    //                console.log(divEl2);
    //                divEl2.appendChild(imgEl);
    //                console.log(divEl2);




    //             divEl2.appendChild(imgEl);

    //                divEl3=document.createElement('DIV');

    //                divEl3.setAttribute('class','caption');
                //    var ulEl=createCustomeElement('ul','');

                //    for(var pickProperty in specificCatogory){
                //        if(pickProperty!== 'adCreatedBy' && pickProperty!='imgUrl'){
                //            var liEl=createCustomeElement('li',`${pickProperty}:${specificCatogory[pickProperty]}`);
                //                 ulEl.appendChild(liEl);   
                //         }

                //     }


    //                 divEl3.appendChild(ulEl);
    //                 divEl2.appendChild(divEl3);
    //                 divEl.appendChild(divEl2);
    //                 aEl.appendChild(divEl);
    //                 adsRef.appendChild(aEl);



    //             //    console.log(imgEl);
    //                divEl.appendChild(imgEl);
    //             //    console.log(divEl2);
    //                divEl.appendChild(divEl2);
    //             //    console.log(divEl)
    //                adsRef.appendChild(divEl);
    //             //    console.log(adsRef);


    //            }                
    //         }
    //     }
    // })
    // // let usersRef = firebase.database().ref('users');
    // // usersRef.orderByc().orderByChild('name').equalTo('John Doe').on("value", function(snapshot) {
    // //     console.log(snapshot.val());
    // //     snapshot.forEach(function(data) {
    // //         console.log(data.key);
    // //     });
    // // });

    // // db.ref(`/users/`).once('value',(categorySnapshot)=>{
    // //     console.log(categorySnapshot.val());

    // // })





