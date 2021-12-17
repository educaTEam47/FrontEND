import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { Card, InputGroup, Form, Button, FloatingLabel } from 'react-bootstrap';
import { validateql, updateNote } from '../mutations/mutation'
import { getNotql } from '../queries/queries'
import { useQuery, useMutation } from '@apollo/client'
import { AiOutlineSend } from 'react-icons/ai'
import Cookies from "universal-cookie";

function UpdateNote() {
    //console.log(token)
    const [id, setId] = useState("")
    const [email, setEmail] = useState("")
    const [note,setNote] = useState("")
    const [description,setDescription] = useState("")
    const cookies = new Cookies();
    let idNote=cookies.get('id-note')

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
    const response = async () => {
        const response1 = await validateForm(
            {
                variables: { token: tokenStorage }
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
                window.location.replace('./')
            }
            else {
                if (response1.data.validate.rol === "Lider") {
                    setId(response1.data.validate.id)
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

    const {data}= useQuery(getNotql,
        {
            variables:{idNote}
        })
    
    useEffect(()=>{
        if(data){
            if(data.getNot){
                if(data.getNot.notes){
                    setNote(data.getNot.notes.note)
                    setDescription(data.getNot.notes.description)
                }
            }
        }     
    },[data])

    const [editForm]=useMutation(updateNote)
    const add = async () =>{
        Swal.fire({
            title: '¿Esta seguro?',
            text: "Esta seguro de editar la nota",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero editar la nota!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const responseEdit = await editForm(
                    {
                        variables:{idNote,note,description}
                    }
                )
                Swal.fire(
                    'Realizado!',
                    'La nota ha sido editada correctamente',
                    'success'
                )
                window.location.href='./insideCourse'
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
export default UpdateNote