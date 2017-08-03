import React from 'react';
import GithubUser from './GithubUser';
import { Link } from 'react-router';
var Infinite = require('react-infinite');
var count = 0;

class Following extends React.Component {
  constructor() {
    super();
    //this.setState = this.setState.bind(this);
    this.state = {
      page:1,
      loading:false,
      following:[]
    };
  }

  fetchData = () => {
    var API_KEY = `0729fb4557783bf62b9a7f4bd93d1069ed1714ba`;
    var url = `https://api.github.com/users/${this.props.params.username}/following?access_token=${API_KEY}&page=1&per_page=50`;
    this.setState({loading:true});
    fetch(url)
    .then(res => res.json()).then(response => {
      this.setState({
        following:this.state.following.concat(response),
        loading: false,
        page: this.state.page + 1
      })
    }
    )
  }

  componentDidMount(){
    this.fetchData();
  }

  // componentDidUpdate(prevProps, prevState){
  //   if (this.props.username !== prevProps.username) {
  //     this.fetchData();
  //   }
  // }

  _followerHandler = (user_person) => {
    //console.log(user_person);
    return (
        <li key={++count + user_person.id}>
          <Link to={`/user/${user_person.login}`}>
            <GithubUser  source={user_person.avatar_url} whosenameis={user_person.login}/>
          </Link>
        </li>
    );
  }

  render() {
    //console.log(++count, "The number of times follow handler is run")
    if (!this.state.following) {
      return <div>LOADING FOLLOWED USERS....</div>
    } else {
      return (
        <div className="followers-page">
          <h3>Page of {this.props.params.username}</h3>
          <ul>
            <Infinite
              isInfiniteLoading={this.state.loading}
              onInfiniteLoad={this.fetchData}
              containerHeight={200}
              elementHeight={50}
              useWindowAsScrollContainer={true}
              infiniteLoadBeginEdgeOffset={100}>
              {this.state.following.map(this._followerHandler)}
            </Infinite>
          </ul>
        </div>
      )
    }
  }
}

// https://api.github.com/users/${this.props.params.username}/followers?access_token=${API_KEY}

export default Following;
