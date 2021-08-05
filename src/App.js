import './App.css';
import React from 'react';
import axios from 'axios';
import { Card } from 'semantic-ui-react'

export default class App extends React.Component {
  state = {
    latestNews: [],
    current_page: 1
  }
  componentDidMount() {
    axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)
      .then(latest_news => {
        latest_news.data.map(news_id => {
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${news_id}.json?print=pretty`)
          .then(news => 
            this.setState({
              latestNews: [...this.state.latestNews, news['data']]
            })
          )
        }) 
      })
  }

  render() {
    return (
      <React.Fragment>
      <div className="News Container">
        <Card fluid key="header" color="red" header="Hackerrank News"/>
        {
          this.state.latestNews.length > 30 &&
            this.state.latestNews
            .slice(0, this.state.current_page*30)
            .map(news => (
              <Card.Group>
                <Card fluid key={news.id} color='#ff6600'>
                  <p>{news.title}</p>
                </Card>
              </Card.Group>
          ))
        }
      </div>
      </React.Fragment>
    );
  } 
}
