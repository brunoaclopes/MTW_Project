
const config = require('../dbconfig');
const sql = require('mssql');

async function getSubjects(){
    try {
        let pool = await sql.connect(config);
        let subjects = await pool.request().query("select * from Subjects");
        return subjects.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getSubject(subjectId){
    try {
        let pool = await sql.connect(config);
        let subject = await pool.request().input('input_parameter', sql.Int, subjectId)
            .query("select * from Disciplina where Id = @input_parameter");
        return subject.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addSubject(subject) {
    try {
        let pool = await sql.connect(config);
        let insertClass = await pool.request()
            .query("INSERT INTO Disciplina VALUES ('" + subject.Nome + "', " + subject.CourseId + ")");
        return insertClass.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function editSubject(subject, id) {
    try {
        let pool = await sql.connect(config);
        let insertSubject = await pool.request()
            .query("UPDATE Disciplina SET Nome = '" + subject.Nome + "', CursoId = " + subject.CourseId + " WHERE Id=" + id);
        return insertSubject.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    getSubjects : getSubjects,
    getSubject : getSubject,
    addSubject : addSubject,
    editSubject : editSubject
}
