import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { Card, InputGroup, Form, Button, FloatingLabel, Row, Col, Navbar } from 'react-bootstrap';
import { createProjectql, validateql, addTeacherql } from '../mutations/mutation'
import { FcInfo } from 'react-icons/fc'
import { AiFillEdit, AiOutlineUserAdd, AiFillEye, AiOutlineSend } from 'react-icons/ai'
import { FiDelete } from 'react-icons/fi'
import { getUserql, getNoteql } from '../queries/queries'
import Cookies from "universal-cookie";
import { useMutation, useQuery } from '@apollo/client'

function ResponseNote (){
    const cookies = new Cookies();
    let idNote = cookies.get('id-note')
    console.log(idNote)
    return(
        <div>

        </div>
    )
}
export default ResponseNote;