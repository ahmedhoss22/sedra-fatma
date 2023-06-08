const validator = require('validator');

const expensesValidation = (type,amount,billType,reciver) => {
    let errors={}
    if (validator.isEmpty(type))errors.type = 'Type is required';
    if (validator.isEmpty(amount))errors.amount = 'Amount is required';
    if (validator.isEmpty(billType))errors.bill = 'Bill type is required';
    if (validator.isEmpty(reciver))errors.reciver = 'Reciver Name is required';
    return {errors,isValid: Object.keys(errors).length === 0,};
}
const drawsValidation = (type,amount,) => {
    let errors={}
    if (validator.isEmpty(type))errors.type = 'Type is required';
    if (validator.isEmpty(amount))errors.amount = 'Amount is required';
    return {errors,isValid: Object.keys(errors).length === 0,};
}
const paypalValidation = (bank,amount,reviver,donater) => {
    let errors={}
    if (validator.isEmpty(bank))errors.bank = 'Bank is required';
    if (validator.isEmpty(amount))errors.amount = 'Amount is required';
    if (validator.isEmpty(reviver))errors.reciver = 'reviver is required';
    if (validator.isEmpty(donater))errors.area = 'donater is required';
    return {errors,isValid: Object.keys(errors).length === 0,};
}
module.exports={expensesValidation,drawsValidation,paypalValidation}