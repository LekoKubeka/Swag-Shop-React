
var  instance = null; 
//creating a global constant that can be accessed by anyone.
export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";

//faster than an array
var observers = {};

class NotificationService {
    constructor(){
         if (!instance){
            instance = this;
        }
        return instance; 
    }
    //notifName is the type of notification this particular observer has subscribed to listen for.
    addObserver = (notifName, observer, callback)=>{
        var obs = observers[notifName];
        if (!obs){
            observers[notifName] = [];
        }
        
        //obj is in the observers object of observers
        var obj = {observer: observer, callback: callback};
        observers[notifName].push(obj);
    }
    
    
    removeObserver = (observer, notifName)=>{
         var obs = observers[notifName];
        
        if (obs){//check observers for notifName notifications
            for (let i = 0; i<obs.length; i++){
                if(observer === obs[i].observer){//checks if its same object in memory
                    obs.splice(i, 1);
                    observers[notifName] = obs; //reset array
                    break;
            }
        }
    }
}
    
    postNotification = (notifName, data) => {
        var obs = observers[notifName];
        for (var i = 0; i<obs.length; i++){
            var obj = obs[i];
            obj.callback(data);
        }
    }
}

export default NotificationService; 