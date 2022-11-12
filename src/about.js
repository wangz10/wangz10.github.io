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
                  <h4 className='text-center'>Sr Applied Scientist @ Amazon</h4>
                  <ul className='social-links text-center'>
                    <li><a target='_blank' rel='noopener noreferrer' href='https://twitter.com/ZichenWangPhD' title='Twitter'><FontAwesomeIcon icon={faTwitter} /></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href='https://github.com/wangz10' title='GitHub'><FontAwesomeIcon icon={faGithub} /></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/zichenwang/' title='LinkedIn'><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href='https://wangz10.medium.com/' title='Medium'><FontAwesomeIcon icon={faMediumM} /></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href='https://scholar.google.com/citations?user=bwLMCp4AAAAJ' title='Google Scholar'><FontAwesomeIcon icon={faGoogle} /></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href='https://www.researchgate.net/profile/Zichen_Wang' title='ResearchGate'><FontAwesomeIcon icon={faResearchgate} /></a></li>
                    <li><a target='_blank' rel='noopener noreferrer' href='http://orcid.org/0000-0002-1415-1286' title='ORCID'><FontAwesomeIcon icon={faOrcid} /></a></li>
                  </ul>
                </div>
              </Col>
              <Col md={8} xs={12}>
                <h1>About</h1>
                <p className='lead'>
                  I am a senior applied scientist at {' '}
                  <a href='https://aws.amazon.com/ml-solutions-lab/' target='_blank' rel='noopener noreferrer'>
                    Amazon Machine Learning (ML) Solutions Lab
                  </a> within {' '}
                  <a href='https://aws.amazon.com/' target='_blank' rel='noopener noreferrer'>
                    AWS
                  </a>. I am interested in various research areas in ML, including graph neural networks (GNN), natural language processing (NLP), generative models, contrastive learning and reinforcement learning.
                  I have over 10 years of experience in life sciences and healthcare. In the past, I worked on developing ML methods leveraging biomedical data including biological sequences, multi-omics, and longitudinal electronic health records (EHR), for drug discovery and modeling of human diseases.
                </p>
                <p className='lead'>
                  I obtained my PhD in 2016 from <a href='https://icahn.mssm.edu/' target='_blank' rel='noopener noreferrer'> Icahn School of Medicine at Mount Sinai</a> and was advised by <a href='https://icahn.mssm.edu/profiles/avi-maayan' target='_blank' rel='noopener noreferrer'>Avi Ma'ayan</a>, with whom I continued working on multiple research projects on understanding how drugs work in biological systems using computational biology. I developed solid software engineering skills in making interactive data visualizations and web applications.
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
