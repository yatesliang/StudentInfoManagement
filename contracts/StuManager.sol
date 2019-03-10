pragma solidity ^0.4.2;
import "LibEthLog.sol";

contract StuManager{
    using LibEthLog for *;
    enum CertType{ GradeSheet, WholeCV, PartCV, Err }
    string gradeSheetStr = "[GradeSheet]";
    string wholeCVStr = "[WholeCV]";
    string partCVStr = "[PartCV]";
    string err = "[ErrType]";
    
    enum SemesterType{ Fir, Sec, None }
    string semesterFirStr = "1";
    string semesterSecStr = "2";

    struct SubGrade{
        string name;
        string grade;  
    }
    struct YearGrade{
        SubGrade[] subGrades;
        string startYear;
        SemesterType semester;
    }

    struct SubRecord{
        string name;
        string fileHash;
        string yearMonth;
    }
    struct YearRecord{
        SubRecord[] subRecords;
        string year;
    }

    struct Cert{
        CertType cType;
        string cName;
        string cFileHash;
    }

    mapping(uint => YearGrade[]) yearGradesMap;
    mapping(uint => YearRecord[]) yearRecordsMap;
    mapping(uint => Cert[]) certsMap;  // ok 
    mapping(uint => bool) isExisted;

    function getStuGrades(uint stuId) external constant returns(string){
        if(!stuExist(stuId)){
            string memory nullStr = "";
            return nullStr;
        }
        return stringStuGrades(stuId);
    }    

    function getStuRecords(uint stuId) external constant returns(string){
        var btemp = stuExist(stuId);
        if(btemp == false){
            string memory nullStr = "";
            return nullStr;
        }
        return stringStuRecords(stuId);
    }

    function verifyCert(uint stuId, string hashCert) external constant returns(bool){
        var btemp = stuExist(stuId);
        if(btemp == false){
            return false;
        }
        Cert[] memory certs = certsMap[stuId];
        for(var i = 0; i < certs.length; i++){
            if(stringCompare(certs[i].cFileHash, hashCert)){
                return true;
            }
        }
        return false;
    }

    function strCertInfo(string memory certInfo, string[4] memory addStrList) internal returns (string) {
        var info = concat(certInfo, addStrList[0], addStrList[1], addStrList[2], addStrList[3]);
        return info;
    }

    function getInfoCert(uint stuId, string hashCert) external constant returns(string){
        var btemp = stuExist(stuId);
        if(btemp==false){
            string memory nullStr = "";
            return nullStr;
        }
        Cert[] memory certs = certsMap[stuId];
        string memory certInfo = "";
        string memory ctype;
        string memory cName;
        string memory plusStr = "+";
        for(var i = 0; i < certs.length; i++){
            if(stringCompare(certs[i].cFileHash, hashCert)){
                ctype = certTypeToStr(certs[i].cType);
                string[4] memory addStrList = [ctype, cName, plusStr, hashCert];
                certInfo = strCertInfo(certInfo, addStrList);
                return certInfo;
            }
        }
        string memory nullStr1 = "";

        return nullStr1;
    }

    function activeStu(uint stuId) public {
        LibEthLog.INFO().append("[StuManager]activeStu").append(stuId).commit();
        isExisted[stuId] = true;
    }

    function allowAddSubGrade(uint stuId, SemesterType semester) internal returns(bool){
        if(stuExist(stuId) == false){
            return false;
        }
        LibEthLog.INFO().append("[StuManager]allowAddSubGrade semester:").append(uint(semester)).commit();
        if (semester != SemesterType.Fir && semester != SemesterType.Sec) {
            LibEthLog.INFO().append("[StuManager]allowAddSubGrade WTFFF 0,1:")
            .append(uint(SemesterType.Fir))
            .append(uint(SemesterType.Sec)).commit();
            return false;
        }

        return true;
    }

    function addSubGrade(uint stuId, string year, string semester, string name, string grade) public returns (bool) {
        LibEthLog.INFO().append("[StuManager]addSubGrade").commit();

        SemesterType semesterType = strToSemType(semester);
        if(!allowAddSubGrade(stuId, semesterType)){
            return false;
        }
        LibEthLog.INFO().append("[StuManager]addSubGrade 222").commit();

        var yearGrades = yearGradesMap[stuId];
        SubGrade memory subGrade = SubGrade(name, grade);
        for(var i = 0; i < yearGrades.length; i++){
            var yearGrade = yearGrades[i];
            // find old grade list for this year and semester
            if(stringCompare(yearGrade.startYear, year) && yearGrade.semester == semesterType) {
                yearGradesMap[stuId][i].subGrades.push(subGrade);
                return true;
            } 
        }
        // new grade item
        yearGradesMap[stuId].length++;
        var len = yearGradesMap[stuId].length;
        YearGrade storage p = yearGradesMap[stuId][len - 1];
        p.startYear = year;
        p.semester = semesterType;
        p.subGrades.push(subGrade);
        
        return true;
    }

    function addRecord(uint stuId, string year, string name, string fileHash, string yearMonth) public returns (bool) {
        LibEthLog.INFO().append("[StuManager]addRecord").commit();
        if(stuExist(stuId) == false){
            return false;
        }
        // TODO 年份检查
        var yearRecordList = yearRecordsMap[stuId];
        // create new record
        SubRecord memory record = SubRecord(name, fileHash, yearMonth);
        for(var i = 0; i < yearRecordList.length; i++) {
            var yearRecord = yearRecordList[i];
            // lookup old record list for this year
            if(stringCompare(yearRecord.year, year)) {
                yearRecordsMap[stuId][i].subRecords.push(record);
                return true;
            }
        }

        yearRecordsMap[stuId].length++;
        var len = yearRecordsMap[stuId].length;
        YearRecord storage yearRecordPoint = yearRecordsMap[stuId][len - 1];
        yearRecordPoint.year = year;
        yearRecordPoint.subRecords.push(record);
        return true;
    }

    function addCert(uint stuId, string certType, string cName, string cFileHash) public returns (bool) {
        LibEthLog.INFO().append("[StuManager]addCert").commit();
        if(stuExist(stuId) == false){
            return false;
        }
        CertType cType = strToCertType(certType);
        if (cType == CertType.Err) {
            return false;
        }

        Cert memory cert = Cert(cType, cName, cFileHash);
        var certList = certsMap[stuId];
        for (var i = 0; i < certList.length; i++) {
            var oldCert = certList[i];
            if (oldCert.cType == cert.cType
                && stringCompare(oldCert.cName, cert.cName)
                && stringCompare(oldCert.cFileHash, cert.cFileHash)) {
                // this cert is exist
                return false;
            }
        }
        // insert new cert
        certList.push(cert);
        return true;
    }

    function modifySubGrade(uint stuId, string year, string semester, string name, string grade) public returns (bool) {
        LibEthLog.INFO().append("[StuManager]modifySubGrade").commit();
        if(stuExist(stuId) == false){
            return false;
        }

        SemesterType semesterType = strToSemType(semester);

        var yearGrades = yearGradesMap[stuId];
        for(var i = 0; i < yearGrades.length; i++){
            var yearGrade = yearGrades[i];
            // find old grade list for this year and semester
            if(stringCompare(yearGrade.startYear, year) && yearGrade.semester == semesterType ) {
                var subGradeList = yearGrade.subGrades;
                for (var j = 0; j < subGradeList.length; j++) {
                    var subGrade = subGradeList[j];
                    if (stringCompare(subGrade.name, name)) {
                        subGrade.grade = grade;
                        return true;
                    }
                }
            } 
        }
        return false;
    }

    function modifyRecord(uint stuId, string year, string name, string fileHash, string yearMonth) public returns (bool) {
        LibEthLog.INFO().append("[StuManager]modifyRecord").commit();
        if(stuExist(stuId) == false){
            return false;
        }
        var yearRecordList = yearRecordsMap[stuId];
        // create new record
        for(var i = 0; i < yearRecordList.length; i++) {
            var yearRecord = yearRecordList[i];
            // lookup old record list for this year
            if(stringCompare(yearRecord.year, year)) {
                var subRecordsList = yearRecord.subRecords;
                for (var j = 0; j < subRecordsList.length; j++ ) {
                    var subRecord = subRecordsList[j];
                    if (stringCompare(subRecord.name, name)) {
                        subRecord.fileHash = fileHash;
                        subRecord.yearMonth = yearMonth;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function updateCert(uint stuId, string certType, string cName, string cFileHash) public returns (bool)  {
        LibEthLog.INFO().append("[StuManager]updateCert").commit();
        if(stuExist(stuId) == false){
            return false;
        }
        CertType cType = strToCertType(certType);
        if (cType == CertType.Err) {
            return false;
        }
        var certList = certsMap[stuId];
        for (var i = 0; i < certList.length; i++) {
            var oldCert = certList[i];
            if (oldCert.cType == cType && stringCompare(oldCert.cName, cName)) {
                oldCert.cFileHash = cFileHash;
                return true;
            }
        }
        return false;
    }

    function stuExist(uint stuId) public constant returns(bool){
        var ret = isExisted[stuId];
        if (ret) {
            LibEthLog.INFO().append("[StuManager]stuExist exist!").commit();
        } else {
            LibEthLog.INFO().append("[StuManager]stuExist not exist!").commit();
        }
        return ret;  
    }

    function stringCompare(string _a, string _b) internal returns(bool){
        bytes memory a = bytes(_a);
        bytes memory b = bytes(_b);

        if(a.length!=b.length){
            return false;
        }
        for(uint i = 0; i < a.length; i++){
            if(a[i]!=b[i]){
                return false;
            }
        }
        return true;
    }

    function certTypeToStr(CertType cType) internal returns(string){
        string memory temp;
        if(cType==CertType.GradeSheet){
            return gradeSheetStr;
        }
        if(cType==CertType.WholeCV){
            return wholeCVStr;
        }
        if(cType==CertType.PartCV){
            return partCVStr;
        }
        temp = err;
        return temp;
    }

    function strToCertType(string cType) internal returns(CertType) {
        if (stringCompare(cType, gradeSheetStr)) {
            return CertType.GradeSheet;
        }
        if (stringCompare(cType, wholeCVStr)) {
            return CertType.WholeCV;
        }
        if (stringCompare(cType, partCVStr)) {
            return CertType.PartCV;
        }
        return CertType.Err;
    }

    function strToSemType(string sem) internal returns(SemesterType){
        string memory str1 = "1";
        string memory str2 = "2";
        if(stringCompare(str1,sem)){
            return SemesterType.Fir;
        }
        if(stringCompare(str2,sem)){
            return SemesterType.Sec;
        }
        return SemesterType.None;
    }

    function stringSemGrades(string grades, YearGrade subYearGrade) internal returns(string){
        string memory yearStr = "year";
        string memory semesterStr = "&semester";
        string memory splitSemesterStr = ":";
        string memory startYear = subYearGrade.startYear;
        string memory semester;
        if (subYearGrade.semester == SemesterType.Fir) {
            semester = "1";
        } else {
            semester = "2";
        }

        LibEthLog.INFO().append("[StuManager]stringSemGrades semester:").append(semester).commit();

        var first_str = concat(yearStr, startYear, semesterStr, semester, splitSemesterStr);
        return concat(grades, first_str, "", "", "");
    }

    function stringSubGrades(string memory grades,SubGrade memory subGrade) internal returns(string){
        string memory equalStr = "=";
        string memory splitSubStr = ";";
        string memory name = subGrade.name;
        string memory grade = subGrade.grade;
        return concat(grades, name, equalStr, grade, splitSubStr);
    }

    function stringStuGrades(uint stuId) internal returns(string){
        string memory grades;
        string memory concatSemStr = "+";

        var yearGradesList = yearGradesMap[stuId];

        for(uint i = 0; i < yearGradesList.length; i++){
            grades = stringSemGrades(grades, yearGradesList[i]);
            var subGrades = yearGradesList[i].subGrades;
            for(uint j = 0; j < subGrades.length; j++){
                grades = stringSubGrades(grades, subGrades[j]);
            }
  
            grades = concat(grades, concatSemStr, "", "", "");
        }
        LibEthLog.INFO().append("[StuManager]stringStuGrades grades:").append(grades).commit();

        return grades;
    }

    function stringSemRecords(string memory records,YearRecord subYearRecord) internal returns(string){
        string memory splitYearStr=":";
        string memory yearStr="year";
        string memory year=subYearRecord.year;
        return concat(records, year, yearStr,splitYearStr, "");
    }

    function stringSubRecords(string memory records, SubRecord subRecord) internal returns(string){
        string memory yearMonth= subRecord.yearMonth;
        string memory name=subRecord.name;
        string memory fileHash=subRecord.fileHash;
        string memory colonStr="|";
        string memory splitStr=";";
        string memory plusStr="+";
        var tmp = concat(yearMonth,colonStr,name,plusStr,fileHash);
        return concat(records, tmp, splitStr, "", "");
    }

    function stringStuRecords(uint stuId) internal returns(string){
        string memory records;
        string memory concatSemStr = "+";

        var yearRecordsList = yearRecordsMap[stuId];
        for(uint i = 0; i < yearRecordsList.length; i++){
            records = stringSemRecords(records, yearRecordsList[i]);

            LibEthLog.INFO().append("[StuManager]stringStuRecords:").append(records).commit();

            var subRecords = yearRecordsList[i].subRecords;
            for(uint j = 0; j < subRecords.length;j++){
                records = stringSubRecords(records,subRecords[j]);
            }
            records = concat(records,concatSemStr, "", "", "");

            LibEthLog.INFO().append("[StuManager]stringStuRecords second:").append(records).commit();
        }
        LibEthLog.INFO().append("[StuManager]stringStuRecords final:").append(records).commit();
        return records;
    }

    function concat(string _a, string _b, string _c, string _d, string _e) internal returns (string){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }
}