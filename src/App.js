import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Button
} from 'react-bootstrap'
import Scrollspy from 'react-scrollspy'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

import './App.css'

// individual sections
import About from './about'
import Resume from './resume'
import './resume.css'
import { Publications, parsePublication } from './publications'
import './publications.css'
import Projects from './projects'

// navbar with scrollspy
const navbar = (
  <Navbar fixed='top' variant='dark' style={{ backgroundColor: '#0089A7' }} expand='sm'>
    <Navbar.Brand href='#'>Zichen Wang, PhD</Navbar.Brand>
    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
    <Navbar.Collapse id='responsive-navbar-nav'>
      <Scrollspy
        items={['about', 'resume', 'projects', 'publications']}
        offset={-56}
        currentClassName='nav-item active'
        className='navbar-nav mr-auto'
      >
        <Nav.Item as='li'>
          <Nav.Link href='#about'>About</Nav.Link>
        </Nav.Item>
        <Nav.Item as='li'>
          <Nav.Link href='#resume'>Resume</Nav.Link>
        </Nav.Item>
        <Nav.Item as='li'>
          <Nav.Link href='#projects'>Projects</Nav.Link>
        </Nav.Item>
        <Nav.Item as='li'>
          <Nav.Link href='#publications'>Publications</Nav.Link>
        </Nav.Item>
      </Scrollspy>
    </Navbar.Collapse>
  </Navbar>
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resumeData: null,
      pubData: null
    }
    this.handleSortBtnClick = this.handleSortBtnClick.bind(this)
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

  getPublicationData() {
    fetch('./assets/publications.json').then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Something went wrong when fetching data ...')
      }
    }).then(data => {
      const parsedData = data.map((datum, i) => {
        return parsePublication(datum)
      })
      this.setState({ pubData: parsedData })
    })
  }

  getProjectData() {
    fetch('./assets/projects.json').then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Something went wrong when fetching data ...')
      }
    }).then(data => {
      this.setState({ projData: data })
    })
  }

  handleSortBtnClick(nextSortKey) {
    let sortedPubData = [].concat(this.state.pubData).sort((a, b) => b.year - a.year)
    if (nextSortKey === 'myRank') {
      sortedPubData = [].concat(this.state.pubData).sort((a, b) => a.myRank - b.myRank)
    }
    this.setState({ pubData: sortedPubData })
  }

  componentDidMount() {
    this.getResumeData()
    this.getPublicationData()
    this.getProjectData()
  }

  render() {
    return (
      <div>
        {navbar}
        <About />
        <Container fluid={true}>
          <Row id='resume' className='justify-content-md-center'>
            <Col md={10} sm={12}>
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
            <Col md={10} sm={12}>
              <h1>Projects</h1>
              <Projects data={this.state.projData} />
            </Col>
          </Row>
          <Row id='publications' className='justify-content-md-center'>
            <Col md={10} sm={12}>
              <h1>Publications</h1>
              <Publications data={this.state.pubData} onSortBtnClick={this.handleSortBtnClick} maxHeight={window.innerHeight} />
            </Col>
          </Row>
        </Container>
        <footer className='py-5'>
          <Container>
            <p className='m-0 text-center text-white'>All rights reserved.</p>
          </Container>
        </footer>
      </div>
    )
  }
}

export default App
