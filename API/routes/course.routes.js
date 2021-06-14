const dboperations = require('../controllers/course.controller');

module.exports = function(router){

    router.route('/courses').get((request,response)=>{
        dboperations.getCourses().then(result => {
            response.json(result[0]);
        })
    })

    router.route('/course/:id').get((request,response)=>{
        dboperations.getCourse(request.params.id).then(result => {
            response.json(result[0]);
        })
    })

    router.route('/course').post((request,response)=>{
        let course = {...request.body}
        dboperations.addCourse(course).then(result => {
            response.status(201).json(result);
        })
    })
}
