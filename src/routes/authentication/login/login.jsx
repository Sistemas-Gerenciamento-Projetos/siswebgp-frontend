import React from 'react'
import { Container, Row, Col,Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CapaCienciaImg from '../../../assets/capa-ciencia-da-computacao.jpeg'
import CompUfba from '../../../assets/qmgqqq5s.png'
import './login.scss'




function Login() {
  return (
    <Container className='container-login'>
      <Row>
        <Col className='col-left' sm={3}>
          {/* <img src={CapaCienciaImg} alt='ciencia da computacao' /> */}
        </Col>

        <Col className='col-center'sm={9}>
          <h1>Sistema de Gestão de Projetos</h1> 
          <Row className='row-form-login'>
            <Col s={6}>
              <h2>Login</h2>
              <Form className='form-login'>
                <Form.Group controlId='email'>
                  <Form.Control type='email' placeholder='Email'/>
                </Form.Group>

                <Form.Group controlId='password'>
                  <Form.Label>Senha</Form.Label>
                  <Form.Control type='password' placeholder='Senha'/>
                </Form.Group>

                <div className="d-grid">
                  <Button className='mt-3' type='submit'  variant='primary' >
                  Entrar
                </Button>  
                </div>

                <Col className='cadastre-esqueci-senha'>
                  <Link className='register'to='/register/'>Cadastre-se</Link>  
                  <Link className= 'esqueci' to='#'>Esqueci a Senha</Link>
                </Col>
              </Form>
            </Col>
            <Col className="col-right"sm={6} >
              <img src={CompUfba} alt='Computação Ufba'/>
            </Col>
          </Row>
        </Col>

      </Row>
    </Container>
  )
}

export default Login


{/* <h1 >Sistema de Gestão de Projetos</h1>
      <Row>
        <Col>
          <h2>Login</h2>
        </Col>
        <Form>
          <Form.Group controlId='email'>
            <Form.Control type='email' placeholder='Email'/>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Senha</Form.Label>
            <Form.Control type='password' placeholder='Senha'/>
          </Form.Group>

          <Button class='mt-5' type='submit'  variant='primary'>
            Entrar
          </Button>

        </Form>
        <Row className='reg-senha'>
          <Col>
            <Link to='#'>Esqueci a Senha</Link>
          </Col>
          <Col>
            <Link to='/register/'>Cadastre-se</Link>
          </Col>
        </Row>
      </Row> */}
