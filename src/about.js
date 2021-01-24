import React from 'react'
import { Container, Row, Col, Jumbotron } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedinIn,
  faTwitter,
  faGithub,
  faMediumM,
  faGoogle,
  faResearchgate,
  faOrcid
} from '@fortawesome/free-brands-svg-icons'

function About() {
  return (
    <Jumbotron fluid id='about'>
      <Container fluid>
        <Row className='justify-content-md-center'>
          <Col md={10} sm={12} className='mt-3'>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ display: 'block' }}>
                  <img className='portrait' src='./assets/Zichen_Wang_1x1.jpg' alt='Zichen Wang' />
                  <h3 className='text-center'>Zichen Wang, PhD</h3>
                  <h4 className='text-center'>Principal Scientist @ Sema4</h4>
                  <ul className='social-links text-center'>
                    <li><a target='_blank' rel='noopener noreferrer' href='https://twitter.com/ZichenWangPhD' title='Twitter'><FontAwesomeIcon icon={faTwitter} /></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href='https://github.com/wangz10' title='GitHub'><FontAwesomeIcon icon={faGithub} /></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/zichenwang/' title='LinkedIn'><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href='https://wangz10.medium.com/' title='Medium'><FontAwesomeIcon icon={faMediumM} /></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href='https://scholar.google.com/citations?user=bwLMCp4AAAAJ&hl=en' title='Google Scholar'><FontAwesomeIcon icon={faGoogle} /></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href='https://www.researchgate.net/profile/Zichen_Wang' title='ResearchGate'><FontAwesomeIcon icon={faResearchgate} /></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href='http://orcid.org/0000-0002-1415-1286' title='ORCID'><FontAwesomeIcon icon={faOrcid} /></a></li>
                  </ul>
                </div>
              </Col>
              <Col md={8} xs={12}>
                <h1>About</h1>
                <p className='lead'>
                  Currently a principal data scientist at{' '}
                  <a href='https://sema4.com/' target='_blank' rel='noopener noreferrer'>
                    Sema4
                  </a>, I am a machine learning expert in biology and medicine, experienced with high-dimensional biomedical data including multi-omics (transcriptomics and proteomics) and longitudinal electronic medical/health records (EMR/EHR). I have been working on understanding human diseases and improving clinical medicine with data. I am passionate about many research areas in ML/DL including graph neural networks, contrastive learning, deep generative models (e.g. VAE and GANs), natural language processing (NLP) and reinforcement learning (RL).
                </p>
                <p className='lead'>
                  I received my PhD in 2016 from Icahn School of Medicine at Mount Sinai and was advised by <a href='https://icahn.mssm.edu/profiles/avi-maayan' target='_blank' rel='noopener noreferrer'>Avi Ma'ayan</a>, with whom I continued working on multiple research projects on understanding how drugs work in biological systems using computational biology. I developed solid software engineering skills in making interactive data visualizations and web applications.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  )
}
export default About
