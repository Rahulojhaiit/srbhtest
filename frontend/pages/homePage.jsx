import { useState } from "react"
import axios from "axios"
export default function HomePage() {
    const [music,setMusic]=useState([])
    const [name,setName]=useState("")
    const [album,setAlbum]=useState("")
    async function getData(){
      await axios.get('http://localhost:3000/todo').then((r)=>{
        setMusic(JSON.parse(r.data));
      })
    }
  
    
    function SubmitData(){
      const obj={
        name,
        album
      }
      fetch('http://localhost:3000/todo',{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
          "Content-type":"Application/json"
        }
      }).then(()=>{
        getData()
      })
    }
    function DisplayData(){
      return (
        <ul>
          {music.map((r)=>{
            return <>
              <li>{(r["name"]).trim()} featured in {r["album"]}</li>
            </>
          })}
        </ul>
      )
    }
    getData()
    return (
      <>
      <DisplayData /> 
      <input placeholder='name' onChange={(e)=>{
        setName(e.target.value)
      }}></input> <input placeholder='album' onChange={(e)=>{
        setAlbum(e.target.value)
      }}></input> <br /><button onClick={SubmitData}>submit album</button>
      </>
    )
  }
  