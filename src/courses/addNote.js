import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { Card, InputGroup, Form, Button, FloatingLabel } from 'react-bootstrap';
import { addNoteql, validateql, addTeacherql,addNotiql } from '../mutations/mutation'
import { AiOutlineSend } from 'react-icons/ai'
import {getCourseql } from '../queries/queries'
import Cookies from "universal-cookie";
import { useMutation, useQuery } from '@apollo/client'

function AddNote() {
    const [email, setEmail] = useState("")
    const [auto, setAuto] = useState("")
    const [rol, setRol] = useState("")
    const [note, setNote] = useState("")
    const [description, setDescription] = useState("")
    let addresponse
    const cookies = new Cookies();
    let idProject = cookies.get('obs-course')
    //console.log(idProject)

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
                if (response1.data.validate.rol === "Lider") {
                    //console.log(response1.data.validate)
                    setRol(response1.data.validate.rol)
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
    const { data } = useQuery(getCourseql, {
        variables: { id: idProject }
    })
    //console.log(data)
    const [people,setPeople]=useState([])
    useEffect(() => {
        if (data) {
            if (data.getProject) {
                if (data.getProject.people) {
                    setPeople(data.getProject.people.map(p=>p.email))
                }
            }
        }
    },[data])
    

    const [updateForm] = useMutation(addNotiql)
    const students = async (idnote)=>{
        console.log(idnote,"Este es el ID")
        data.getProject.people.map(async(val,key)=>{
            const responseUpdate = await updateForm(
                {
                    variables:{email:val.email,estado:false,note:idnote}
                }
            )
            console.log(responseUpdate)
            window.location.href = './insideCourse'
        })
    }


    const [addNoteForm] = useMutation(addNoteql)

    const add = async () => {
        Swal.fire({
            title: '¿Esta seguro?',
            text: "Esta seguro de agregar la nota",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero agregar la nota!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                addresponse = await addNoteForm(
                    {
                        variables: { email, idProject, project: idProject, teacher: email, note, description }
                    }
                )
                Swal.fire(
                    'Realizado!',
                    'La nota ha sido agregada corretamente',
                    'success'
                )
                //window.location.href = './insideCourse'
                setTimeout(students(addresponse.data.addNote.notes._id),2000);
            }
            
        })
    }

    return (
        <div className="container">
            <Card className="text-center" style={{ width: '23rem' }}>
                <Card.Body className="card-body">
                    <Card.Subtitle className="mb-2 text-muted">EducaTEam</Card.Subtitle>
                    <InputGroup className="mb-3">
                        <FloatingLabel style={{ width: '20rem' }} controlId="floatingTextarea2" label="Titulo de la Nota">
                            <Form.Control
                                as="textarea"
                                value={note}
                                onChange={e => setNote(e.target.value)}
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <FloatingLabel style={{ width: '20rem' }} controlId="floatingTextarea2" label="Descripcion">
                            <Form.Control
                                as="textarea"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                    </InputGroup>
                    <InputGroup className="justify-content-center">
                        <Button className="addNote" align="center" onClick={add}><AiOutlineSend size="1.5rem" color="rgb(22, 148, 232)" /></Button>
                    </InputGroup>
                </Card.Body>
            </Card>
        </div>
    )
}
export default AddNote;