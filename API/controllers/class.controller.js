
const config = require('../dbconfig');
const sql = require('mssql');

async function getClasses(){
    try {
        let pool = await sql.connect(config);
        let classes = await pool.request().query("select * from classes");
        return classes.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getClass(classId){
    try {
        let pool = await sql.connect(config);
        let classes = await pool.request().input('input_parameter', sql.Int, classId).query("select * from Turma where Id = @input_parameter");
        return classes.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addClass(Class) {
    try {
        let pool = await sql.connect(config);
        let teste = "INSERT INTO Turma VALUES (" + Class.YearId + ", " + Class.CourseId + ", '" + Class.Nome + "')"
        let insertClass = await pool.request()
            .query(teste);
        return insertClass.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    getClasses : getClasses,
    getClass : getClass,
    addClass : addClass
}
