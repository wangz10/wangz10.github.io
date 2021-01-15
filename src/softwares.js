import React, { Component } from 'react'
import { Row } from 'react-bootstrap'

class Software extends Component {
  render() {
    const { data } = this.props
    const title = <a href={data.url} target='_blank' rel='noopener noreferrer' className='title'>{data.title}</a>
    const description = <p className='description'>{data.desc}</p>
    const sourceLink = <span> [<a href={data.source} target='_blank' rel='noopener noreferrer'>source code</a>]</span>

    if (data.source) {
      return (
        <li className='list-inline-item'>
          {title}
          {sourceLink}
          {description}

        </li>
      )
    } else {
      return (
        <li className='list-inline-item'>
          {title}
          {description}
        </li>
      )
    }
  }
}

class Softwares extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data
    }
  }

  render() {
    if (this.props.data) {
      const { data } = this.props
      const lis = []
      for (let i = 0; i < data.length; i++) {
        lis.push(<Software data={data[i]} key={i} />)
      }
      return (
        <Row>
          <ul>
            {lis}
          </ul>
        </Row>
      )
    } else {
      return <Row />
    }
  }
}

export default Softwares
