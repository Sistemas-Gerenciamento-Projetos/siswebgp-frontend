import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import {Link} from 'react-router-dom'
// import {checkPasswordComplexity} from '../../utilities/index'

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
    <Container>
      <Row>
        <Col>
        <h1>Registre-se</h1>
        <Form>

          <Form.Group controlId='name'>
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control type='name' placeholder= 'Enter Full Name' 
              value={name}
              onChange={e=> setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder= 'Enter Email' 
              value={email}
              onChange={e=> setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='Password'>
            <Form.Label>Senha</Form.Label>
            <Form.Control type='password' placeholder= 'Enter Password'
              value={password}
              onChange={e=> setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='ConfirmPassword'>
            <Form.Label>Confirme a Senha</Form.Label>
            <Form.Control type='password' placeholder= 'Enter Confirm Password'
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
          <Button type='submit' variant= 'primary' disabled={!registerButtonEnabled}>Register</Button> 
        </Form>
        </Col>
      </Row>
      <Col>
        <Link to= "login"> Faça seu Login</Link> Se você já possue conta
      </Col>

    </Container>
  )
}

export default Registration