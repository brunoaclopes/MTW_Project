const dboperations = require('../controllers/lesson.controller');

module.exports = function(router){

    router.route('/lessons').get((request,response)=>{
        dboperations.getLessons().then(result => {
            response.json(result[0]);
        })
    })

    router.route('/lesson/:id').get((request,response)=>{
        dboperations.getLesson(request.params.id).then(result => {
            response.json(result[0]);
        })
    })

    router.route('/lesson').post((request,response)=>{
        let lesson = {...request.body}
        dboperations.addLesson(lesson).then(result => {
            response.status(201).json(result);
        })
    })

    router.route('/lesson').put((request,response)=>{
        let lesson = {...request.body}
        dboperations.editLesson(lesson).then(result => {
            response.status(200).json(result);
        })
    })

    router.route('/lesson/:id').delete((request,response)=>{
        dboperations.removeLesson(request.params.id).then(result => {
            response.status(204);
        })
    })
}
