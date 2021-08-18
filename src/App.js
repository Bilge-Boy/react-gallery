import { useEffect, useState } from 'react';
import './App.css';
import ReactRoundedImage from "react-rounded-image";

function App() {
  const [albumID, setAlbumID] = useState([]);
  const [album, setAlbum] = useState([]);
  
  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/albums")
    .then(response => response.json())
    .then(jsn=> setAlbumID(jsn));
  },[])

  const GetPics = (e) => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${e.target.value}`)
    .then(response => response.json())
    .then(jsn=> setAlbum(jsn));
}

  return (
    <div className="App">
      <h1 htmlFor="albums">Select an album:</h1>
      <select name="albums" id="albums" on onChange={GetPics}>
          <option selected>select an album</option>
          {albumID.map((id, index)=>(
          <option key={index} value={id.id} >{id.id + ". " + id.title}</option>
          ))}
      </select>
      <hr />
      <div style={{display:'flex', flexWrap:"wrap"}}>
            {album.length ? album.map((pic,i)=>(
              <ReactRoundedImage image={pic.thumbnailUrl}
              roundedColor="none"
              hoverColor="#DD1144" />
            )) : ""}
      </div>
    </div>
  );
}

export default App;
