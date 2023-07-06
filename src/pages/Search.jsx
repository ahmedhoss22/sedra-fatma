import React , {useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import "../scss/search.scss"
import { Grid } from '@mui/material';
import { fetchReservations } from './../redux/reducers/reservation';
import { fetchChalets } from '../redux/reducers/chalet';
import { fetchHall } from '../redux/reducers/hall';
import { fetchResort } from '../redux/reducers/resort';

const Search = () => {
  const dispath =useDispatch()
  useEffect(()=>{
    dispath(fetchReservations())
    dispath(fetchChalets())
    dispath(fetchHall())
    dispath(fetchResort())
  },[])
  const { t, i18n } = useTranslation();
  const [search,setSearch]=useState()
  let reservations = useSelector((state)=>state.reservation.value.confirmed)
  let halls = useSelector((state)=>state.hall.value.data)
  let resort = useSelector((state)=>state.resort.value.data)
  let chalet = useSelector((state)=>state.chalet.value.data)
  let entity = [...halls,...resort, ...chalet ]

  function validPeriod(id,period){
    let isValid = true 
    let entityReservation = reservations.filter((ele)=>ele?.entity?.id==id)
    var tempSearch= new Date(search).getTime()
    if(! tempSearch) return isValid

    entityReservation.map((ele)=>{
      let tempStart= new Date(ele?.period?.startDate).getTime()
      let tempEnd= new Date(ele?.period?.endDate).getTime()
      switch (ele?.period?.type){
          case "days":
          if(tempStart <= tempSearch && tempEnd >= tempSearch) isValid = false ;
        break;
        case "dayPeriod":
          if(tempStart == tempSearch &&( ele?.period?.dayPeriod == period || ele?.period?.dayPeriod =='كامل اليوم')) isValid = false
          break;
        default :console.log("Invalid day period");;
      }
    })
 
    return isValid
  }
  console.log(true + true);
  return (
    <div className="container" style={{direction:i18n.language=='en'?"ltr":"rtl"}}>
      <h2 >البحث السريع</h2>  
      <input type="date" value={search} onChange={(e)=>setSearch(e.target.value)} id='search-box'/>
      <Grid container spacing={2} margin="50px auto">
             {entity.map((ele)=>(
          <Grid xs={12} md={6} lg={3}>
              <div className='card-box' style={{backgroundColor:(validPeriod(ele._id,"صباحية")|| validPeriod(ele._id,'مسائية'))?'green':'red'}}>
                 <h2>{ele?.name}</h2>
                 <hr/>
                 <p> الفترة الصباحية :  {validPeriod(ele._id,"صباحية")? "متاح" :"محجوز"}</p>
                 <p> الفترة المسائية : {validPeriod(ele._id,'مسائية')? "متاح" :"محجوز"}</p>
              </div>
          </Grid>
             )) 
              }
      </Grid>
    </div>
  )
}

export default Search