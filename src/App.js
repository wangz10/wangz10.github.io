import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Navbar,
  Jumbotron,
  Button
} from 'react-bootstrap'
import Scrollspy from 'react-scrollspy'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

import logo from './logo.svg'
import './App.css'

// individual sections
import About from './about'
import Resume from './Resume'
import './resume.css'

const rootElem = document.getElementById('root')

// navbar with scrollspy
const navbar = (
  <Navbar fixed='top' variant='dark' style={{ backgroundColor: '#0089A7' }}>
    <Navbar.Brand href='#'>Zichen Wang, PhD</Navbar.Brand>
    <Scrollspy
      items={['about', 'resume', 'projects', 'publications', 'miscs']}
      offset={-56}
      currentClassName='nav-item active'
      className='navbar-nav'
    >
      <li className='nav-item active'>
        <a className='nav-link' href='#about'>
          About
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#resume'>
          Resume
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#projects'>
          Projects
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#publications'>
          Publications
        </a>
      </li>
      <li className='nav-item'>
        <a className='nav-link' href='#miscs'>
          Misc.
        </a>
      </li>
    </Scrollspy>
  </Navbar>
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resumeData: null
    }
  }

  getResumeData() {
    fetch('./assets/resumeData.json').then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Something went wrong when fetching data ...')
      }
    }).then(data => {
      this.setState({ resumeData: data })
    })
  }

  componentDidMount() {
    this.getResumeData()
  }

  render() {
    return (
      <div>
        {navbar}
        <About />
        <Container id='resume' fluid={true}>
          <Row className='justify-content-md-center'>
            <Col md={10}>
              <Button variant='outline-info' href='./assets/Zichen_Wang_Resume-10052019.pdf' className='my-2 mr-2' download>
                Resume <FontAwesomeIcon icon={faDownload} />
              </Button>
              <Button variant='outline-info' href='./assets/Zichen_Wang_CV-09102019.pdf' className='my-2 ml-2' download>
                CV <FontAwesomeIcon icon={faDownload} />
              </Button>
              <Resume data={this.state.resumeData} />

            </Col>
          </Row>
          <Row id='projects' className='justify-content-md-center'>
            <Col md={10}>Sec 2</Col>
          </Row>
          <Row id='publications' className='justify-content-md-center'>
            <Col md={10}>Sec 3</Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default App
