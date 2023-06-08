const Reservation=require('../model/reservation')
const { format,parseISO  } = require('date-fns');
const dateToday=require('../middlewares/dateToday')
const Insurence = require('../model/insurance');
const Hall =require("../model/hall")
const Resort =require("../model/resort")
const Chalet =require("../model/chalet")
const Rating=require('../model/rating')

const reservation={
    postUserUnconfirmedReservation:async (req,res)=>{
        try {
            let {image,clientId,clientName,startDate,endDate,periodType,dayPeriod,cost,entityId,entityName}=req.body
            let check=await Reservation.find({ "client.id": clientId,"client.name":clientName, status: 'unConfirmed' ,'entity.id':entityId})
            if(check.length!=0) return res.status(403).send("You have reserved this entity")
            if(startDate) startDate= format(parseISO(startDate) ,'yyyy-MM-dd')
            if(endDate) endDate= format(parseISO(endDate),'yyyy-MM-dd')
            const reserve=new Reservation({
                client:{name:clientName,id:clientId},
                entity:{name:entityName,id:entityId},
                finance:{cost},
                period:{type:periodType,startDate,endDate,dayPeriod},
                status:'unConfirmed',
                date:dateToday(),
                image
            })
             await reserve.save()
            .then(()=>res.send('Done'))
            .catch((e)=>{
                console.log(e.message);
                res.status(400).send({error:e.message})
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    },
    getUserReservations: async (req, res) => {
        try {
            const { id } = req.params;
            const reservations = await Reservation.find({ "client.id": id, status: 'unConfirmed' });
            res.send(reservations);
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message);
        }
    },
    getAllReservations:async (req,res)=>{
        try {
            let reservations=await Reservation.find({})
            res.send(reservations)
        } catch (error) {
            console.log(error.message);
            res.status(500).send({eror:error.message})
        }
    },
    updateAdminReservation:async (req,res)=>{
        try {
            let {clientName,startDate,endDate,cost,entityId,dayPeriod,_id,entityName}=req.body
           await Reservation.findByIdAndUpdate(_id,
                {
                    "client.name":clientName,
                    "entity.name":entityName,
                    "entity.id":entityId,
                    "finance.cost":cost,
                    "period.startDate":startDate,
                    "period.endDate":endDate,
                    "period.dayPeriod":dayPeriod,
                })
                .then(()=>res.send("done"))
                .catch((error)=>{
                    console.log(error.message);
                    res.status(500).send({error:error.message})
                })
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    deleteAdminReservation:async (req,res)=>{
        try {
            let {id}=req.params
            await Reservation.findByIdAndUpdate(id,{status:"canceled",cancelRequest:false})
            .then(()=>res.send())
            .catch((error)=>{
                console.log(error.message);
                res.status(500).send({error:error.message})
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    confirmOrder:async(req,res)=>{
        try {
            let {_id}=req.body
            await Reservation.findByIdAndUpdate(_id,{status:"confirmed"})
            .then(()=>res.send())
            .catch((error)=>{
                console.log(error.message);
                res.status(500).send({error:error.message})
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)
        }
    },
    postConfirmedReservations:async(req,res)=>{
        try {
            let {clientName,entityId,entityName,startDate,endDate,cost,dayPeriod,tax,paid,insurance,contractNumber}=req.body
           console.log(req.body);
            let newOne= new Reservation({
                client:{name:clientName},
                entity:{name:entityName,id:entityId},
                finance:{cost,paid,tax,remain:paid-tax ,insurance:{amount:insurance.amount}},
                period:{startDate,endDate,dayPeriod},
                status:"confirmed",
                contractNumber,
                date:dateToday(),
                employee:req.user.name
            })
            await newOne.save()
            .then(()=>res.send())
            .catch((err)=>{throw new Error(err.message)})
        } catch (error) {
            console.log(error.message);
            res.status(400).send({error:error.message})
        }
    },
    getConfirmedReservatioms:async (req,res)=>{
        try {
            let reservations= await Reservation.find({status:"confirmed"})
            res.send(reservations)
        } catch (error) {
            console.log(error.message);
            res.status(400).send({error:error.message})
        }
    },
    updateConfirmedReservation:async(req,res)=>{
        try {
            let {clientName,entityId,entityName,cost,tax,paid,insurance,contractNumber}=req.body
           await Reservation.findByIdAndUpdate(req.body._id,{
                client:{name:clientName},
                entity:{name:entityName,id:entityId},
                finance:{cost,paid,tax,remain:paid-tax ,insurance:{amount:insurance.amount}},
                contractNumber,
                employee:req.user.name
            }).then(()=>res.send())
            .catch((err)=>{throw new Error(err.message)})
        } catch (error) {
            console.log(error.message);
            res.status(400).send({error:error.message})
        }
    },
    updateInsurance:async(req,res,next)=>{
        try {
       
            next()
        } catch (error) {
            console.log(error);
            res.status(400).send({error:error.message})
        }
    },

    retriveInsurance:async(req,res)=>{
        try {
            let {id}=req.body
            await Reservation.findByIdAndUpdate(id,{"finance.insurance.restored":true})
            .then(()=>res.send())
            .catch(()=>{
                console.log(error);
                res.status(400).send({error:error.message})
            })
        } catch (error) {
            console.log(error);
            res.status(400).send({error:error.message})
        }
    },
    insuranceFinance:async (req,res)=>{
        try {
            let {_id,damage,insurance}=req.body
            await Insurence.findByIdAndUpdate(_id,{"finance.damage":damage,"finance.insurance":insurance,'finance.remain':insurance-damage})
            .then(()=>res.send())
            .catch(()=>{
                console.log(error);
                res.status(400).send({error:error.message})
            })
        } catch (error) {
            console.log(error);
            res.status(400).send({error:error.message})
        }
    },
    deferreReservation:async(req,res)=>{
        try {
            let {_id,startDate,endDate,dayPeriod}=req.body
            await Reservation.findByIdAndUpdate(_id,{
                'period.startDate':startDate,
                'period.endDate':endDate,
                'period.dayPeriod':dayPeriod,
                deferred:true
            }).then(()=>res.send())
            .catch((error)=>{
                console.log(error.message);
                res.status(400).send({error:error.message})
            })
        } catch (error) {
            console.log(error.message);
            res.status(400).send({error:error.message})
        }
    },
    completeReservation:async(req,res)=>{
        try {
            await Reservation.findByIdAndUpdate(req.body._id,{completed:true})
            .then(()=>res.send())
            .catch((error)=>{
                console.log(error.message);
                res.status(400).send({error:error.message})
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    rateReservation:async(req,res)=>{
        try {
            let data=req.body
            await Reservation.findByIdAndUpdate(data._id,{rated:true})
            let rate=new Rating({
                clientName:data.client.name,
                entityName:data.entity.name,
                date:dateToday(),
                rate:data.rate,
                note:data.note
            })
            await rate.save()
            .then(()=>res.send())
            .catch((error)=>{
                console.log(error.message);
                res.status(400).send({error:error.message})
            })
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    },
    postEntityRate: async (req, res, next) => {
        try {
          const { type, rate } = req.body;
          let model;
          switch (type) {
            case 'hall':
              model = Hall;
              break;
            case 'chalet':
              model = Chalet;
              break;
            case 'resort':
              model = Resort;
              break;
            default:
              throw new Error('Invalid type');
          }
          const entity = await model.findById(req.body.entity.id);
          if (!entity)  throw new Error('Entity not found');
          entity.rate.push(rate);
          await entity.save()
          next()
        } catch (error) {
          console.log(error.message);
          res.status(500).send({ error: error.message });
        }
      },
    getRates: async (req,res)=>{
        try {
            let rates= await Rating.find({})
            res.send(rates)
        } catch (error) {
            console.log(error.message);
            res.status(500).send({error:error.message})
        }
    }
      
}

module.exports =reservation