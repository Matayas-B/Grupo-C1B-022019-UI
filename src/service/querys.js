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
        return API.get('/service/deleteMenu?serviceId='+ serviceId +',menuId='+menuId);
    },

    getMenu(menuId) {
        function changeDateFormat(date){
            let date_getFullYear = date.split("-")[2],
                date_getMonth    = date.split("-")[1],
                date_getDate     = date.split("-")[0];
            return date_getFullYear + "-" + date_getMonth + "-" + date_getDate;
        }
        let menu = {};
        API.get( "/service/getMenu?menuId="+menuId )
            .then(res => {
                let menuUI = res;
                menuUI.startDate = changeDateFormat( menuUI.startDate );
                menuUI.endDate = changeDateFormat( menuUI.endDate );
                menu = menuUI;
            });
        return menu;
    },
};

export default querys;