import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { Card, InputGroup, FormControl, Button, DropdownButton, Dropdown, Table, Alert, AlertDismissibleExample } from 'react-bootstrap';
import { FcInfo } from 'react-icons/fc'
import { validateql } from '../mutations/mutation'
import { getUserql } from '../queries/queries'
import { useQuery, useMutation } from '@apollo/client'
import { AiFillEdit, AiOutlineUserAdd } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import Cookies from "universal-cookie";
import './courseAdmi.css'
import jwt from 'jsonwebtoken'

function CourseTeacher() {
    let token = localStorage.getItem('token')
    console.log(token)
    useEffect(() => {
        response()
    }, [])
    const [id,setId] = useState("")
    const [cursos,setCursos] = useState([])
    const [validateForm] = useMutation(validateql)
    const response = async () => {
        const response1 = await validateForm(
            {
                variables: { token }
            }
        )
        console.log(response1)
        if (response1) {
            if (response1.data.validate.error) {
                let message = response1.data.validate.error.map(p => p.message)
                Swal.fire({
                    title: "Error",
                    text: message,
                    icon: "warning"
                })
            }
            else {
                if (response1.data.validate.rol == "Lider") {
                    Swal.fire({
                        title: "Bienvenido",
                        text: response1.data.validate.rol + " " + response1.data.validate.nombres,
                        icon: "success"
                    })
                     setId(response1.data.validate.id)
                }
                else {
                    Swal.fire({
                        title: "Error",
                        text: "No tiene acceso permitido",
                        icon: "error"
                    })
                }
            }
        }
    }
    const { data } = useQuery(getUserql,
        {
            variables: { id }
        })
    useEffect(()=>{
        if(id){
            if(data){
                if(data.getUser){
                    setCursos(data.getUser.cursos)
                }
            }
        }
    },[data])
    console.log(data)
    // let id =0
    // const {data1} = useQuery(getUserql,
    //     {
    //         variables:{id}
    //     })
    // console.log(data1)
    return (
        <div className="container">
            <Table striped bordered hover variant="dark" className="text-center">
            <thead>
                    <tr>
                        <th>#</th>
                        <th>Titulo</th>
                        <th>Descripcion</th>
                        <th>Horas</th>
                        <th>Opciones</th>
                        <th><Button className="Add"><AiOutlineUserAdd size="1rem" /></Button></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.getUser.user.cursos.map((val, key) => {
                        return (
                            <tr>
                                <td>{key + 1}</td>
                                <td>{val.tittle}</td>
                                <td>{val.description}</td>
                                <td>{val.Horas}</td>
                                <td>
                                    <Button className="Observar" ><FcInfo className="Observar" size="1.5rem"></FcInfo></Button>
                                    <Button className="Eliminar" ><FiDelete size="1.5rem" color="red" /></Button>
                                </td>
                                <td></td>
                            </tr>
                        )
                    })}
                </tbody>

            </Table>
        </div>
    )
}
export default CourseTeacher