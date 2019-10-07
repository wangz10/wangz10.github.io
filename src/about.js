import React from 'react'
import { Container, Row, Col, Jumbotron, Button } from 'react-bootstrap'

function About() {
  return (
    <Jumbotron fluid id='about'>
      <Container fluid>
        <Row className='justify-content-md-center'>
          <Col md={10}>
            <h1>About</h1>
            <p className='lead'>
              Currently a principal data scientist at{' '}
              <a href='https://sema4.com/' target='_blank' rel='noopener noreferrer'>
                Sema4
              </a>
              , I am experienced in working with high-dimensional biomedical data
                (multi-omics and longitudinal electronic medical records, EMR) using
                various approaches including exploratory analysis, multivariate
                statistics, network analysis and Machine Learning (supervised learning
                and representation learning). I am passionate about many research
                areas in ML including Deep Learning (DL), Natural Language Processing
                (NLP) and Reinforcement Learning (RL). I also make interactive data
                visualizations and web applications to let the data speak for
                themselves and allow users to query the data. Check out my projects
                and publications for more details.
            </p>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  )
}
export default About
