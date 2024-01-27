"use client";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faSync } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Student {
    _id?: string;
    name: string;
    email: string;
    contactNumber: string;
}

const StudentTable: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contactNumber: '',
    });
    const [students, setStudents] = useState<Student[]>([]);
    const [updatedStudentId, setUpdatedStudentId] = useState<string>();

    useEffect(() => {
        getStudentList();
    }, []);

    const getStudentList = async () => {
        try {
            const response = await fetch('/api/students/get');
            const studentList = await response.json();
            if (response.ok) {
                setStudents(studentList?.students)
            } else {
                toast.error('Failed to fetch students data!', { position: 'top-right' });
            }
        } catch (error) {
            toast.error('Something went wrong!', { position: 'top-right' });
        }
    }

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            if (!formData?.name) {
                return toast.error("Please enter students name!", { position: 'top-right', });
            }
            if (!formData?.email) {
                return toast.error("Please enter students email!", { position: 'top-right', });
            }
            if (!formData?.contactNumber) {
                return toast.error("Please enter students contact number!", { position: 'top-right', });
            }
            const dataSet = {
                data: {
                    name: formData?.name,
                    email: formData?.email,
                    contactNumber: formData?.contactNumber,
                },
            }
            
            if(updatedStudentId){
                const updatedStudentData = {
                    _id: updatedStudentId,  // Replace with the actual student ID
                    name: formData?.name,
                    email: formData?.email,
                    contactNumber: formData?.contactNumber
                  };
                updateStudent(updatedStudentData)
            }else{
                const response = await fetch('/api/students/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataSet),
                });
                const data = await response.json()
                if (response.ok) {
                    // console.log("data==>",data?.student_id)
                    const newStudent = {
                        _id: data?.student_id,
                        name: formData?.name,
                        email: formData?.email,
                        contactNumber: formData?.contactNumber,
                    }
                    setStudents([...students, newStudent]);
                    toast.success("Student added successfully!", { position: 'top-right', });
                    setFormData({ ...formData, name: "", email: "", contactNumber: "" })
                } else {
                    toast.error("Student add failed!", { position: 'top-right', });
                }
            }
            
        } catch (error) {
            toast.error("Something Went wrong!", { position: 'top-right', });
        }
    };
    async function updateStudent(studentData: Student) {
        try {
          const response = await fetch('/api/students/update', { // Replace with your actual API endpoint
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: studentData }),
          });
      
          const responseData = await response.json();
          console.log("response=======>",response)
          console.log("responseData=======>",responseData)
          if (response.ok) {
            console.log('Update successful:', responseData);
            // Additional UI logic on successful update
          } else {
            console.error('Update failed:', responseData.message);
            // UI logic to handle errors
          }
        } catch (error) {
          console.error('Error updating student:', error);
          // UI logic to handle errors
        }
      }
      
    const handleDelete = async (student: Student) => {
        try {
            const dataSet = {
                data: {
                    id: student._id,
                },
            }
            const response = await fetch('/api/students/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataSet),
            });
            const data = await response.json();
            console.log("res=====>", response);
            if (response.ok) {
                removeStudentById(student._id ? student._id : null)
                toast.success("Student deleted successfully!", { position: 'top-right' });
            } else {
                toast.error("Student delete failed!", { position: 'top-right' });
            }
        } catch (error) {
            toast.error("Something Went wrong!", { position: 'top-right' });
        }
    };
    const removeStudentById = (idToRemove: string | null): void => {
        if (idToRemove) {
            const updatedStudents = students.filter(student => student._id !== idToRemove);
            setStudents(updatedStudents);
        }
    };
    const handleUpdate = async (student: Student) => {
        setUpdatedStudentId(student?._id)
        setFormData({ ...formData, name: student?.name, email: student?.email, contactNumber: student?.contactNumber })
        // if (res.success) {
        //     Swal.fire({
        //       icon: "success",
        //       title: "User blocked!",
        //       confirmButtonColor: "#FD7F00",
        //     });
        //     const therapistKey = therapists.findIndex((therapist: Therapist) => therapist._id == userId);
        //     const previousTherapist = { ...therapists[therapistKey] };
        //     const updatedTherapist = { ...previousTherapist, blockedByAdmin: true };
        //     therapists[therapistKey] = updatedTherapist;
        //     console.log("therapists==>", therapists)
        //     setTherapists(therapists);
        //     toggleReasonModal()
        //   } else {
        //     Swal.fire({
        //       icon: "error",
        //       title: "Failed to block the user.",
        //       confirmButtonColor: "#FD7F00",
        //     });
        //     toggleReasonModal
        //   }
    }
    const refresh = () => {
        setUpdatedStudentId('')
        setFormData({ ...formData, name: '', email: '', contactNumber: '' })
        getStudentList();
    }
    return (
        <>
            <ToastContainer />
            <div className='flex justify-center items-center mb-12'>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="bg-gray-200 rounded-md py-1 px-2 w-full"
                    />
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Contact Number"
                        className="bg-gray-200 rounded-md py-1 px-2 w-full"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="bg-gray-200 rounded-md py-1 px-2 w-full"
                    />
                    <div className='flex justify-center items-center'>
                        <button type="submit" className="bg-blue-500 text-white rounded-md py-1 px-2 cursor-pointer w-full">
                            {updatedStudentId? 'Update Student':'Add Student'}
                        </button>
                        <FontAwesomeIcon
                            icon={faSync}
                            onClick={() => refresh()}
                            className="cursor-pointer text-green-800 hover:text-green-700 ms-3 text-xl scale-125"
                        />
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {students?.map((student, index) => (
                    <div key={index} className="max-w-lg w-full bg-white shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{student?.name}</h2>
                            <p className="text-gray-600">{student?.contactNumber}</p>
                        </div>
                        <div className="p-6 bg-gray-100 border-t border-gray-200">

                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">{student?.email}</p>
                                <div className="flex items-center gap-2">
                                    <FontAwesomeIcon onClick={() => handleUpdate(student)} icon={faPencilAlt} className='cursor-pointer text-green-500 hover:text-green-800' />
                                    <FontAwesomeIcon onClick={() => handleDelete(student)} icon={faTrash} className='cursor-pointer text-red-500 hover:text-red-800' />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default StudentTable;
