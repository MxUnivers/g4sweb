import React, { useState } from 'react';
import { Tabs, Tab, Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import NavBarTop from '../../components/web/NavBarTop';
import NavBarWeb from '../../components/web/NavBarWeb';
import CheckoutCompo from '../../components/web/CheckoutCompo';
import SideBarWeb from '../../components/web/SideBarWeb';

const LoginPage = () => {
    const [key, setKey] = useState('login');

    return (
        <>
            <header id="rtsHeader">
                <NavBarTop />
                <NavBarWeb />
                <CheckoutCompo />
                <SideBarWeb />

                <div className="page-path">
                    <Container>
                        <div className="breadcrumbs-inner">
                            <h1 className="path-title">Login</h1>
                            <ul>
                                <li><a className="home-page-link" href="/">Accueil <i className="fal fa-angle-right"></i></a></li>
                                <li><a className="current-page" href="#">Compte</a></li>
                            </ul>
                        </div>
                    </Container>
                </div>
            </header>

            {/* Section Login/Inscription */}
            <div className="login-area py-5" style={{ minHeight: "100vh", justifyContent: "center", alignContent: "center" }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8} md={12}>
                            <Card>
                                <Card.Body>
                                    <Tabs
                                        id="login-register-tabs"
                                        activeKey={key}
                                        onSelect={(k) => setKey(k)}
                                        className="mb-3"
                                        justify
                                    >
                                        {/* 🟢 Onglet Connexion */}
                                        <Tab eventKey="login" title="Connexion">
                                            <Form>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Nom d{"'"}utilisateur ou email</Form.Label>
                                                    <Form.Control type="text" placeholder="Entrez votre nom ou email" required />
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Mot de passe</Form.Label>
                                                    <Form.Control type="password" placeholder="Mot de passe" required />
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Check type="checkbox" label="Se souvenir de moi" />
                                                </Form.Group>

                                                <Button variant="primary" type="submit" className="w-100">
                                                    Connexion
                                                </Button>

                                                <div className="mt-3 text-center">
                                                    <a href="#">Mot de passe oublié ?</a>
                                                </div>
                                            </Form>
                                        </Tab>

                                        {/* 🔵 Onglet Inscription */}
                                        <Tab eventKey="register" title="Inscription">
                                            <Form>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Nom d{"'"}utilisateur</Form.Label>
                                                    <Form.Control type="text" placeholder="Choisissez un nom d'utilisateur" required />
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="email" placeholder="Entrez votre email" required />
                                                </Form.Group>

                                                <Form.Group className="mb-3">
                                                    <Form.Label>Mot de passe</Form.Label>
                                                    <Form.Control type="password" placeholder="Créez un mot de passe" required />
                                                </Form.Group>

                                                <Button variant="success" type="submit" className="w-100">
                                                    S{"'"}inscrire
                                                </Button>
                                            </Form>
                                        </Tab>
                                    </Tabs>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default LoginPage;
