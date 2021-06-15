
const config = require('../dbconfig');
const sql = require('mssql');

async function getEvaluations(){
    try {
        let pool = await sql.connect(config);
        let evaluations = await pool.request().query("select * from CompAvaliacao");
        return evaluations.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getStudentsEvaluations(){
    try {
        let pool = await sql.connect(config);
        let evaluations = await pool.request().query("select * from Notas");
        return evaluations.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getStudentEvaluations(studentId){
    try {
        let pool = await sql.connect(config);
        let evaluations = await pool.request().input('input_parameter', sql.Int, studentId)
            .query("SELECT Avaliacao, Nome FROM AulaAluno INNER JOIN ComponenteAvaliacao ON " +
                "AulaAluno.ComponenteId = ComponenteAvaliacao.Id WHERE AulaAluno.AlunoId = @input_parameter");
        return evaluations.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getEvaluation(evaluationId){
    try {
        let pool = await sql.connect(config);
        let evaluations = await pool.request().input('input_parameter', sql.Int, evaluationId).query("select * from ComponenteAvaliacao where Id = @input_parameter");
        return evaluations.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addEvaluation(evaluation) {
    try {
        let pool = await sql.connect(config);
        let insertEvaluation = await pool.request()
            .query("INSERT INTO ComponenteAvaliacao VALUES ('" + evaluation.Nome + "', " + evaluation.EvaluationId + ")");
        return insertEvaluation.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function addStudentEvaluation(studentEvaluation, id) {
    try {
        let pool = await sql.connect(config);
        let insertEvaluation = await pool.request()
            .query("INSERT INTO Nota VALUES (" + studentEvaluation.StudentId + ", " +
                id + ", " + studentEvaluation.Nota + ")");
        return insertEvaluation.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function editEvaluation(evaluation, id) {
    try {
        let pool = await sql.connect(config);
        let updateEvaluation = await pool.request()
            .query("UPDATE ComponenteAvaliacao SET Nome = '" + evaluation.Nome + "', DisciplinaId = " + evaluation.EvaluationId + " WHERE Id = " + id);
        return updateEvaluation.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function editStudentEvaluation(studentEvaluation) {
    try {
        let pool = await sql.connect(config);
        let updateEvaluation = await pool.request()
            .query("UPDATE AulaAluno SET Avaliacao = " + studentEvaluation.Avaliacao + " WHERE  AulaId = " +
                studentEvaluation.AulaId + " AND AlunoId = " +
                studentEvaluation.AlunoId + " AND ComponenteId = " + studentEvaluation.ComponenteId);
        return updateEvaluation.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function removeEvaluation(evaluationId) {
    try {
        let pool = await sql.connect(config);
        let removeEvaluation = await pool.request()
            .query("DELETE FROM ComponenteAvaliacao WHERE Id = " + evaluationId);
        return removeEvaluation.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function removeStudentEvaluation(alunoId, componenteId) {
    try {
        let pool = await sql.connect(config);
        let removeEvaluation = await pool.request()
            .query("DELETE FROM Nota WHERE AlunoId = " + alunoId +
                " AND AvaliacaoId = " + componenteId);
        return removeEvaluation.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    getEvaluations : getEvaluations,
    getEvaluation : getEvaluation,
    addEvaluation : addEvaluation,
    editEvaluation : editEvaluation,
    removeEvaluation : removeEvaluation,
    getStudentEvaluations : getStudentEvaluations,
    editStudentEvaluation : editStudentEvaluation,
    removeStudentEvaluation : removeStudentEvaluation,
    addStudentEvaluation : addStudentEvaluation,
    getStudentsEvaluations : getStudentsEvaluations
}
