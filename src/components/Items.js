
import React, { Component } from 'react';

export default class Items extends Component {
  render() {
  
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;

    return (
      <>
        <div className="card container border-light mb-4 mx-auto" style={{ width: "400px " }}>
          <img src={imageUrl} className="card-img-top" alt="..." style={{ width: "400px", height: "300px" }} />

         <h5 className='my-3'> <div className="position-absolute top-0 start-100 translate-middle badge bg-danger text-light badge-lg">
            {source}
          </div>
          </h5>

          <div className="card-body container" >

            <h5 className="card-title">{title}.....</h5>
            <p className="card-text">{description}.....</p>
            <p className="card-text text-center"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()}
            </small></p>
            {/* Using dynamic value for href */}
            <div className="text-center">
              <a href={newsUrl} target="_blank" className="btn btn-info">Read More</a>
            </div>
          </div>
        </div>
      </>
    );
  }
}
