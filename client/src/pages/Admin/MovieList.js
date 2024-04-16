import React, { useEffect, useState } from 'react';
import { Table, Button, message} from 'antd';
import MovieFormModal from './MovieFormModal';
import DeleteMovieModal from './DeleteMovieModal';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/loadersSlice';
import { getAllMovies } from '../../apicalls/movies';
import moment from 'moment';

// const dataSource = [
//     {
//       key: '1',
//       poster: 'Image1',
//       name: 'Mastaney',
//       description: 'Set in 1739, Nadar Shah`s undefeated army was attacked by Sikh Rebellions. ',
//       duration: 120,
//       genre: "Action",
//       language: "Hindi",
//       releaseDate: "Oct  25, 2023",
//     },
//     {
//       key: '2',
//       poster: 'Image2',
//       name: 'Mastaney',
//       description: 'Set in 1739, Nadar Shah`s undefeated army was attacked by Sikh Rebellions. ',
//       duration: 120,
//       genre: "Action",
//       language: "Hindi",
//       releaseDate: "Oct  25, 2023",
//       action: "Delete"
//     },
    
//   ];    
const MovieList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [formType, setFormType] = useState("add"); 
    const [movies, setMovies] = useState(null);

    const dispatch = useDispatch();

    const getData = async () => {
      try{
        dispatch(showLoading());
        const response = await getAllMovies();
        if(response.success){
          const allMovies = response.data;
          setMovies(
            allMovies.map(function(item){
              return {...item, key: `movie${item._id}`}
            })
          );
        }else{
          message.error(response.message)
        }
        dispatch(hideLoading())

      }catch(err){
        dispatch(hideLoading());
        message.error(err.message);
      }
    }

    const columns = [
      {
        title: 'Poster',
        dataIndex: 'poster',
        render: (text, data) => {
          return (
            <img src={data.poster} alt="Movie Poster" width="75" height="115" style={{objectFit: "cover"}}/>
          )
        }
      },
      {
        title: 'Movie Name',
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Duration',
        dataIndex: 'duration',
        render: (text, data) => {
          return `${text}m`
        }
      },
      {
        title: 'Genre',
        dataIndex: 'genre',
        key: 'genre',
      },
      {
        title: 'Language',
        dataIndex: 'language',
        key: 'language',
      },
      {
        title: 'Release Date',
        dataIndex: 'releaseDate',
        render: (text, data) => {
          return moment(data.releaseDate).format('MM-DD-YYYY')
        }
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, data) => {
          return(
            <div className='d-flex align-items-center gap-10'>
              <Button onClick={() => { setIsModalOpen(true); setFormType("edit"); setSelectedMovie(data) }}><EditOutlined/></Button>
              <Button onClick={ () => { setIsDeleteModalOpen(true); setSelectedMovie(data); }}><DeleteOutlined/></Button>
            </div>
          )
        }
      },
    ];

    useEffect(() => {
      getData();
    }, [])
    
    return(
        <>
          <div className='d-flex justify-content-end'>
            <Button type="primary" onClick={() => { setIsModalOpen(true); setFormType("add") }}>Add Movie</Button>
          </div>   
          <Table dataSource={movies} columns={columns} />
          { isModalOpen && <MovieFormModal isModalOpen={isModalOpen} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} setIsModalOpen={setIsModalOpen} formType={formType} getData={getData} /> }
          { 
            isDeleteModalOpen && <DeleteMovieModal isDeleteModalOpen={isDeleteModalOpen} selectedMovie={selectedMovie} setIsDeleteModalOpen={setIsDeleteModalOpen} setSelectedMovie={setSelectedMovie} getData={getData} /> 
          }
        </>
    );
};

export default MovieList;