const dboperations = require('../controllers/evaluation.controller');

module.exports = function(router){

    router.route('/evaluations').get((request,response)=>{
        dboperations.getEvaluations().then(result => {
            response.json(result[0]);
        })
    })

    router.route('/studentEvaluations').get((request,response)=>{
        dboperations.getStudentEvaluations().then(result => {
            response.json(result[0]);
        })
    })

    router.route('/evaluation/:id').get((request,response)=>{
        dboperations.getEvaluation(request.params.id).then(result => {
            response.json(result[0]);
        })
    })

    router.route('/evaluation').post((request,response)=>{
        let evaluation = {...request.body}
        dboperations.addEvaluation(evaluation).then(result => {
            response.status(201).json(result);
        })
    })

    router.route('/studentEvaluation').post((request,response)=>{
        let evaluation = {...request.body}
        dboperations.addStudentEvaluation(evaluation).then(result => {
            response.status(201).json(result);
        })
    })

    router.route('/evaluation').put((request,response)=>{
        let evaluation = {...request.body}
        dboperations.editEvaluation(evaluation).then(result => {
            response.status(200).json(result);
        })
    })

    router.route('/studentEvaluation').put((request,response)=>{
        let evaluation = {...request.body}
        dboperations.editStudentEvaluation(evaluation).then(result => {
            response.status(200).json(result);
        })
    })

    router.route('/evaluation/:id').delete((request,response)=>{
        dboperations.removeEvaluation(request.params.id).then(result => {
            response.status(204);
        })
    })

    router.route('/studentEvaluation/:aulaId/:alunoId/:componenteId').delete((request,response)=>{
        dboperations.removeStudentEvaluation(request.params.aulaId, request.params.alunoId, request.params.componenteId).then(result => {
            response.status(204);
        })
    })
}
