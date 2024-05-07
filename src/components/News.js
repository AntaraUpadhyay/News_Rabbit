import React, { Component } from 'react';
import Items from './Items';
import PropTypes from 'prop-types';
import Symbol from './Symbol';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
  }

  capitalize = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      pageSize: 9
    };
    document.title = `News Rabbit - ${this.capitalize(this.props.category)} Category`;
  }

  async componentDidMount() {
    await this.fetchArticles();
  }

  fetchArticles = async () => {
    const { page, pageSize } = this.state;
    const url = `
    https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d2f46f22375a409d9be179459e2ac76a`;
    this.setState({ loading: true });
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ articles: data.articles, loading: false });
  };

  handlePrev = async () => {
    await this.setState(prevState => ({ page: prevState.page - 1 }));
    await this.fetchArticles();
  };

  handleNext = async () => {
    await this.setState(prevState => ({ page: prevState.page + 1 }));
    await this.fetchArticles();
  };

  render() {
    const { articles, page, loading } = this.state;
    const pageSize = 6;

    // Calculate start and end index for articles to be displayed on current page
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedArticles = articles.slice(startIndex, endIndex);

    return (
      <>
        <div className='container my-3 '>
          <h1 className='text-center my-3 '> NewsRabbit - Top {this.capitalize(this.props.category)} Headlines</h1>


          {loading ? (
            <div style={{ textAlign: 'center' }}><Symbol /></div>
          ) : null}

          <div className="row">
            {displayedArticles.map((element) => (
              <div className="col-md-4" key={element.url}>
                <Items
                  title={element.title ? element.title.slice(0, 30) : ""}
                  description={element.description ? element.description.slice(0, 200) : ""}
                  newsUrl={element.url}
                  imageUrl={element.urlToImage ? element.urlToImage : "https://i0.wp.com/9to5mac.com/wp-content/uploads/sites/6/2023/07/macos-malware.webp?resize=1200%2C628&quality=82&strip=all&ssl=1"}
                  contentUrl={element.content}
                  author={element.author ? element.author : "Unknown"}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>

            ))}
          </div>

        </div>


        <div className="container d-flex justify-content-between">
          <button type="button" disabled={page <= 1 || loading} className="btn btn-info btn-lg" onClick={this.handlePrev}>&larr; Previous</button>
          <button type="button" disabled={articles.length === 0 || loading || endIndex >= articles.length} className="btn btn-info btn-lg" onClick={this.handleNext}>Next &rarr;</button>
        </div>


      </>
    );
  }
}

export default News;
