const dboperations = require('../controllers/class.controller');

module.exports = function(router){

    router.route('/classes').get((request,response)=>{
        dboperations.getClasses().then(result => {
            response.json(result[0]);
        })
    })

    router.route('/class/:id').get((request,response)=>{
        dboperations.getClass(request.params.id).then(result => {
            response.json(result[0]);
        })
    })

    router.route('/class').post((request,response)=>{
        let Class = {...request.body}
        dboperations.addClass(Class).then(result => {
            response.status(201).json(result);
        })
    })
}
