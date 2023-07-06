import React ,{useEffect ,useState} from 'react'
import { Grid } from '@mui/material'
import halls from "../assets/halls.png"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import DashboardIcon from '@mui/icons-material/Dashboard';
import "../scss/halls.scss"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea ,Pagination} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResort, getResortCard } from '../redux/reducers/resort';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {REACT_APP_API_URL} from "../.env.js"

const Resorts = () => {
  let apiKey=REACT_APP_API_URL
  const { t, i18n } = useTranslation();
  const search=useSelector((state)=>state.chalet.value.search)
  const dispatch=useDispatch()
  useEffect(()=>{dispatch(fetchResort())},[])
  const data=useSelector((state)=>state.resort.value.data)
  const [rates,setRates]=useState([])
  const [page, setPage] = useState(1);
  const hallsPerPage = 9;
  const totalHalls = data.length;
  const totalPages = Math.ceil(totalHalls / hallsPerPage);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const startIndex = (page - 1) * hallsPerPage;
  const displayedResort = data.slice(startIndex, startIndex + hallsPerPage);
  useEffect(()=>{
    let temp= displayedResort.map((ele)=>calcRate(ele.rate))
    setRates(temp)
    },[search])
  function calcRate(arr){
    if(arr.length){
      let sum = arr.reduce((prev,curr)=>prev+=curr,0)
      return  parseFloat( sum / arr.length).toFixed(1)
    }else return 0
  }
  let filtedSearch=displayedResort
  if(search.pools) filtedSearch= filtedSearch.filter((ele)=>parseInt(ele.pool)>=search.pools)
  if(search.maxPrice) filtedSearch= filtedSearch.filter((ele)=>parseInt(ele.price)<=search.maxPrice)
  if(search.minPrice) filtedSearch= filtedSearch.filter((ele)=>parseInt(ele.price)>=search.minPrice)
  if(search.kitchen) filtedSearch= filtedSearch.filter((ele)=>parseInt(ele.kitchen)>=search.kitchen)
  if(search.area) filtedSearch= filtedSearch.filter((ele)=>parseInt(ele.area)>=search.area)
  return (
    <>
<Grid container spacing={2} className="hall">
  {
    filtedSearch.map((ele,ind)=>(
      <Grid key={ind} item xs={12} md={6} lg={4}>
      <Link to={`/resortCard/${ele._id}`} style={{textDecoration:"none"}} onClick={()=>dispatch(getResortCard(ele._id))}>
        <Card sx={{ maxWidth: 400 }}>
            <CardActionArea>
              <CardMedia component="img" height="180" image={apiKey+ele.images[0]} alt="green iguana"/>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={{display:"flex",justifyContent:"space-between",flexDirection:"row-reverse"}}>
                    {ele.name}
                  <div className="rate">
                    <StarIcon style={{color:rates[ind]>.5? "#FAD721":'gray'}}/>
                    <StarIcon style={{color:rates[ind]>1.5? "#FAD721":'gray'}}/>
                    <StarIcon style={{color:rates[ind]>2.5? "#FAD721":'gray'}}/>
                    <StarIcon style={{color:rates[ind]>3.5? "#FAD721":'gray'}}/>
                    <StarIcon style={{color:rates[ind]>4.5? "#FAD721":'gray'}}/>
                    <p style={{fontSize:".8rem",textAlign:"center",marginTop:"5px"}} >{t("cards.rate")} {ele.rate.length}</p>
                  </div>
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{display:"flex",justifyContent:"space-between"}}>
                    <div className="price-box">
                    <p style={{fontSize:i18n.language=='en'?"1.1rem":"1.3rem"}}><span className='price'>{t("cards.sar")}   {ele.price}</span> / {t("cards.day")}</p>
                    </div>
                    <div className="data">
                        <p>{t("cards.pools")} {ele.pool}<LocationOnIcon className='icon'/></p>
                       <p>{t("cards.area")} {ele.area}{i18n.language=='en'?'M':"م"}<DashboardIcon className='icon'/></p> 
                    </div>
                </Typography>
              </CardContent>
            </CardActionArea>
        </Card>
      </Link>
      </Grid>
    ))
  }
</Grid>
<Pagination count={totalPages} page={page} onChange={handlePageChange} className='pagination'/>

    </>
  )
}

export default Resorts;