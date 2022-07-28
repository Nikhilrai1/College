import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject, getStorage } from "firebase/storage";


const PostAssignment = () => {
  // state varriable of input field
  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [stream, setStream] = useState("");
  const [group, setGroup] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [deadline, setDeadline] = useState("");


  // handle submit on clicking register button
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/assignment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ title, grade, desc, stream, group, deadline, fileUrl, subject }),
      })
      let postData = await res.json();
      console.log(postData)
      if (postData.success) {
        toast.success('Assignment Successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        if (fileUrl != "") {
          deleteFile();
        }
        toast.error(postData.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setTitle("")
      setGrade("")
      setDesc("")
      setDeadline("")
      setStream("")
      setGroup("")
      setFile("")
      setSubject("")
    }
    catch (err) {
      console.log(err);
      if (fileUrl != "") {
        deleteFile();
      }
      toast.error('Internal server error', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  // handle change of input field
  const handleInput = (e) => {
    const { value } = e.target;
    if (e.target.name == "title") {
      setTitle(value)
    }
    else if (e.target.name == "grade") {
      setGrade(value);
    }
    else if (e.target.name == "subject") {
      setSubject(value);
    }
    else if (e.target.name == "desc") {
      setDesc(value);
    }
    else if (e.target.name == "stream") {
      setStream(value);
    }
    else if (e.target.name == "group") {
      setGroup(value);
    }
    else if (e.target.name == "deadline") {
      setDeadline(value);
    }
  }
  function deleteFile() {
    const desertRef = ref(getStorage(), fileUrl);
    deleteObject(desertRef).then(() => {
      console.log("delete successfully")
    }).catch((error) => {
      console.log(error);
    });
    setFile("");
    setFileUrl("");
    setPercent(0);
    // setIsDelete(false);
  }
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
          setPercent(percent);

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
    <>
      <div style={{
        marginTop: "75px",
      }}
        className="container w-full mx-auto h-[calc(100%-75px)]">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
        <div className="flex w-full justify-center px-6 my-10">
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            <div className="w-full flex justify-center items-start pt-10 lg:block lg:w-5/12 rounded-l-lg">
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
                    {percent == 0 && <button onClick={handleUpload} className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl">Upload</button>}
                    {(file != "" && percent == 100) && <button onClick={deleteFile} className="w-full px-4 py-2 text-white bg-blue-500 rounded shadow-xl">Delete</button>}
                  </div>
                </div>
                <div></div>
              </div>
            </div>
            <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Assignment</h3>
              <form onSubmit={handleSubmit} method="POST" className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="title">
                      Title
                    </label>
                    <input
                      name="title"
                      onChange={handleInput}
                      value={title}
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="title"
                      type="text"
                      placeholder="Title"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="grade">
                      Grade
                    </label>
                    <input
                      name="grade"
                      onChange={handleInput}
                      value={grade}
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="grade"
                      type="text"
                      placeholder="Grade"
                    />
                  </div>
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="stream">
                      Stream
                    </label>
                    <input
                      name="stream"
                      onChange={handleInput}
                      value={stream}
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="stream"
                      type="text"
                      placeholder="Stream"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="group">
                      Group
                    </label>
                    <input
                      name="group"
                      onChange={handleInput}
                      value={group}
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="group"
                      type="text"
                      placeholder="group"
                    />
                  </div>
                </div>
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="subject">
                      Subject
                    </label>
                    <input
                      name="subject"
                      onChange={handleInput}
                      value={subject}
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="subject"
                      type="text"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="md:ml-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="deadline">
                      Deadline
                    </label>
                    <input
                      name="deadline"
                      onChange={handleInput}
                      value={deadline}
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="deadline"
                      type="text"
                      placeholder="Deadline"
                      required
                    />
                  </div>
                </div>
                <div className="w-full mt-4 mb-4 md:mr-2 md:mb-0">
                  <div style={{ width: "100%" }} className="mb-3 xl:w-96">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="desc">
                      Description
                    </label>
                    <textarea
                      className="form-control block w-full px-3 py-1.5 text-base font-normal  text-gray-700  bg-white bg-clip-padding  border border-solid border-gray-300 rounded transition  ease-in-out  m-  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-non "
                      id="desc"
                      name="desc"
                      value={desc}
                      onChange={handleInput}
                      rows="3"
                      placeholder="Description"
                    ></textarea>
                  </div>
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit">
                    Assign
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default PostAssignment;