import { auth, db, storage } from "./firebase";
import firebase from "firebase";

var uid = auth.currentUser?.uid
var user = [];
db.collection('users').doc(uid).get().then(doc => {
    let result = ({ ...doc.data(), id: doc.id });
    user.push(result);
});

var month = [];
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

const getMonthDate = (timestamp) => {
    let dateObj = new Date(timestamp?.toDate().toString());
    var nMonth = month[dateObj.getMonth()];
    let date = dateObj.getDate();
    if (nMonth && date) {
        return `${nMonth}, ${date}`
    }
}

const getMonthDateYearHour_minute = (timestamp) => {
    let dateObj = new Date(timestamp.toDate().toString());
    var nMonth = month[dateObj.getMonth()];
    let date = dateObj.getDate();
    let year = dateObj.getFullYear();

    let newDate = new Date(timestamp * 1000)
    let Hours = newDate.getHours()
    let Minutes = newDate.getMinutes()
    const Hour_minute = Hours + ':' + Minutes

    return `${nMonth} ${date} ${year} ${Hour_minute}`
}

function strip(html) {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

const getDesc = (articleStr, limit = 150) => {
    if (articleStr) {
        var str = strip(articleStr)
        str = str.replace(/\s+/g, ' ').trim()
        const res = str.slice(0, limit)
        if (str.length <= limit) {
            return str;
        } else {
            return res + "...";
        }
    }
}

const topFunction = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const getRandomInt = (limit) => {
    return Math.floor(Math.random() * limit) + 1;
}

const getUserGeolocationDetails = () => {
    return fetch('https://geolocation-db.com/json/f9902210-97f0-11eb-a459-b997d30983f1')
        .then(res => res.json())
        .then(data => { return data })
}

const UploadImage = (imageFile) => {
    var fileName = imageFile.name
    if (auth.currentUser) {
        const MAX_WIDTH = 400;

        if (!imageFile) { alert('You did not select any image') };
        const reader = new FileReader();
        reader.readAsDataURL(imageFile);

        reader.onload = function (event) {
            const imgElement = document.createElement("img");
            imgElement.src = event.target.result;

            imgElement.onload = function (e) {
                const canvas = document.createElement("canvas");
                const scaleSize = MAX_WIDTH / e.target.width;
                canvas.width = MAX_WIDTH;
                canvas.height = e.target.height * scaleSize;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);
                const srcEncoded = ctx.canvas.toDataURL(e.target, "image/jpeg");
                // Split the base64 string in data and contentType
                var block = srcEncoded.split(";");
                // Get the content type of the image
                var contentType = block[0].split(":")[1];// In this case "image/jpeg"
                // get the real base64 content of the file
                var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

                // Convert it to a blob to upload
                var blob = b64toBlob(realData, contentType);
                // console.log(blob);
                handleUpload(blob, fileName);
            };
        };
    }
}

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

const handleUpload = (imageFile, fileName) => {
    var file = new File([imageFile], fileName, { type: "image/png" });
    const uploadTask = storage.ref(`images/${auth.currentUser.uid}/${fileName}`).put(file);

    uploadTask.on("state_change", (snapshot) => {
        const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(progress);
    },
        (error) => {
            console.log(error);
            // alert(error.message)
        },
        () => {
            // complete function...
            storage
                .ref(`images/${auth.currentUser.uid}/${fileName}`)
                .getDownloadURL()
                .then(url => {
                    // post image inside db
                    db.collection('users').doc(auth.currentUser.uid).collection('images').add({ url });
                });
        }
    );
};

const deleteArticle = (id) => {
    if (id) {
        db.collection('articles').doc(id).delete()
        return `${id} has been deleted successfully`
    }
}

const save = async (id, articleCover, articleTitle, link, type) => {
    var uid = await auth.currentUser?.uid
    if (id) {
        let data = {
            photoURL: articleCover,
            description: articleTitle,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            link,
            type
        }
        if (data && uid) {
            db.collection('users').doc(uid).collection('saveList').doc(id).set(data)
        }
    }
}

const Unsave = async (id) => {
    var uid = await auth.currentUser?.uid
    if (id && uid) {
        db.collection('users').doc(uid).collection('saveList').doc(id).delete()
    }
}

const hasSaved = (saveList, id) => {
    let r = saveList.filter(item => item.id === id);
    if (r.length !== 0) { return true } else { return false }
}

const followUser = (userId, photoURL, displayName, userName='Username') => {
    if(uid){
        db.collection('users').doc(uid).collection('following').doc(userId).set({
            uid: userId, photoURL, displayName, userName
        })

        db.collection('users').doc(userId).collection('follower').doc(uid).set({
            uid, 
            photoURL: user?.map(doc => doc.photoURL ), 
            displayName: user?.map(doc => doc.displayName ),
            userName
            // userName: user?.map(doc => doc.userName )
        })
    }
}

const unFollowUser = (userId) => {
    if(uid){
        db.collection('users').doc(uid).collection('following').doc(userId).delete()
        db.collection('users').doc(userId).collection('follower').doc(uid).delete()
    }
}

const hasFollowed = async (userId) => {
    if(uid){
        let followerRef = await db.collection('users').doc(userId).collection('follower').doc(uid).get()
        return followerRef.exists
    }

}

export {
    month, getMonthDate, getMonthDateYearHour_minute,
    getDesc, topFunction, getRandomInt,
    getUserGeolocationDetails, UploadImage,
    deleteArticle, save, Unsave, hasSaved, followUser, 
    unFollowUser, hasFollowed
};