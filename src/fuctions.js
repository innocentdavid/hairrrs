import { auth, db } from "./firebase";
import firebase from "firebase";
import { formatValue } from 'react-currency-input-field';

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
    if (timestamp) {
        try {
            let dateObj = new Date(timestamp?.toDate().toString());
            if (dateObj) {
                var nMonth = month[dateObj.getMonth()];
                let date = dateObj.getDate();
                if (nMonth && date) {
                    return `${nMonth}, ${date}`
                }
            }
        } catch (error) {
            return '';
        }
    } else { return ''; }
}

function formatAMPM(date) {
    if (date) {
        let dateObj = new Date(date.toDate().toString());
        var hours = dateObj.getHours();
        var minutes = dateObj.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
}

const getMonthDateYearHour_minute = (timestamp) => {
    if (timestamp) {
        let dateObj = new Date(timestamp.toDate().toString());
        var nMonth = month[dateObj.getMonth()];
        let date = dateObj.getDate();
        let year = dateObj.getFullYear();

        // let newDate = new Date(timestamp * 1000)
        // let Hours = newDate.getHours()
        // let Minutes = newDate.getMinutes()
        // const Hour_minute = Hours + ':' + Minutes

        let time = formatAMPM(timestamp)

        return `${nMonth} ${date} ${year} ${time}`
    }
    return ''
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

function makeid(length) {
    var result = '';
    // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const getUserGeolocationDetails = () => {
    // return fetch('https://geolocation-db.com/json/f9902210-97f0-11eb-a459-b997d30983f1')
    return fetch('http://api.ipstack.com/check?access_key=ec25f48e728aa47005e593878c3f67c3')
        .then(res => res.json())
        .then(data => { return data })
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

const followUser = (userId, photoURL, displayName, userName = 'Username') => {
    if (uid) {
        db.collection('users').doc(uid).collection('following').doc(userId).set({
            uid: userId, photoURL, displayName, userName
        })

        db.collection('users').doc(userId).collection('follower').doc(uid).set({
            uid,
            photoURL: user?.map(doc => doc.photoURL),
            displayName: user?.map(doc => doc.displayName),
            userName
            // userName: user?.map(doc => doc.userName )
        })
    }
}

const unFollowUser = (userId) => {
    if (uid) {
        db.collection('users').doc(uid).collection('following').doc(userId).delete()
        db.collection('users').doc(userId).collection('follower').doc(uid).delete()
    }
}

const hasFollowed = async (userId) => {
    if (uid) {
        let followerRef = await db.collection('users').doc(userId).collection('follower').doc(uid).get()
        return followerRef.exists
    }

}

function pasteHtmlAtCaret(html) {
    var sel, range;
    if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();

            // Range.createContextualFragment() would be useful here but is
            // non-standard and not supported in all browsers (IE9, for one)
            var el = document.createElement("div");
            el.innerHTML = html;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ((node = el.firstChild)) {
                lastNode = frag.appendChild(node);
            }
            range.insertNode(frag);

            // Preserve the selection
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type !== "Control") {
        // IE < 9
        document.selection.createRange().pasteHTML(html);
    }
}

function UrlSlug(str, action) {
    if (str) {
        if (action === 'encode') {
            return str.replace(/\s+/g, '-')
        } else {
            return str.replace(/-/g, ' ')
        }
    } else { return str }
}

const resizeSingleImage = (handleUpdatePics, photoURL, size, type) => {
    var files = photoURL;
    // var MAX_WIDTH = 96;
    var MAX_WIDTH = size;
    var imageFile = files;
    if (imageFile.name) {
        var fileName = imageFile.name
        if (auth.currentUser) {
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
                    var realData = block[1].split(",")[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."
                    var blob = b64toBlob(realData, contentType); // Convert it to a blob to upload
                    handleUpdatePics(blob, fileName, type);
                };
            };
        }
    }
}


// Format using prefix, groupSeparator and decimalSeparator

function getFormattedValue(value = 0, prefix) {
    const formattedValue = formatValue({
        value,
        groupSeparator: ',',
        decimalSeparator: '.',
        prefix,
    });
    return formattedValue
}


export {
    month, 
    getMonthDate, 
    formatAMPM, 
    getMonthDateYearHour_minute,
    getDesc, 
    topFunction, 
    getRandomInt, 
    UrlSlug,
    getUserGeolocationDetails, 
    b64toBlob,
    deleteArticle, 
    save, 
    Unsave, 
    hasSaved, 
    followUser,
    unFollowUser, 
    hasFollowed, 
    pasteHtmlAtCaret, 
    makeid, 
    resizeSingleImage,
    getFormattedValue
};
