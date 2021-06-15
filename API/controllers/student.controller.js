const config = require('../dbconfig');
const sql = require('mssql');

async function getStudents(){
    try {
        let pool = await sql.connect(config);
        let students = await pool.request().query("SELECT * FROM Students");
        return students.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getStudent(studentId){
    try {
        let pool = await sql.connect(config);
        let students = await pool.request().input('input_parameter', sql.Int, studentId).query("select * from Aluno where Id = @input_parameter");
        return students.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addStudent(student) {
    try {
        let pool = await sql.connect(config);
        let insertStudent = await pool.request()
            .query("INSERT INTO Aluno VALUES ('" + student.Nome + "', '" + student.DataNascimento + "')");
        return insertStudent.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function addStudentClass(studentLesson) {
    try {
        let pool = await sql.connect(config);
        let insertStudent = await pool.request()
            .query("INSERT INTO AlunoTurma VALUES (" + studentLesson.StudentId +
                ", " + studentLesson.ClassId + ")");
        return insertStudent.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function editStudent(student, id) {
    try {
        let pool = await sql.connect(config);
        let insertStudent = await pool.request()
            .query("UPDATE Aluno SET Nome = '" + student.Nome + "', DataNascimento = '" + student.DataNascimento + "' WHERE Id=" + id);
        return insertStudent.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function removeStudentClass(studentId, turmaId, cursoId, anoLetivoId) {
    try {
        let pool = await sql.connect(config);
        let removeStudent = await pool.request()
            .query("DELETE FROM ComponenteAvaliacao WHERE AnoLetivoId = " + anoLetivoId + " AND CursoId = " +
                cursoId + " AND TurmaId = turmaId" + " AND AlunoId = " + studentId);
        return removeStudent.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    getStudents : getStudents,
    getStudent : getStudent,
    addStudent : addStudent,
    addStudentClass : addStudentClass,
    editStudent: editStudent,
    removeStudentClass : removeStudentClass
}
