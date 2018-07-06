const model = require('../../../models/commission/backend/commissionrecords');
const helpers = require('../../../helpers/helpers');
const decode = require('jwt-decode');

//Handler to handle the route for adding a commission record
let addCommissionRecord = function (req, res) {
    ///////////////////////Validations//////////////////
    /////////////Type Validations/////////////////
    //Check if type of invoice_number is not a number
    if (typeof req.body.invoice_number !== 'number') {
        return res.status(422).json({
            response: false,
            message: "invoice_number is required as a number."
        });
    }

    //Check if type of fk_tbl_order_order_number is not a number
    if (typeof req.body.fk_tbl_order_order_number !== 'number') {
        return res.status(422).json({
            response: false,
            message: "fk_tbl_order_order_number is required as a number"
        });
    }

    //Check if type of amount is not a number
    if (typeof req.body.amount !== 'number') {
        return res.status(422).json({
            response: false,
            message: "amount is required a number"
        });
    }

    //Check if type of commission_deducted is not a number
    if (typeof req.body.commission_deducted !== 'number') {
        return res.status(422).json({
            response: false,
            message: "commission_deducted is required as a number"
        });
    }

    //After every validations add commission rate in the database
    model.orderExists(req.body.fk_tbl_order_order_number, function (err, orderExistsResponse) {
        if (err) {
            return res.status(422).json({
                response: false,
                message: "not able to proccess query at orderExists"
            });
        }
        if (orderExistsResponse.length) {
            model.isValidInvoice(req.body.fk_tbl_order_order_number, req.body.invoice_number, function (err, isValidInvoiceResponse) {
                if (err) {
                    return res.status(422).json({
                        response: false,
                        message: "not able to proccess query at isValidInvoiceResponse" + err
                    });
                }
                if (isValidInvoiceResponse.length) {
                    model.vendorExists(req.params.vendorId, function (err, vendorExistsResponse) {
                        if (err) {
                            return res.status(422).json({
                                response: false,
                                message: "not able to proccess query at vendorExists" + err
                            });
                        }
                        if (vendorExistsResponse.length) {

                            model.addCommissionRecord(req.body, req.params.vendorId, function (err, commissionRecordResponse) {
                                if (err) {
                                    return res.status(422).json({
                                        response: false,
                                        message: "not able to proccess query at addCommissionRecord" + err
                                    });
                                }
                                if (commissionRecordResponse.affectedRows) {
                                    return res.status(200).json({
                                        response: true,
                                        message: "Commission Record added successfully",
                                        commissionRecordId: commissionRecordResponse.insertId
                                    });
                                } else {
                                    return res.status(500).json({
                                        response: false,
                                        message: "not able to add commission record"
                                    });
                                }
                            });
                        } else {
                            return res.status(404).json({
                                response: false,
                                message: "vendor not found with id: " + req.params.vendorId
                            });
                        }
                    });
                } else {
                    return res.status(422).json({
                        response: false,
                        message: "Invoice number " +
                            req.body.invoice_number +
                            " is not related with orderId: " +
                            req.body.fk_tbl_order_order_number
                    });
                }
            });
        } else {
            return res.status(404).json({
                response: false,
                message: "no order found with Id: " + req.body.fk_tbl_order_order_number
            });
        }
    });
}

//Handler to handler the route to get commission records
let getCommissionRecords = function (req, res) {
    /////////////Type Validations/////////////////
    model.getCommissionRecord(req.params.vendorId, function (err, commissionRecordResponse) {
        if (err) {
            return res.status(422).json({
                response: false,
                message: "not able to proccess query at getCommissionRecord" + err
            });
        }
        if (commissionRecordResponse.length) {
            return res.status(200).json({
                response: true,
                message: "Commission record(s) found ",
                commissionRecords: commissionRecordResponse
            });
        } else {
            return res.status(404).json({
                response: false,
                message: "No Commission record(s) found with vendorId: " + req.params.vendorId
            });
        }
    });

}

module.exports = {
    addCommissionRecord,
    getCommissionRecords
}