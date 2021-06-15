const dboperations = require('../controllers/subject.controller');

module.exports = function(router){

    router.route('/subjects').get((request,response)=>{
        dboperations.getSubjects().then(result => {
            response.json(result[0]);
        })
    })

    router.route('/subject/:id').get((request,response)=>{
        dboperations.getSubject(request.params.id).then(result => {
            response.json(result[0]);
        })
    })

    router.route('/subject').post((request,response)=>{
        let course = {...request.body}
        dboperations.addSubject(course).then(result => {
            response.status(201).json(result);
        })
    })

    router.route('/subject/:id').put((request,response)=>{
        let course = {...request.body}
        dboperations.editSubject(course, request.params.id).then(result => {
            response.status(201).json(result);
        })
    })
}
