const model = require('../../../models/commission/backend/commission');
const helpers = require('../../../helpers/helpers');

//Handler to handle route for setting admin commission rate
let addCommission = function (req, res) {

    ///////////////////////Validations//////////////////
    /////////////Type Validations/////////////////
    //Check if type of flat_commission_rate is not a number
    if (typeof req.body.flat_comission_rate !== 'number') {
        return res.status(422).json({
            response: false,
            message: "flat_comission_rate is required as a number"
        });
    }

    //After every validations add commission rate in the database
    model.addCommission(req.body.flat_comission_rate, function (err, addCommissionResponse) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "not able to proccess query at addCommission" + err
            });
        }
        if (addCommissionResponse.affectedRows) {
            return res.status(200).json({
                response: true,
                message: "commission rate added responsefully",
                commissionId: addCommissionResponse.insertId
            });
        } else {
            return res.status(500).json({
                response: false,
                message: "Something went wrong, failed to add commission rate.",
                commissionId: addCommissionResponse.insertId
            });
        }
    });
}

//Handler to handle the route for updating commission rate for admin
let updateCommission = function (req, res) {
    ///////////////////////Validations//////////////////

    /////////////Type Validations/////////////////
    //Check if type of flat_commission_rate is not a number
    if (typeof req.body.flat_comission_rate !== 'number') {
        return res.status(422).json({
            response: false,
            message: "flat_comission_rate is required as a number."
        });
    }
    //After every validations update commission rate in the database
    model.commissionRecordExists(req.params.commissionId, function (err, recordExistsResponse) {
        if (err) {
            return res.status(500).json({
                response: false,
                message: "not able to proccess query at commissionRecordExists " + err
            });
        }
        if (recordExistsResponse.length) {
            model.updateCommission(req.body.flat_comission_rate, req.params.commissionId, function (err, updateCommissionResponse) {
                if (err) {
                    return res.status(500).json({
                        response: false,
                        message: "not able to proccess query at updateCommission " + err
                    });
                }
                if(updateCommissionResponse.affectedRows) {
                    return res.status(200).json({
                        response: true,
                        message: "Commission rate update successfully"
                    });
                } else {
                    return res.status(500).json({
                        response: false,
                        message: "not able to update commission rate"
                    });
                }
            });
        } else {
            return res.status(404).json({
                response: false,
                message: "no commission record found with commissionId: " + req.params.commissionId
            });
        }
    });

}

module.exports = {
    addCommission,
    updateCommission
}