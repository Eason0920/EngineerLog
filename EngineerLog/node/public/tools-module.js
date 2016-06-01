module.exports = {
    
    /**
     * Json 物件複製
     */
    jsonClone: function (jsonObj) {
        return JSON.parse(JSON.stringify(jsonObj));
    }
};