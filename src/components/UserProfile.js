
import {getUserCache,setUserToCache} from './userProfileCache'

var UserProfile = (function () {
  var UserProfile = null;

  var setUser = function (newUser) {
    UserProfile = newUser; // Also set this in cookie/localStorage
    if(newUser){
      setUserToCache('user', newUser);

    }
    
  };

  var getUser = function () {
    var cacheUser = getUserCache('user')
    if(cacheUser){ return cacheUser.data.user.user } else { return UserProfile }
    // return UserProfile  // Or pull this from cookie/localStorage
  };

  return { getUser, setUser }

})();

export default UserProfile;