import React , {useState} from 'react'
import { Button } from 'antd'
import TheatreFormModal from './TheatreFormModal'


function TheatreList() {
   
   const [isModalOpen , setIsModalOpen] = useState(false)

  return (
    <>

      <div className='d-flex justify-content-end'>
        <Button onClick={()=> setIsModalOpen(true)} type='primary'>Add Theatre</Button>

        {isModalOpen &&  <TheatreFormModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/> }
       

      </div>


    
    
    </>
  )
}

export default TheatreList