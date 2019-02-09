import NotificationService, {NOTIF_WISHLIST_CHANGED} from './notification-service'

var ns = new NotificationService(); //only ever one notifService

var instance = null;
var wishList = []; //the wishList in state, not on the server!


class DataService {
    constructor(){
        if (!instance){
            instance = this;
        }
        return instance; //If it's the first time the dataservice is created, then create it once in memory. 
        //You always have one and only one data service at one time, for consistent data. 
    }
    
    itemOnWishList = (item) =>{
        for (let i=0;i<wishList.length;i++ ){
            if (wishList[i]._id === item._id){
                return true;
            }
            }
        return false;
        }
    
    
    addWishListItem = item =>{
        wishList.push(item);
        ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
    }
    
    removeWishListItem = item =>{
     //working with id's 
        for (let i = 0; i<wishList.length; i++){
            if (wishList[i]._id === item._id){
                wishList.splice(i, 1);
                ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);

                break; //delete from the wishlist 
            }
        }
    }
    
}

export default DataService; 
