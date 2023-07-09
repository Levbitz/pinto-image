import React, { useState, useEffect, useContext } from "react";
import { db, storage } from "../lib/Firebase/Firebase";


import './UploadDocs.css'

import {
  addDoc,
  arrayUnion,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
//import { dev_url ,prod_url } from "../../../lib/constants/constants";


function PhotoUpload() {


  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [result, setResult] = useState([]);
  const [myPreview, setMyPreview] = useState([]);
  //const [identifier, setIdentifier] = useState([]);
  const [activation, setActivation] = useState(false);



  const onChangeHandler = async (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      const newImage = event.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }

    const filesArray = Array.from(event.target.files).map((file, index) =>
      URL.createObjectURL(file, index)
    );

    setMyPreview((prevImages) => prevImages.concat(filesArray));
    Array.from(event.target.files).map(
      (file, index) => URL.revokeObjectURL(file, index) // avoid memory leak
    );
  };

  //console.log(images.length);
  //console.log(myPreview);

  const handleUpload = async () => {
    setUploading(true);
    
    let uris = []
   
   
    await Promise.all(
      images.map(async (file) => {
        const fileRef = ref(storage, `documents/${file.name}`);
        const uploadTask = uploadBytes(fileRef, file, "data_url").then(
          async () => {
            const downloadURL = await getDownloadURL(fileRef);

            console.log(downloadURL);

            uris.push(downloadURL)
            console.log(uris);


 


            


           if(images.length === uris.length){
            fetch(`${prod_url}/kyc_docs`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
             body: JSON.stringify({
            
             docs:uris
             }),
            }) .then((resp) => resp.json())
            .then((data) => {
              console.log(data);
              const {status, Details} = data
              if (status === "sucessfull" ) {
             // alert(pancardName);status: "successfull"

               navigate(
                       `/gender`,
                      {
                        replace: true,
                      }
                    );
            
              }
            });




           }
    
          }
        );
      })
    );
  };

  const renderPhotos = (source) => {
    if (source != null) {
      return source.map((photo, index) => {
        // console.log(index);
        return (
          <div className="col l2 s6" key={index}>
            <p>{photo.id}</p>

            <img
              width={"100%"}
              style={{
                objectFit: "contain",
              }}
              className="responsive-image"
              src={photo}
              alt=""
            />

            {/*<button
              onClick={() => {
                //delete and update fileList
                setImages((prevState) =>
                  prevState.filter((item) => item.id !== photo.id)
                );
                setMyPreview((prevState) =>
                  prevState.filter((item) => item !== photo)
                );
              }}
            >
              delete
            </button>*/}
          </div>
        );
      });
    } else {
      return null;
    }
  };


  

  useEffect(() => {
    setImages(images);
    setMyPreview(myPreview);
  }, [images, myPreview]);
  return (
    <>
     
      <div className="onboard_wrap" >
        <div className="container">

        <div className="row">
        <div className="col l12 s12">
          <div>
          <h5 className="px-5  center">Upload atleast Three Documents Pancard ,Adhaar ,Collage Id , Empoyment id or any Offical government issued document</h5>
          </div>
        </div>
        
        </div>
          <div
            
            className="row"
          >


        
          <div className="col l3 s1"></div>
          <div className="col l6 s10 ">
          <div className="row">
          {/* upload */}
          <div className="col l9  s9 ">
          <div className=" ">
          <label className="round_upload"  htmlFor="upload">
          
          {/*<span>
          <i class="material-icons">add</i> 
    </span>*/}
          
          <span className="primary_bg text-white font-bold px-4 py-2 rounded-full text-lg">
           Click Upload Photos
          </span> 
          </label>
          <input
          
            type="file"
            name="upload"
            id="upload"
            style={{ display: "none" }}
            
            multiple
            onChange={onChangeHandler}
          />
        </div>
          </div>
          {/* upload*/}
          {/* skip*/}
          <div className="col l3 s3">
          <div>
              
              </div>
          </div>
          {/* skip*/}
          </div>


          <div className="row">
          <div className="col l12">
          <div>

          {images.length > 2 ? (
            activation ? null : (
              <div onClick={handleUpload}>
                {uploading ? (
                  <>
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                      name="action"
                    >
                      uploading...
                      <i className="material-icons right">
                        <div className="preloader-wrapper small active">
                          <div className="spinner-layer spinner-red-only">
                            <div className="circle-clipper left">
                              <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                              <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                              <div className="circle"></div>
                            </div>
                          </div>
                        </div>
                      </i>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="btn">continue</button>
                  </>
                )}
              </div>
            )
          ) : null}
        </div>
          </div>
          
          </div>
          
          </div>
          
           
           
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div
              style={{
                padding: "10px",
                borderWidth: 2,
                borderRadius: 2,
                borderColor: "#eeeeee",
                borderStyle: "dashed",
                backgroundColor: "#fafafa",
                color: "#bdbdbd",
                outline: "none",
                transition: "border .24s ease-in-out",
                width: "100%",
                height: "300px",
                marginTop: "10px",
              }}
            >
              <div className="result">{renderPhotos(myPreview)}</div>
            </div>
          </div>
            </div>
        <div>
          <div className="container ">
            <div className="row">
              <div className="col l4">
                {/*images.length > 2 ? (
                  activation ? null : (
                    <div onClick={handleUpload}>
                      {uploading ? (
                        <>
                          <button
                            className="btn waves-effect waves-light"
                            type="submit"
                            name="action"
                          >
                            uploading...
                            <i className="material-icons right">
                              <div className="preloader-wrapper small active">
                                <div className="spinner-layer spinner-red-only">
                                  <div className="circle-clipper left">
                                    <div className="circle"></div>
                                  </div>
                                  <div className="gap-patch">
                                    <div className="circle"></div>
                                  </div>
                                  <div className="circle-clipper right">
                                    <div className="circle"></div>
                                  </div>
                                </div>
                              </div>
                            </i>
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="btn">continue</button>
                        </>
                      )}
                    </div>
                  )
                      ) : null*/}
              </div>
            </div>
          </div>


          
       
        </div>
      </div>
    </>
  );
}





export default PhotoUpload
