import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general',
  }
 
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor(){
    super();
    this.state = {
       articles: [],
       loading: false,
       page:1
    }
  }

 async componentDidMount(){
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e31cf5f0fe84a2482f0a7fdc006c732&page=1&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  this.setState({articles: parsedData.articles, totalResults:parsedData.totalResults})
}

handlePrevClick = async()=>{
  console.log("Previsous")
  
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e31cf5f0fe84a2482f0a7fdc006c732&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  this.setState({
    page: this.state.page - 1,
    articles: parsedData.articles
  })
}

handleNextClick = async()=>{
  console.log("Next")
  if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

  }

  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e31cf5f0fe84a2482f0a7fdc006c732&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData = await data.json()
  console.log(parsedData);
  this.setState({
    page: this.state.page + 1,
    articles: parsedData.articles
  })

}
  render() {
    return (
      <div className='container my-3'>
      <h1  style={{margin: '30px 0px'}}>Newsapp-Top Headline..</h1>
      <div className="row">
       {this.state.articles.map((element)=>{
        return <div className="col-md-4" key={element.url}>
        <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
        </div>
})}
      </div>  
      <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div>
   </div>
    )
  }
}

export default News

