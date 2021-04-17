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
import {
  faLinkedinIn,
  faTwitter,
  faGithub,
  faMediumM,
  faGoogle,
  faResearchgate,
  faOrcid
} from '@fortawesome/free-brands-svg-icons'
import './App.css'

// individual sections
import About from './about'
import Resume from './resume'
import './resume.css'
import { Publications, parsePublication } from './publications'
import './publications.css'
import Projects from './projects'
import Softwares from './softwares'
class NavLink extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    // smoothly scroll to target with offset
    event.preventDefault()
    // remove the leading "#"
    const targetId = this.props.href.slice(1)
    const el = document.getElementById(targetId)
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = el.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - 72

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }

  render() {
    return <a className='nav-link' href={this.props.href} onClick={(e) => this.handleClick(e)}>{this.props.name}</a>
  }
}
// navbar with scrollspy
const navbar = (
  <Navbar fixed='top' variant='dark' style={{ backgroundColor: '#0089A7' }} expand='sm'>
    <Navbar.Brand href='#'>Zichen Wang, PhD</Navbar.Brand>
    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
    <Navbar.Collapse id='responsive-navbar-nav'>
      <Scrollspy
        items={['about', 'resume', 'projects', 'softwares', 'publications']}
        offset={-72}
        currentClassName='nav-item active'
        className='navbar-nav mr-auto'
      >
        <Nav.Item as='li'>
          <NavLink href='#about' name='About' />
        </Nav.Item>
        <Nav.Item as='li'>
          <NavLink href='#resume' name='Resume' />
        </Nav.Item>
        <Nav.Item as='li'>
          <NavLink href='#projects' name='Projects' />
        </Nav.Item>
        <Nav.Item as='li'>
          <NavLink href='#softwares' name='Softwares' />
        </Nav.Item>
        <Nav.Item as='li'>
          <NavLink href='#publications' name='Publications' />
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
      pubData: null,
      softwareData: null
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

  getSoftwareData() {
    fetch('./assets/softwares.json').then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Something went wrong when fetching data ...')
      }
    }).then(data => {
      this.setState({ softwareData: data })
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
    this.getSoftwareData()
  }

  render() {
    return (
      <div>
        {navbar}
        <About />
        <Container fluid={true}>
          <Row id='resume' className='justify-content-md-center'>
            <Col md={10} sm={12}>
              <Button variant='outline-info' href='./assets/Zichen_Wang_Resume-04172021.pdf' className='my-2 mr-2' download>
                Resume <FontAwesomeIcon icon={faDownload} />
              </Button>
              <Button variant='outline-info' href='./assets/Zichen_Wang_CV-04172021.pdf' className='my-2 ml-2' download>
                CV <FontAwesomeIcon icon={faDownload} />
              </Button>
              <Resume data={this.state.resumeData} />

            </Col>
          </Row>
          <Row id='projects' className='justify-content-md-center'>
            <Col md={10} sm={12}>
              <h1>Selected Projects</h1>
              <Projects data={this.state.projData} />
            </Col>
          </Row>
          <Row id='softwares' className='justify-content-md-center'>
            <Col md={10} sm={12}>
              <h1>Softwares</h1>
              <Softwares data={this.state.softwareData} />
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
            <ul className='social-links text-center'>
              <li><a target='_blank' rel='noopener noreferrer' href='https://twitter.com/ZichenWangPhD' title='Twitter'><FontAwesomeIcon icon={faTwitter} /></a></li>
              <li><a target='_blank' rel='noopener noreferrer' href='https://github.com/wangz10' title='GitHub'><FontAwesomeIcon icon={faGithub} /></a></li>
              <li><a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/zichenwang/' title='LinkedIn'><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
              <li><a target='_blank' rel='noopener noreferrer' href='https://wangz10.medium.com/' title='Medium'><FontAwesomeIcon icon={faMediumM} /></a></li>
              <li><a target='_blank' rel='noopener noreferrer' href='https://scholar.google.com/citations?user=bwLMCp4AAAAJ&hl=en' title='Google Scholar'><FontAwesomeIcon icon={faGoogle} /></a></li>
              <li><a target='_blank' rel='noopener noreferrer' href='https://www.researchgate.net/profile/Zichen_Wang' title='ResearchGate'><FontAwesomeIcon icon={faResearchgate} /></a></li>
              <li><a target='_blank' rel='noopener noreferrer' href='http://orcid.org/0000-0002-1415-1286' title='ORCID'><FontAwesomeIcon icon={faOrcid} /></a></li>
            </ul>
            <p className='m-0 text-center text-white'>All rights reserved.</p>
          </Container>
        </footer>
      </div>
    )
  }
}

export default App
