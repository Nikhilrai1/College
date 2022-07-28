import React, { useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Assignement = () => {
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [fileUrl, setFileUrl] = useState("");

  const handleUpload = () => {
    console.log("hello")
    console.log(file)
    if (file) {
      const storageRef = ref(storage, `/AssignmentFile/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // update progress
          if(percent != 100){
            setPercent(percent);
          }
          else{
            setPercent(0);
            setFile("");
          }
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setFileUrl(url)
          });
        }
      );
    }
    else {
      alert("No file")
    }
  };

  return (
    <div style={{ marginTop: "75px" }}>
      <div className="flex justify-between items-center flex-col mt-8 p-10">
        <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
          <div className="m-4">
            <label className="inline-block mb-2 text-gray-500">File Upload</label>
            <div className="flex items-center justify-center w-full">
              <label
                className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  {file == "" ? <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg> :
                    <span className='text-lg text-green-500'>Current File</span>
                  }
                  <p className={`pt-1 text-sm tracking-wider text-${file == "" ? "gray" : "blue"}-400 group-hover:text-blue-600`}>
                    {file == "" && percent == 0 ? "Attach File" : file.name}
                  </p>
                  <p className={`pt-1 text-sm tracking-wider text-${file == "" ? "gray" : "blue"}-400 group-hover:text-blue-600`}>
                    {(percent > 0 && percent < 100) && percent + "%"}
                  </p>
                </div>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} className="opacity-0" />
              </label>
            </div>
          </div>
          <div className="flex justify-center p-2">
            {file != "" && <button onClick={handleUpload} className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl">Upload</button>}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Assignement