const accountsDAO = require('./AccountsDAO')
const responseCodes = require('./responseCodes')

async function tryToAddAccount(headers){
    const date = new Date()
    const sqlQuery = `select username from ttdata.account_data where username = '${headers.username}'`;
    const sqlInsert = "INSERT INTO ttdata.account_data (username, password, date_created)"+
            ` VALUES ('${headers.username}', '${headers.password}', '${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}');`
    const data = await accountsDAO.query(sqlQuery);
    if(data.length > 0){
        return responseCodes.account_taken;
    } 
    accountsDAO.query(sqlInsert); 
    return responseCodes.created_succesfully;
}

async function login(headers){
    const sqlQuery = `select * from ttdata.account_data where username = '${headers.username}' and password = '${headers.password}'`;
    const data = await accountsDAO.query(sqlQuery);
    if(data.length == 1){
        responseCodes.login_successful.account_data = data 
        return responseCodes.login_successful;
    } else if(data.length == 0){
        return responseCodes.login_unsuccessful;
    } else {
        return responseCodes.internal_service_error;
    }
}

function getChampionData(championName){
    return {
        champ: championName,
        winrate: 79,
    }
}

function getAllChampionData(){
    return {
        rengar: {
            wr: 12,
            br: 15,
        },
        ahri: {
            wr: 1862,
            br: 1675,
        },
        etc: {
            wr: 14442,
            br: 12225,
        },
    }
}
module.exports = {
    login,
    tryToAddAccount,
    getAllChampionData,
    getChampionData
}