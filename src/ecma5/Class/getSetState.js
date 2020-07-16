"use strict";

var _statesDataBase = {};

var exitFromStateFunction = function exitFromStateFunction(data, func, stateKey) {
    return new Promise(function (resolve, reject) {
        try {
            func = undefined;
            if (stateKey) _statesDataBase[stateKey] = _.clone(data);
            data = undefined;
            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
};

var getDataFromStateFunction = function getDataFromStateFunction(stateKey) {
    return new Promise(function (resolve, reject) {
        try {
            resolve(_statesDataBase[stateKey]);
        } catch (e) {
            reject(null);
        }
    });
};

var removeAllStates = function removeAllStates() {
    _statesDataBase = undefined;
};

/*export default class GetSetStateClass{

    static exitFromState(data,func,needStoreData){
        return new Promise(
            (resolve, reject) => {
                try{
                    func = undefined;
                    if(needStoreData)
                        GetSetStateClass.setStateData(_.clone(data),needStoreData);
                    data = undefined;
                    resolve(true);
                }catch(e){
                    reject(e);
                }
            });
    }

    static  getStateData(key){
        return new Promise(
            (resolve, reject) => {
                try{
                    GetSetStateClass._stateData = GetSetStateClass._stateData || {};
                    resolve(GetSetStateClass._stateData[key]);
                }catch(e){
                    reject(null);
                }
            });
    }

    static  setStateData(stateData , key){
        GetSetStateClass._stateData = GetSetStateClass._stateData || {};
        GetSetStateClass._stateData[key] = stateData;
    }

}*/