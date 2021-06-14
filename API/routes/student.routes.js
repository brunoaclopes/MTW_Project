const dboperations = require('../controllers/student.controller');

module.exports = function(router){

    router.route('/students').get((request,response)=>{
        dboperations.getStudents().then(result => {
            response.json(result[0]);
        })
    })

    router.route('/student/:id').get((request,response)=>{
        dboperations.getStudent(request.params.id).then(result => {
            response.json(result[0]);
        })
    })

    router.route('/student').post((request,response)=>{
        let student = {...request.body}
        dboperations.addStudent(student).then(result => {
            response.status(201).json(result);
        })
    })

    router.route('/studentClass').post((request,response)=>{
        let student = {...request.body}
        dboperations.addStudentClass(student).then(result => {
            response.status(201).json(result);
        })
    })

    router.route('/studentClass/:studentId/:turmaId/:cursoId/:anoLetivoId').delete((request,response)=>{
        dboperations.removeStudentClass(request.params.studentId, request.params.turmaId, request.params.cursoId, request.params.anoLetivoId).then(result => {
            response.status(204);
        })
    })
}
