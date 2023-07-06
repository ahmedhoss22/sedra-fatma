const Reservation = require("../model/reservation");

const validReservation={
    checkPeriod: async (req, res, nxt) => {
        try {
            let { period,_id} = req.body;
            let startDate = new Date(period.startDate).getTime();
            let endDate = new Date(period.endDate).getTime();
            let dayPeriod=period.dayPeriod
            console.log(startDate,endDate);
            if (isNaN(startDate) && isNaN(endDate)) return res.status(400).send({ error: "Invalid date format" });
    
            const reservations = _id?
            await Reservation.find({ status: 'confirmed', "entity.id": req.body.entity?.id, _id: { $ne: _id }})
            :await Reservation.find({ status: 'confirmed', "entity.id": req.body.entity?.id});
                let conflicted = false;
                switch (period.type){
                    case "days":
                        reservations.forEach((ele) => {
                            let tempStart = new Date(ele.period.startDate).getTime();
                            let tempEnd = new Date(ele.period.endDate).getTime();
                            if (tempStart <= endDate && tempEnd >= endDate) conflicted = true;  
                            if (tempStart <= startDate && tempEnd >= endDate) conflicted = true;
                            if (tempStart <= startDate && tempEnd >= startDate) conflicted = true;
                            if (tempStart >= startDate && tempEnd <= endDate) conflicted = true;
                            console.log(ele.period.startDate , period.startDate);
                        });
                        break;
                    case 'dayPeriod':
                        reservations.forEach((ele) => {
                            let tempStart = new Date(ele.period.startDate).getTime();
                            let tempPeriod = ele.period.dayPeriod; // Define tempPeriod here
                            if (startDate==tempStart) {
                                if (tempPeriod == 'كامل اليوم') conflicted = true;
                                if (tempPeriod == dayPeriod) conflicted = true;
                                console.log(conflicted);
                            }
                        });
                        break;
                }
            if (conflicted) return res.status(403).send({ error: 'يوجد حجز في هذه الفترة' });
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