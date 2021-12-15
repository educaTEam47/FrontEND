import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { Card, InputGroup, FormControl, Button, DropdownButton, Row, Col, Navbar } from 'react-bootstrap';
import { createProjectql, validateql, addTeacherql } from '../mutations/mutation'
import { FcInfo } from 'react-icons/fc'
import { AiFillEdit, AiOutlineUserAdd, AiFillEye } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import { getUserql, getNoteql } from '../queries/queries'
import Cookies from "universal-cookie";
import { useMutation, useQuery } from '@apollo/client'

function InsideCourse() {
    const [email, setEmail] = useState("")
    const [auto, setAuto] = useState("")
    const [tittle, setTittle] = useState("")
    const [notes, setNotes] = useState([])
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

    const { data } = useQuery(getNoteql, {
        variables: { idProject }
    })
    console.log(data)
    useEffect(() => {
        if (data) {
            if (data.getNote.notes) {
                setNotes(data.getNote.notes)
            }
        }
    }, [data])
    console.log(notes)
    return (
        <div className="container">
            <Navbar className="justify-content-center">
                <Navbar.Brand>{tittle}</Navbar.Brand>
            </Navbar>
            <Row xs={1} md={3} className="g-20">
                {notes.map((val, key) => {
                    return (
                        <Col>
                            <Card className="text-center" style={{ width: '23rem' }}>
                                <Card.Body className="card-body">
                                    <Card.Title className="tittle">{val.note}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">EducaTEam</Card.Subtitle>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}
export default InsideCourse;