import React, { Component } from 'react'

import { Navbar, Input, Button, InputGroup, InputGroupAddon, Container, Col, Form,
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Row, Spinner 
  } from 'reactstrap'

import { MdSearch, MdStar } from 'react-icons/md'

import axios from 'axios'

import { Link } from "react-router-dom" // é tipo o a do html


class Home extends Component {

    state = {
        carregando: false,
        asteroide: []

    }




    universo = async (evento) => {
        evento.preventDefault()

        this.setState({ carregando : true})


        const form = evento.target
        const InputGroup = form.children[0]
        const input = InputGroup.children[0]


        // const { data : seguidores} = await axios(`https://api.github.com/users/${input.value}/followers`) --- outra forma de fazer 

        // const seguidores = await axios(`https://api.github.com/users/${input.value}/followers`)

        const asteroide = await axios(`https://api.nasa.gov/planetary/apod?date=${input.value}&api_key=EYtm3BpkpGLj0SlO1hkjn1eVBgfMFPdu9BSOni27`)   //.catch axios pesquisar

        // this.setState({seguidores})

        this.setState({ asteroide: [asteroide.data, ...this.state.asteroide ], carregando : false}) 



        // https://api.nasa.gov/planetary/apod?api_key=EYtm3BpkpGLj0SlO1hkjn1eVBgfMFPdu9BSOni27

        // https://api.nasa.gov/



    }


    render(){
        return (
            <>
            <Navbar color ="dark">
                <Container className="d-flex justify-content-center">
                    <img 
                    className="rounded-circle border border-white mr-3" 
                    width="50" src="https://thispersondoesnotexist.com/image" alt="Pessoa aleatoria"/>
                    <span className="text-white">
                        Logado como 
                        <Link className="text-white font-weight-bold ml-3" to="/">
                        {this.props.match.params.usuario}
                        </Link>
                        </span>
                </Container>
            </Navbar>

                <Navbar color ="dark" fixed="bottom">
                    <Container className="d-flex justify-content-center">
                        <Col xs="12" md="6">
                            <Form onSubmit={this.universo}>
                            <InputGroup>
                                <Input type="date"/>
                                <InputGroupAddon addonType="append">
                                    <Button color="danger">            
                                        {this.state.carregando ? ( <Spinner color="light" size="sm" /> ) :  (<MdSearch size="20" />)}
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                            </Form>
                        </Col>
                    </Container>
                </Navbar>

                { this.state.asteroide.length=== 0 && (<Container className="h-100 d-flex justify-content-center align-items-center">
                    <MdStar color="#f8f8f8" size="40" />
                    <h3 class="text-dark"> Digite abaixo uma data para saber sobre o asteroide. </h3>
                    <MdStar color="#000" size="40" />

                </Container>
                )}   

                { this.state.carregando ? ( 
                <Container className="h-100 d-flex flex-column justify-content-center align-items-center"> 
                    <Spinner color="light" size="lg" />
                    <span class="text-white">Carregando...</span>
                </Container> 
                ) : (
                <Container className="mt-3 mb-5">
                    <Row>
                    {this.state.asteroide.map((asteroide) => (
                            <Col className="d-flex" xs="12" md="4">
                            <Card className="text-white mb-2" color="dark" >
                            <CardImg top width="100%" height="30%" src={asteroide.url} alt={asteroide.title} />
                            <CardBody>
                                <CardTitle className="h3 text-center">{asteroide.title}</CardTitle>
                                <CardSubtitle className="text-muted text-center">{asteroide.date.split("-").reverse().join("/")}</CardSubtitle>
                                <CardText className="text-justify">{asteroide.explanation}</CardText>
                            </CardBody>
                          </Card>
                          </Col>
                    ) )}
                    </Row>
                </Container>



                )} 





                {/* { this.state.carregando && (
                <Container className="h-100 d-flex flex-column justify-content-center align-items-center"> 
                    <Spinner color="warning" size="lg" />
                    <span>Carregando...</span>
                </Container> 
                )} */} 

            </>
        )
    }
}

export default Home;