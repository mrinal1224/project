import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieById } from "../apicalls/movies";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/loadersSlice";
import { message, Input, Divider, Row, Col } from "antd";
import { CalendarOutlined } from '@ant-design/icons';
import moment from "moment";


const SingleMovie = () => {
    const params = useParams();
    const [movie, setMovie] = useState();
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const dispatch = useDispatch();
    const navigate = useNavigate();



    // handles teh date
    const handleDate = (e) => {
        setDate(moment(e.target.value).format("YYYY-MM-DD"));
        navigate(`/movie/${params.id}?date=${e.target.value}`);
    }

    const getData = async () => {
        try{
            dispatch(showLoading());
            const response = await getMovieById(params.id);
            if(response.success){
                setMovie(response.data)
            }else{
                message.error(response.message)
            }
            dispatch(hideLoading());
        }catch(err){
            message.error(err.message)
            dispatch(hideLoading());
        }
    }
    
    // const getAllTheatres = async () => {
    //     try{
    //         dispatch(showLoading());
    //         const response = await getAllTheatresByMovie({movie: params.id, date});
    //         if(response.success){
    //             setTheatres(response.data);
    //         }else{
    //             message.error(response.message);

    //         }
    //         dispatch(hideLoading());
    //     }catch(err){
    //         dispatch(hideLoading());
    //         message.err(err.message)
    //     }
    // }

    useEffect(() => {
        getData();
    }, [])

    // useEffect(() => {
    //     getAllTheatres();
    // }, [date])

    return (<>
        <div className="inner-container">
        {movie && <div className="d-flex single-movie-div">
                <div className="flex-Shrink-0 me-3 single-movie-img"><img src={movie.poster} width={150} alt="Movie Poster"/></div>
                <div className="w-100">
                    <h1 className="mt-0">{movie.title}</h1>
                    <p className="movie-data">Language: <span>{movie.language}</span></p>
                    <p className="movie-data">Genre: <span>{movie.genre}</span></p>
                    <p className="movie-data">Release Date: <span>{moment(movie.date).format("MMM Do YYYY")}</span></p>
                    <p className="movie-data">Duration: <span>{movie.duration} Minutes</span></p>
                    <hr/>
                    <div className="d-flex flex-column-mob align-items-center mt-3">
                        <label className="me-3 flex-shrink-0">Choose the date:</label>
                        <Input onChange={handleDate} type="date" min={moment().format("YYYY-MM-DD")} className="max-width-300 mt-8px-mob" value={date} placeholder="default size" prefix={<CalendarOutlined />} />
                    </div>
                </div>
            </div>}
        </div> 
    </>
    );
}
export default SingleMovie;