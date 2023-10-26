
import { useEffect, useState } from 'react';
import './communitydiv.css'
import { storage } from '../firebase';
import {getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
const Communitydiv = (props)=>{
    const [Threadlogo, setThreadlogo] = useState()

    const subThread = props.newD.find((item)=>
      item.title === props.title
    )|| null
    const imageRef = ref(storage, `${props.title}/` )


useEffect(()=>{
  listAll(imageRef).then((res)=>{
    console.log(res)
    res.items.forEach(element => {
      getDownloadURL(element).then((url)=>{
          setThreadlogo(url);
      })
      
    });
  })
}, [props.title])


   return(
    <div className='community-container'>
         <div className="logo-container">
      <img src={Threadlogo} alt="Logo" className="rounded-logo" />
    </div>
    <div className='community-title'>{props.title}</div>
    <div className='community-desc'>{subThread.description}</div>
  </div>
   )
}

export default Communitydiv;