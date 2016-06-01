var fs = require('fs');
var readline = require('readline');
var tools = require('../public/tools-module.js');
//var EventsEmitter = require('events').EventEmitter;
//var domain = require('domain').create();
var LOG_PATH = '遠端網路共享資料夾';
var logResultJsonModel = require('../models/logsResultJsonModel.js');

//捕捉錯誤廣播
//domain.on('error', function (error) {
//});

module.exports = {
    
    /**
     * 依據 Log 類型與 Log 時間取得 Log 紀錄
     */
    getLog: function (type, date, callback) {
        
        //依據傳入的參數組成 Log 檔名
        var requireLogPath = (LOG_PATH + date + '_' + type + '.log').toLowerCase();
        
        //利用檔案資訊檢查檔案是否存在
        fs.stat(requireLogPath, function (err, stats) {
            var logsResultJson = tools.jsonClone(logResultJsonModel);
            
            if (!err) {      //讀取 Log 檔案成功
                var lineReader = readline.createInterface({
                    input: fs.createReadStream(requireLogPath, 'utf8')
                });
                
                try {
                    var logAry = [];
                    lineReader.on('line', function (lineData) {
                        logAry.push({
                            sort_id: logAry.length + 1,
                            log_time: lineData
                        });
                    });
                    
                    lineReader.on('close', function () {
                        logsResultJson.log_data = logAry;
                        logsResultJson.state = 1;
                        callback(logsResultJson);
                    });

                } catch (ex) {      //廣播錯誤訊息
                    
                    //domain.run(function () {
                    //    var emitter = new EventsEmitter();
                    //    emitter.emit('error', new Error(ex));
                    //});
                    
                    logsResultJson.state = -1;
                    logsResultJson.message = error.message;
                    logsResultJson.log_data = [];
                    callback(logsResultJson);
                }
            } else {
                callback(logsResultJson);
            }
        });
    }
};