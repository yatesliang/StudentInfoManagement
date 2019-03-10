
/**
 * @file: demoOk.js
 * @author: fisco-dev
 * 
 * @date: 2017
 */

var Web3= require('web3');
var config=require('../web3lib/config');
var fs=require('fs');
var execSync =require('child_process').execSync;
var web3sync = require('../web3lib/web3sync');
var BigNumber = require('bignumber.js');


if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  web3 = new Web3(new Web3.providers.HttpProvider(config.HttpProvider));
}

console.log(config);

async function sleep(timeout) {  
  return new Promise((resolve, reject) => {
        setTimeout(function() {
              resolve();
              }, timeout);
        });
}


var filename="StuManager";

var address=fs.readFileSync(config.Ouputpath+filename+'.address','utf-8');
var abi=JSON.parse(fs.readFileSync(config.Ouputpath/*+filename+".sol:"*/+filename+'.abi', 'utf-8'));
var contract = web3.eth.contract(abi);
var instance = contract.at(address);

console.log("contract address:"+address);
func0 = "activeStu(uint256)";
// addSubGrade(uint stuId, string year, string semester, string name, string grade)
func1 = "addSubGrade(uint256,string,string,string,string)";
// addRecord(uint stuId, string year, string name, string fileHash, string yearMonth)
func2 = "addRecord(uint256,string,string,string,string)";
// addCert(uint stuId, string certType, string cName, string cFileHash)
func3 = "addCert(uint256,string,string,string)";
// modifySubGrade(uint stuId, string year, string semester, string name, string grade)
func4 = "modifySubGrade(uint256,string,string,string,string)";
// modifyRecord(uint stuId, string year, string name, string fileHash, string yearMonth)
func5 = "modifyRecord(uint256,string,string,string,string)";
// updateCert(uint stuId, string certType, string cName, string cFileHash)
func6 = "updateCert(uint256,string,string,string)";

(async function(){
  // activeStu
  var stuId = 1;

  var func = func0; 
  var params = [stuId];
  var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, address, func, params);
  console.log(receipt);
  await sleep(2000);
  console.log("############# start test #########");
  var existed=instance.stuExist(stuId);
  console.log("###stu:["+stuId+"] existed="+existed.toString());
// test1 addSubGrade
  var func = func1;
  var params = [stuId, "2019", "1", "english", "A"];
  var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, address, func, params);
  console.log(receipt);
  await sleep(2000);
  var stuGrades=instance.getStuGrades(stuId);
  console.log("###stu:["+stuId+"] stuGrades=" + stuGrades.toString());
  // test2 addRecord
  var func = func2;
  var params = [stuId, "2019", "record1", "filehash", "2018-09"];
  var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, address, func, params);
  console.log(receipt);
  await sleep(2000);
  var stuRecords=instance.getStuRecords(stuId);
  console.log("###stu:["+stuId+"] stuRecords=" + stuRecords.toString());
  // test3 addCert
  var func = func3;
  var params = [stuId, "[GradeSheet]", "cert_name", "filehash"];
  var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, address, func, params);
  console.log(receipt);
  await sleep(2000);
  var cert=instance.getInfoCert(stuId, "filehash");
  console.log("###stu:["+stuId+"] cert=" + cert.toString());

  // ------------------------------------------------
  // test4 modifySubGrade
  var func = func4;
  var params = [stuId, "2019", "1", "english", "C"];
  var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, address, func, params);
  console.log(receipt);

  var stuGrades=instance.getStuGrades(stuId);
  console.log("###stu:["+stuId+"] modify stuGrades=" + stuGrades.toString());
  // test5 modifyRecord
  var func = func5;
  var params = [stuId, "2019", "record1", "filehash", "2018-09"];
  var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, address, func, params);
  console.log(receipt);

  var stuRecords=instance.getStuRecords(stuId);
  console.log("###stu:["+stuId+"] modify stuRecords=" + stuRecords.toString());
  // test6 updateCert
  var func = func6;
  var params = [stuId, "[GradeSheet]", "cert_name", "filehash2"];
  var receipt = await web3sync.sendRawTransaction(config.account, config.privKey, address, func, params);
  console.log(receipt);

  var cert=instance.getInfoCert(stuId, "filehash2");
  console.log("###stu:["+stuId+"] update cert=" + cert.toString());
})()