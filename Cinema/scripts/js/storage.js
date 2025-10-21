const StorageService = {
    
    getData(key) {
        //convertendo para JSON
        return JSON.parse(localStorage.getItem(key)) || [];
    },

    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }
};