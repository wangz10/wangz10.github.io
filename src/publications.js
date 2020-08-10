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
  constructor(props) {
    super(props)
    this.state = {
      showAbstract: false
    }
    this.toggleAbstract = this.toggleAbstract.bind(this)
  }

  toggleAbstract() {
    this.setState({ showAbstract: !this.state.showAbstract })
  }

  render() {
    const { data } = this.props
    const nAuthors = data.authors.length

    // DOMs
    const titleP = (<a className='title' href={'http://dx.doi.org/' + data.doi} target='_blank' rel='noopener noreferrer'>
      {data.title}
                    </a>)

    const authorsP = (<p className='authors'>
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
                      </p>)

    const journalP = <p className='p-journal'><span className='journal'>{data.journal}</span>, <span className='year'>{data.year}</span></p>
    const abstractP = <p>{data.abstract}</p>
    const abstractBtn = <p>[<span className='abs-btn' onClick={this.toggleAbstract}>abstract</span>]</p>

    if (this.state.showAbstract) {
      return (
        <li>
          {titleP}
          {authorsP}
          {journalP}
          {abstractBtn}
          {abstractP}
        </li>
      )
    } else {
      return (
        <li>
          {titleP}
          {authorsP}
          {journalP}
          {abstractBtn}
        </li>
      )
    }
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
          <div>
            <a href='https://scholar.google.com/citations?user=bwLMCp4AAAAJ&hl=en' target='_blank' rel='noopener noreferrer'>Google Scholar</a>
          </div>
          <Button variant='outline-primary' onClick={this.handleBtnClick} className='my-2'>Sort by {this.state.nextSortKey}</Button>
          <ol>
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
