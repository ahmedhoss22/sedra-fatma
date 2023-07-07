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
import { Button, CardActionArea, CardActions ,Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChalets, getChaletCard } from '../redux/reducers/chalet';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {REACT_APP_API_URL} from "../.env.js"

const Chalets = () => {
  const { t, i18n } = useTranslation();
  const search=useSelector((state)=>state.chalet.value.search)
  const dispatch=useDispatch()
  let apiKey=REACT_APP_API_URL
  const data=useSelector((state)=>state.chalet.value.data)
  const [page, setPage] = useState(1);
  const [rates,setRates]=useState([])
  const hallsPerPage = 9;
  const totalHalls = data.length;
  const totalPages = Math.ceil(totalHalls / hallsPerPage);
  const handlePageChange = (event, value) => setPage(value)
  const startIndex = (page - 1) * hallsPerPage;
  const displayedChalets = data.slice(startIndex, startIndex + hallsPerPage);
  useEffect(()=>{dispatch(fetchChalets())},[])
  useEffect(()=>{
    let temp= displayedChalets.map((ele)=>calcRate(ele.rate))
    setRates(temp)
    },[search])
  function calcRate(arr){
    if(arr.length){
      let sum = arr.reduce((prev,curr)=>prev+=curr,0)
      return  parseFloat( sum / arr.length).toFixed(1)
    }else return 0
  }
  let filtedSearch=displayedChalets
  if(search.maxPrice) filtedSearch= filtedSearch.filter((ele)=>parseInt(ele.price)<=search.maxPrice)
  if(search.minPrice) filtedSearch= filtedSearch.filter((ele)=>parseInt(ele.price)>=search.minPrice)
  if(search.kitchen) filtedSearch= filtedSearch.filter((ele)=>parseInt(ele.kitchen)>=search.kitchen)
  if(search.area) filtedSearch= filtedSearch.filter((ele)=>parseInt(ele.area)>=search.area)
  if(search.bathrooms) filtedSearch= filtedSearch.filter((ele)=>parseInt(ele.bath)>=search.bathrooms)
  if(search.bedrooms) filtedSearch= filtedSearch.filter((ele)=>parseInt(ele.sleeping)>=search.bedrooms)
  if(search.lounges) filtedSearch= filtedSearch.filter((ele)=>parseInt(ele.lounge)>=search.lounges)
  return (
    <>
<Grid container spacing={2} className="hall">
  {
    filtedSearch.map((ele,ind)=>(
      <Grid key={ind} item xs={12} md={6} lg={4}>
        <Link to={`/chaletCard/${ele._id}`} style={{textDecoration:"none"}} onClick={()=>dispatch(getChaletCard(ele._id))}>
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
                    <p style={{fontSize:".8rem",textAlign:"center"}} >{t("cards.rate")} {ele.rate.length}</p>
                  </div>
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{display:"flex",justifyContent:"space-between"}}>
                    <div className="price-box">
                       <p style={{fontSize:i18n.language=='en'?"1.1rem":"1.3rem"}}><span className='price'>{t("cards.sar")}   {ele?.price?.wholeDay}</span> / {t("cards.day")}</p>
                    </div>
                    <div className="data">
                      <p>{ele.address}<LocationOnIcon className='icon'/></p>
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

export default Chalets;