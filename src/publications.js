import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

function parsePublication(obj) {
  // a helper to parse publication object
  const parsedObj = {
    title: obj.titles.title,
    doi: obj.doi.replace('https://doi.org/', ''),
    abstract: obj.abstract,
    journal: obj.titles['secondary-title']
  }

  parsedObj.authors = obj.contributors.map(name => {
    const firstName = name.split(', ')[1]
    const lastName = name.split(', ')[0]
    return firstName + ' ' + lastName
  })

  // I am the n-th author
  let myRank = parsedObj.authors.indexOf('Zichen Wang') + 1
  if (myRank === 0) {
    myRank = parsedObj.authors.indexOf('Zi-Chen Wang') + 1
  }
  parsedObj.myRank = myRank

  if (typeof (obj.dates) === 'object') {
    parsedObj.year = parseInt(obj.dates.year)
  } else {
    parsedObj.year = parseInt(obj.dates)
  }
  return parsedObj
}

class Publication extends Component {
  render() {
    const { data } = this.props
    const nAuthors = data.authors.length
    return (
      <li>
        <a className='title' href={'http://dx.doi.org/' + data.doi} target='_blank' rel='noopener noreferrer'>
          {data.title}
        </a>
        <p className='authors'>
          {data.authors.map((a, i) => {
            let className = ''
            if (a === 'Zichen Wang' || a === 'Zi-Chen Wang') {
              className = 'author-self'
            }
            if (i !== nAuthors - 1) {
              return (<span key={i}><span className={className}>{a}</span><span>, </span></span>)
            } else {
              return (<span key={i} className={className}>{a}</span>)
            }
          })}
        </p>
        <p><span className='journal'>{data.journal}</span>, <span className='year'>{data.year}</span></p>
      </li>
    )
  }
}

class Publications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data,
      nextSortKey: 'myRank'
    }
    this.handleBtnClick = this.handleBtnClick.bind(this)
  }

  handleBtnClick() {
    // toggle the nextSortKey between year and myRank
    const nextSortKey = this.state.nextSortKey === 'year' ? 'myRank' : 'year'
    // let the parent handle re-resorting
    this.props.onSortBtnClick(this.state.nextSortKey)
    this.setState({ nextSortKey: nextSortKey })
  }

  render() {
    if (this.props.data) {
      const { data } = this.props
      return (
        <section>
          <Button variant='outline-primary' onClick={this.handleBtnClick} className='my-2'>Sort by {this.state.nextSortKey}</Button>
          <ol style={{ overflowY: 'auto', maxHeight: this.props.maxHeight || 800 }}>
            {data.map((pub, i) => {
              return <Publication data={pub} key={i} />
            })}
          </ol>
        </section>
      )
    } else {
      return <ol />
    }
  }
}

export default Publications
export { Publications, Publication, parsePublication }
