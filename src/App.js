import './App.css';
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Card, Image } from 'semantic-ui-react';
import {
  StyledCard,
  TableRows
} from './style';

export default class App extends React.Component {
  state = {
    latestNews: [],
    current_page: 1
  }
  componentDidMount() {
    axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)
      .then(latest_news => {
        latest_news.data.map(news_id => 
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${news_id}.json?print=pretty`)
          .then(news => 
            this.setState({
              latestNews: [...this.state.latestNews, news['data']]
            })
          )
        ) 
      })
  }

  render() {
    const getTime = (timestamp) => {
      const dateTimeAgo = moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss")
      return moment(dateTimeAgo).fromNow();
    }

    return (
      <React.Fragment>
        <StyledCard>
          <Card fluid key="header">
          <Card.Content>
            <div>
              <Image 
              src='https://pbs.twimg.com/profile_images/378800000011494576/9c90acb704cbf9eef6135009c9bb5657_400x400.png' />
            </div>
            <Card.Header>Hackerrank News</Card.Header>
          </Card.Content>
          </Card>
          <br/>
        </StyledCard>
        {
          this.state.latestNews.length > 30 &&
            this.state.latestNews
            .slice(0, this.state.current_page*30)
            .map(news => (
              <TableRows>
                <Card.Group>
                  {console.log(news)}
                  <Card fluid key={news.id}>
                    <a href={news.url}>{news.title}</a>
                    <p>{news.descendants} points by {news.by} {getTime(news.time)}</p>
                    
                  </Card>
                </Card.Group>
              </TableRows>
          ))
        } 
      </React.Fragment>
    );
  } 
}
