
const config = require('../dbconfig');
const sql = require('mssql');

async function getLessons(){
    try {
        let pool = await sql.connect(config);
        let lessons = await pool.request().query("select * from Aula");
        return lessons.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getLesson(lessonId){
    try {
        let pool = await sql.connect(config);
        let lesson = await pool.request().input('input_parameter', sql.Int, lessonId).query("select * from Aula where Id = @input_parameter");
        return lesson.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addLesson(lesson) {
    try {
        let pool = await sql.connect(config);
        let insertLesson = await pool.request()
            .query("INSERT INTO Aula VALUES ('" + lesson.DiaHora + "')");
        return insertLesson.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function editLesson(lesson) {
    try {
        let pool = await sql.connect(config);
        let editLesson = await pool.request()
            .query("UPDATE Aula SET DiaHora='" + lesson.DiaHora + "' where Id = " + lesson.Id);
        return editLesson.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function removeLesson(lessonId){
    try {
        let pool = await sql.connect(config);
        let lesson = await pool.request().input('input_parameter', sql.Int, lessonId).query("remove from Aula where Id = @input_parameter");
        return lesson.recordsets;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    removeLesson : removeLesson,
    editLesson : editLesson,
    addLesson : addLesson,
    getLesson : getLesson,
    getLessons : getLessons
}
