import React from 'react';

class GithubUser extends React.Component {
  constructor() {
    super();
    //this.setState = this.setState.bind(this);
    this.state = {
    };
  }
  render() {
  //console.log(this.props , this.props.params);
    return (
      <div className="followers-page">
        <figure className='user-info'>
          <img
            className='user-info__avatar'
            src={this.props.source}
            alt="one of the followers"/>
          <figcaption> {this.props.whosenameis} </figcaption>
        </figure>
      </div>
    )
  }
}

// https://api.github.com/users/${this.props.params.username}/followers?access_token=${API_KEY}

export default GithubUser;
