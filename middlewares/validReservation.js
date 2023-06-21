const Reservation = require("../model/reservation");

const validReservation={
    checkPeriod: async (req, res, nxt) => {
        try {
            return nxt()
            let { startDate, endDate, period, _id } = req.body;
            console.log(period);
            if (req.body._id) {
                let tempResrvation = await Reservation.findOne({ _id });
               // if (startDate == tempResrvation.period.startDate && endDate == tempResrvation.period.endDate) return nxt();
            }
            console.log(startDate, endDate);
            startDate = new Date(startDate).getTime();
            endDate = new Date(endDate).getTime();
            if (isNaN(startDate) || isNaN(endDate)) return res.status(403).send({ error: "Invalid date format" });
    
            const reservations = await Reservation.find({ status: 'confirmed', "entity.id": req.body.entity.id });
            let index = reservations.findIndex((ele) => ele._id == _id);
            reservations.splice(index, 1);
                let conflicted = false;
                console.log("ASdasd");
            reservations.forEach((ele) => {
                let tempStart = new Date(ele.period.startDate).getTime();
                let tempEnd = new Date(ele.period.endDate).getTime();
                let tempPeriod = ele.period.dayPeriod; // Define tempPeriod here
                console.log(tempPeriod,period.dayPeriod);
                if (tempStart <= endDate && tempEnd >= endDate && (tempPeriod == 'كامل اليوم' || tempPeriod == period.dayPeriod)) conflicted = true;  
                console.log(conflicted,1);
                if (tempStart <= startDate && tempEnd >= endDate && (tempPeriod == 'كامل اليوم' || tempPeriod == period.dayPeriod)) conflicted = true;
                console.log(conflicted,2);
                if (tempStart <= startDate && tempEnd >= startDate && (tempPeriod == 'كامل اليوم' || tempPeriod == period.dayPeriod)) conflicted = true;
                console.log(conflicted,3);
                if (tempStart >= startDate && tempEnd <= endDate && (tempPeriod == 'كامل اليوم' || tempPeriod == period.dayPeriod)) conflicted = true;
                console.log(conflicted,4);
                if (startDate == endDate && startDate == tempStart && endDate == tempEnd) {
                    if (tempPeriod == 'كامل اليوم') conflicted = true;
                    if (tempPeriod == period.dayPeriod) conflicted = true;
                }
            });
            
    
            if (conflicted) return res.status(400).send({ error: 'يوجد حجز في هذه الفترة' });
            nxt();
        } catch (error) {
            console.log(error.message);
            console.log("catch Valid");
            res.status(400).send({ error: error.message });
        }
    },
    
    confirmedCheckPeriod: async(req,res,nxt)=>{
        try {
            let {startDate,endDate,period,type,_id}=req.body
            if(req.body._id){
                let tempResrvation=await Reservation.findOne({_id})
                if((startDate==tempResrvation.period.startDate && endDate==tempResrvation.period.endDate))  return nxt()     
            }
            startDate=new Date(startDate).getTime()
            endDate=new Date(endDate).getTime()
            if (isNaN(startDate) || isNaN(endDate))return res.status(403).send({error: "Invalid date format"});
            const reservations=await Reservation.find({status:'confirmed',"entity.id":req.body.entityId})
            let index=reservations.findIndex((ele)=>ele._id==_id)
            reservations.splice(index,1)
            let conflicted=false
            reservations.map((ele)=>{
                let tempStart=new Date(ele.period.startDate).getTime()
                let tempEnd=new Date(ele.period.endDate).getTime()
                let tempPeriod = ele.period.dayPeriod; // Define tempPeriod here
                    if(tempStart <= endDate && tempEnd >= endDate)conflicted = true
                    if(tempStart <= startDate && tempEnd >= endDate)conflicted =true
                    if(tempStart <= startDate && tempEnd >= startDate)  conflicted =true
                    if(tempStart >= startDate && tempEnd <= endDate) conflicted =true
                    if (startDate ==endDate && tempPeriod && startDate==tempStart && endDate==tempEnd){
                        if(tempPeriod== 'كامل اليوم') conflicted =true
                        if(tempPeriod == period.dayPeriod)  conflicted = true
                    }
            })
            if(conflicted) return res.status(400).send({error:'يوجد حجز في هذه الفترة'})
            nxt()
        } catch (error) {
            console.log(error.message);
            console.log("catch Valid");
            res.status(400).send({error:error.message})
        }
    },

}
module.exports=validReservation