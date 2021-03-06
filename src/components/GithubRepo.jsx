import React from 'react';
var Infinite = require('react-infinite');

class GithubRepo extends React.Component {
  constructor() {
    super();
    //this.setState = this.setState.bind(this);
    this.state = {
      page:1,
      loading:false,
      repositories:[]
    };
  }

  _fetchData = () => {
    var API_KEY = `0729fb4557783bf62b9a7f4bd93d1069ed1714ba`;
    var url = `https://api.github.com/users/${this.props.params.username}/repos?access_token=${API_KEY}&page=1&per_page=50`;
    //`https://api.github.com/users/${this.props.params.username}/followers?access_token=${API_KEY}&page=1&per_page=50`;
    this.setState({loading:true});
    fetch(url)
    .then(res => res.json()).then(response => {
      this.setState({repositories : this.state.repositories.concat(response)
      ,loading: false ,page: this.state.page + 1})
    }
    )
  }

  componentDidMount(){
    this._fetchData();
  }

  _repositoriesHandler = (repo) => {
    return (
      <li key={repo.id}>
        <a href={repo.html_url}>
          <p>{repo.name} by {repo.owner.login}</p>
        </a>
      </li>
    );
  }

  render() {
    return (
      <div className="repos-page">
        <ul>
          <Infinite
            isInfiniteLoading={this.state.loading}
            onInfiniteLoad={this._fetchData}
            containerHeight={200}
            elementHeight={50}
            useWindowAsScrollContainer={true}
            infiniteLoadBeginEdgeOffset={100}
            loadingSpinnerDelegate={<div>LOADING</div>}>
            {this.state.repositories.map(this._repositoriesHandler)}
          </Infinite>
        </ul>
      </div>
    )
  }
}

// https://api.github.com/users/${this.props.params.username}/followers?access_token=${API_KEY}

export default GithubRepo;
