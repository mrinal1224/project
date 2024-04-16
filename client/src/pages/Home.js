import React, { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../redux/loadersSlice";
import { useDispatch } from "react-redux";
import { Row, Col, Input , message } from "antd";
import { getAllMovies } from "../apicalls/movies";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import moment from "moment";



function Home() {

  const [movies , setMovies] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getData= async()=>{
     dispatch(showLoading())

     const response = await getAllMovies()
 
     setMovies(response.data)
 

     dispatch(hideLoading())
  }


  useEffect(()=>{
    getData()
  } , [])

  console.log(movies)



  return (
    <>
      <Row className="justify-content-center w-100">
        <Col xs={{span: 24}} lg={{span: 12}}>
          <Input placeholder="Search for Movies" type="text"></Input>
          <br /><br /><br />
        </Col>
      </Row>


      <Row>

      <Row className="justify-content-center"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
      {movies && movies.map(movie => 
        <Col className="gutter-row mb-5" key={movie._id} span={{
          xs: 24,
          sm: 24,
          md: 12,
          lg: 10
        }}>
          <div className="text-center">
            <img onClick={() => {navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`)}} className="cursor-pointer" src={movie.poster} alt="Movie Poster" width={200} height={300} style={{borderRadius: "8px"}}/>
            <h3 onClick={()=> {navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`)}} className="cursor-pointer">{movie.title}</h3>
          </div>
        </Col>
        )}
      </Row> 

      </Row>
    </>
  );
}

export default Home;
