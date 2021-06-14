const dboperations = require('../controllers/schoolYear.controller');

module.exports = function(router){

    router.route('/schoolYears').get((request,response)=>{
        dboperations.getSchoolYears().then(result => {
            response.json(result[0]);
        })
    })

    router.route('/schoolYear/:id').get((request,response)=>{
        dboperations.getSchoolYear(request.params.id).then(result => {
            response.json(result[0]);
        })
    })

    router.route('/schoolYear').post((request,response)=>{
        let schoolYear = {...request.body}
        dboperations.addSchoolYear(schoolYear).then(result => {
            response.status(201).json(result);
        })
    })
}
