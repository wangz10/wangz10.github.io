import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

function ListItem(props) {
  return <li className='list-inline-item'>{props.value}</li>
}
function DlItem(props) {
  return (
    <Row>
      <dt className='col-xs-3 skill-subcategory'>{props.objectKey}:</dt>
      <dd className='col-xs-9'>{props.value}</dd>
    </Row>)
}

class ResumeEducation extends Component {
  render() {
    const { data } = this.props
    const itemDOMs = []
    for (const item of data) {
      itemDOMs.push(
        <Row key={item.name} className='resume-right-row'>
          <Col xs={12}>
            <h4 className='strike-through'>
              <span>{item.name}</span> <span className='date'>{item.date}</span>
            </h4>
            <div className='area'>{item.degree} in {item.area}</div>
            <div className='summary'>{item.summary}</div>
          </Col>
        </Row>)
    }
    return (
      <Row>
        <Col xs={3}>
          <span className='resume-heading'>Education</span>
        </Col>
        <Col xs={9}>
          {itemDOMs}
        </Col>
      </Row>)
  }
}

class ResumeWork extends Component {
  render() {
    const { data } = this.props
    const itemDOMs = data.map((item, i) => {
      return (
        <Row key={i} className='resume-right-row'>
          <Col xs={12}>
            <h4 className='strike-through'>
              <span>{item.name}</span> <span className='date'>{item.date}</span>
            </h4>
            <div className='position'>{item.position}</div>
            <div className='summary'>{item.summary}</div>
          </Col>
        </Row>
      )
    })
    return (
      <Row>
        <Col xs={3}>
          <span className='resume-heading'>Work</span>
        </Col>
        <Col xs={9}>
          {itemDOMs}
        </Col>
      </Row>)
  }
}

class ResumeSkills extends Component {
  render() {
    const { data } = this.props
    const itemDOMs = []

    for (const skill of data) {
      const lists = []
      const hasSubLevel = !Array.isArray(skill.items)

      if (hasSubLevel) {
        for (const key of Object.keys(skill.items)) {
          const values = skill.items[key]
          lists.push(<DlItem key={key} objectKey={key} value={values.join(', ')} />)
        }
      } else {
        for (const item of skill.items) {
          lists.push(<ListItem key={item} value={item} />)
        }
      }

      if (hasSubLevel) {
        itemDOMs.push(
          <Row key={skill.category}>
            <Col xs={12}>
              <span className='skill-category'>{skill.category}</span>
              <dl className='container'>{lists}</dl>
            </Col>
          </Row>)
      } else {
        itemDOMs.push(
          <Row key={skill.category}>
            <Col xs={12}>
              <span className='skill-category'>{skill.category}</span>
              <ul className='list-inline'>{lists}</ul>
            </Col>
          </Row>)
      }
    }

    return (
      <Row>
        <Col xs={3}>
          <span className='resume-heading'>Skills</span>
        </Col>
        <Col xs={9}>
          {itemDOMs}
        </Col>
      </Row>)
  }
}

class Resume extends Component {
  render() {
    if (this.props.data) {
      const { data } = this.props
      return (
        <section className='resume'>
          <ResumeWork data={data.work} />
          <ResumeEducation data={data.education} />
          <ResumeSkills data={data.skills} />
        </section>
      )
    } else {
      return (
        <section className='resume' />
      )
    }
  }
}

export default Resume
