import API from './api';

const querys = {
    menuesfromservice: (serviceId) => {
        var menues = [];
                
        function handlError(e){
            var error = (!e.status)? e.toString() : 'network error';
            // eslint-disable-next-line
            console.log(error);    
        }
        let addmenu = (res)=> {
            // eslint-disable-next-line
            console.log('backend-menu:ok');
            res.forEach(element => {
                menues.push(element); 
            });
        };
        API.get('/service/getMenus?serviceId='+serviceId).then(addmenu).catch( handlError );
        return menues;
    },

    deleteMenu: (serviceId,menuId) => {
        API.get('/service/deleteMenu?serviceId='+ serviceId +',menuId='+menuId);
    }
};

export default querys;