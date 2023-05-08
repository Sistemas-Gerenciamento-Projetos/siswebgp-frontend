import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './register.scss'


import { EnterOutlined} from '@ant-design/icons'

const Registration = () =>{

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const registerButtonEnabled = (name && email && password && confirmPassword)

  const [ passwordGood, setPasswordGood] = useState(false)

  // useEffect ( ()=>{
  //   if (checkPasswordComplexity (password,confirmPassword).length === 0){
  //     setPasswordGood(true)
  //   }else{
  //     setPasswordGood(false)
  //   }
  // }, [name, email, password, confirmPassword, passwordGood] )


  return (
    <Container className='cadastro-container'>
      <Row>
        <Col>
        <Form className='form-cadastro'>
          <h1>Cadastro</h1>
          <Form.Group controlId='name'>
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control type='name' placeholder= 'Nome Completo' className='place-holder-text' 
              value={name}
              onChange={e=> setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder= 'Email' className='place-holder-text' 
              value={email}
              onChange={e=> setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='Password'>
            <Form.Label>Senha</Form.Label>
            <Form.Control type='password' placeholder= 'Senha' className='place-holder-text' 
              value={password}
              onChange={e=> setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='ConfirmPassword'>
            <Form.Label>Confirme a Senha</Form.Label>
            <Form.Control type='password' placeholder= 'Confirmar Senha' className='place-holder-text' 
              value={confirmPassword}
              onChange={e=> setConfirmPassword(e.target.value)}
            />
          </Form.Group>

            {/* { passwordGood ? (<div>Senha forte o suficiente</div>): (
               <Alert variant='danger' style={{backgroundColor: "yellow"}}
              {...checkPasswordComplexity(password,confirmPassword).map( e => {
                if (e){ 
                  console.log(e)
                  return <p key={e}>{e}</p>
                }
                else <div></div>
                })}/>)} */}


          

          <div className="d-grid">
           <Button type='submit' variant= 'primary' disabled={false}>Cadastrar</Button> 
          </div>
          <Col>
          <Row className='retornar'>
            <Col className=''><Button className='btn-retornar btn btn-link'><EnterOutlined className='icon-enter'  /><p>Retornar </p> </Button> </Col>            
            <Col className='comp-image' /> 
          </Row>
      </Col>
        </Form>
        

        </Col>
      </Row>
      

    </Container>
  )
}

export default Registration