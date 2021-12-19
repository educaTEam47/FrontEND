

import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { Card,Button, Navbar, Alert, } from 'react-bootstrap';
import { validateql} from '../mutations/mutation'
import { getUserql, getNotql } from '../queries/queries'
import { useQuery, useMutation } from '@apollo/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'

function Profile() {

    const [idNoteArray, setIdNote] = useState([])
    const [idNote, setidNoteID] = useState("")
    const [email, setEmail] = useState("")

    //---------------VALIDATE LOGIN     -------------------------------------------------------------------
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

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
            }
            else {
                if (response1.data.validate.rol !== "") {
                    setRole(response1.data.validate.rol);
                    setName(response1.data.validate.nombres);
                    setEmail(response1.data.validate.email)
                    setAuth(response1.data.validate.validacion)
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
    //###############################LOGIN VALIDATE###############################################################

    const testInfo = () => {
        console.log(email)
        console.log(role);
        console.log(name);
    }
    const datauser = useQuery(getUserql,
        {
            variables: { email },
        });
    console.log(datauser.data)
    useEffect(() => {
        if (datauser.data) {
            if (datauser.data.getUser.user) {
                if (datauser.data.getUser.user.EstadoNote) {
                    setIdNote(datauser.data.getUser.user.EstadoNote[datauser.data.getUser.user.EstadoNote.length - 1])
                }
            }
        }
    }, [datauser])
    //console.log(idNoteArray.note)

    const { data } = useQuery(getNotql, {
        variables: { idNote: idNoteArray.note }
    })
    console.log(data)
    const [tittle,setTittle]=useState("")
    const [nota,SetNota]= useState("")
    useEffect(()=>{
        if(data){
            if(data.getNot){
                if(data.getNot.notes){
                    SetNota(data.getNot.notes.note)
                    setTittle(data.getNot.notes.project.tittle)
                }
            }
        }
    },[data])

    const [show, setShow] = useState(true);

    return (
        <div className="container">
            <Navbar fixed="bottom">
                {
                    !idNoteArray.estado>0 &&
                    <>
                        <Alert show={show} variant="success">
                            <Alert.Heading>{tittle}</Alert.Heading>
                            <p>
                                {nota}
                            </p>
                            <hr />
                            <div className="d-flex justify-content-end">
                                <Button onClick={() => setShow(false)} variant="outline-success">
                                    Cerrar Notificacion
                                </Button>
                            </div>
                        </Alert>

                        {!show && <Button onClick={() => setShow(true)}>Notificacion</Button>}
                    </>
                }
            </Navbar>
            <Card className="text-center">
                <Card.Header></Card.Header>
                <Card.Body>
                    <Card.Title>Bienvenid@ {name}</Card.Title>
                    <Card.Text>
                        <h1>Disfruta de nuestros servicios</h1>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted"><h4>EducaTEam, de la academia a tu mesa</h4></Card.Footer>
            </Card>
        </div>
    )
}

export default Profile;