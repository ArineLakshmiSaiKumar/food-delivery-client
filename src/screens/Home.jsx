import React, { useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
  const [foodCat,setFoodCat] = useState([])
  const [foodItems,setFoodItems] = useState([])
  const [search,setSearch] = useState('')
  const loadData = async ()=>{
    let response = await fetch("https://mernappbackend-ur3t.onrender.com/foodData",{
      method:"POST",
      headers:{
        'Content-Type':"application/json"
      }
    })
    response = await response.json()
    setFoodItems(response[0])
    setFoodCat(response[1])
  }
  useEffect(()=>{
    loadData()
  },[])
  return (
    <>
      <div><Navbar /></div>
      <div>
      <div>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className='carousel-caption' style={{zIndex:"2"}}>
            <div className="d-flex justify-content-center">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      
            </div>
          </div>
          <div className="carousel-item active">
            <img src="https://cmx.weightwatchers.com/assets-proxy/weight-watchers/image/upload/v1594406683/visitor-site/prod/ca/burgers_mobile_my18jv" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://www.mistay.in/travel-blog/content/images/2020/07/hyderbadi-biriyani-1.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://dekhnews.com/wp-content/uploads/2016/07/Wallpaper-HD-Cherry-Ice-Cream.jpg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
      </div>
      <div className='container'>
        {
          foodCat.length !== 0
          ? foodCat.map((data)=>{
            return <div className='row mb-3'>
              <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
              <hr />
              {foodItems.length!==0?foodItems.filter((item)=>(data.CategoryName === item.CategoryName)&&(item.name.toLowerCase().includes(search.toLowerCase()))).map(
                filterItems=>{
                  return <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                    <Card foodItem = {filterItems}
                    options={filterItems.options[0]}
                    />
                  </div>
                }
              ):<div>No Data Item Found</div>}
              </div>
          }):""
        }

      </div>
      <Footer/>
    </>
  )
}
