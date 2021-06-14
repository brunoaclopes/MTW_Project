
const config = require('../dbconfig');
const sql = require('mssql');

async function getSchoolYears(){
    try {
        let pool = await sql.connect(config);
        let schoolYears = await pool.request().query("select * from AnoLetivo");
        return schoolYears.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getSchoolYear(schoolYearId){
    try {
        let pool = await sql.connect(config);
        let schoolYear = await pool.request().input('input_parameter', sql.Int, schoolYearId).query("select * from AnoLetivo where Id = @input_parameter");
        return schoolYear.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addSchoolYear(schoolYear) {
    try {
        let pool = await sql.connect(config);
        let insertSchoolYear = await pool.request()
            .query("INSERT INTO AnoLetivo VALUES ('" + schoolYear.Anos + "')");
        return insertSchoolYear.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    getSchoolYears : getSchoolYears,
    getSchoolYear : getSchoolYear,
    addSchoolYear : addSchoolYear
}
