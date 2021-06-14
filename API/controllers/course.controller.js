
const config = require('../dbconfig');
const sql = require('mssql');

async function getCourses(){
    try {
        let pool = await sql.connect(config);
        let courses = await pool.request().query("select * from Curso");
        return courses.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getCourse(courseId){
    try {
        let pool = await sql.connect(config);
        let course = await pool.request().input('input_parameter', sql.Int, courseId).query("select * from Curso where Id = @input_parameter");
        return course.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function addCourse(course) {
    try {
        let pool = await sql.connect(config);
        let insertCourse = await pool.request()
            .query("INSERT INTO Curso VALUES ('" + course + "')");
        return insertCourse.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}


module.exports = {
    getCourses : getCourses,
    getCourse : getCourse,
    addCourse : addCourse
}
