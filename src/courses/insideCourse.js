import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { Card, InputGroup, FormControl, Button, DropdownButton, Dropdown, Table } from 'react-bootstrap';
import { createProjectql, validateql, addTeacherql } from '../mutations/mutation'
import { FcInfo } from 'react-icons/fc'
import { AiFillEdit, AiOutlineUserAdd,AiFillEye } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import {getUserql} from '../queries/queries'
import Cookies from "universal-cookie";
import { useMutation , useQuery} from '@apollo/client'

function InsideCourse (){
    const [email, setEmail] = useState("")
    const [auto, setAuto] = useState("")
    const cookies = new Cookies();
    let idProject=cookies.get('obs-course')
    console.log(idProject)

    //----------------------------------------------------------------------------------------------------------------
    let tokenStorage = localStorage.getItem('token')
    useEffect(() => {
        if (!tokenStorage) {
            tokenStorage = ""
        }
    }, [])
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        response()
    }, [])
    const [validateForm] = useMutation(validateql)
    const [addTeacher] = useMutation(addTeacherql)
    const response = async () => {
        const response1 = await validateForm(
            {
                variables: { token: tokenStorage }
            }
        )
        //console.log(response1)
        if (response1) {
            if (response1.data.validate.error) {
                let message = response1.data.validate.error.map(p => p.message)
                Swal.fire({
                    title: "Error",
                    text: message,
                    icon: "warning"
                })
                window.location.replace('./')
            }
            else {
                if (response1.data.validate.rol === "Estudiante") {
                    //console.log(response1.data.validate)
                    setAuto(response1.data.validate.Estado)
                    setEmail(response1.data.validate.email)
                    setAuth(response1.data.validate.validacion)
                }
                else {
                    Swal.fire({
                        title: "Error",
                        text: "No tiene acceso permitido",
                        icon: "error"
                    })
                    window.location.replace('./')
                }
            }
        }
    }
    //################################################################################################################

    return(
        <div className="container">

        </div>
    )
}
export default InsideCourse;