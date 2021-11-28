import React from 'react';
import "./imagepreview.css"




function Imagepreview({img,UploadImage,CancelImage,state,progress}) {

    console.log(img)
    const range = progress
    return(
        <div className={state}>
            <div className="image__name">
                <p>{img.name}</p>
                <div className="slidecontainer">
                    <input type="range" className="slider" value={range}/>
                </div>
            </div>
            <div className="button__div">
                <button onClick={UploadImage} className="upload">upload</button>
                <button onClick={CancelImage} className="cancel">cancel</button>
            </div>
        </div>
    )
}

export default Imagepreview;
