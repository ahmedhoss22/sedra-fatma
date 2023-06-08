const validator = require('validator');

const chaletValidation = (name,area,address,bath,lounge,price,sleeping,images,kitchen) => {
    let errors={}
    if (validator.isEmpty(name))errors.name = 'Name is required';
    if (validator.isEmpty(area))errors.area = 'area is required';
    if (validator.isEmpty(address))errors.address = 'address is required';
    if (validator.isEmpty(bath))errors.name = 'bath is required';
    if (validator.isEmpty(lounge))errors.lounge = 'lounge is required';
    if (validator.isEmpty(price))errors.price = 'price is required';
    if (validator.isEmpty(sleeping))errors.sleeping = 'sleeping is required';
    if (validator.isEmpty(kitchen))errors.kitchen = 'kitchen is required';
    if (images.length==0)errors.images = 'images is required';
    return {errors,isValid: Object.keys(errors).length === 0,};
}

module.exports=chaletValidation