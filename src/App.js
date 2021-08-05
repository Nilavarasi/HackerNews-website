import './App.css';
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Card, Image, Dimmer, Loader } from 'semantic-ui-react';
import {
  StyledCard,
  TableRows,
  SubText,
  SubTextSpan,
  MoreLinkComponent
} from './style';

export default class App extends React.Component {
  state = {
    latestNews: [],
    is_loading: true,
    current_page: 1,
    from_index: 0,
    to_index: 30,
    lastRecord: false
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
        this.setState({is_loading: false})
      })
  }

  render() {
    const getTime = (timestamp) => {
      const dateTimeAgo = moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss")
      return moment(dateTimeAgo).fromNow();
    }
    const handleMore = () => {
      this.setState({current_page: this.state.current_page+1})
      this.setState({from_index: this.state.from_index+30})
      if(this.state.latestNews.length >= this.state.from_index+30) {
        this.setState({to_index: this.state.to_index+30})
      } else {
        this.setState({from_index: this.state.from_index + (this.state.latestNews.length - this.state.from_index)})
        this.setState({'lastRecord': true})
      }
  
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
          {this.state.is_loading ?
            <Dimmer active>
              <Loader>Loading</Loader>
            </Dimmer>
            :
            <div></div>
          }
        </StyledCard>
        {
          this.state.latestNews.length > 30 &&
            this.state.latestNews
            .slice(this.state.from_index, this.state.to_index)
            .map((news, index) => (
              <TableRows>
                <Card.Group>
                  <Card fluid key={news.id}>
                    <a href={news.url}>
                      {this.state.from_index+index+1}. {news.title}
                      <SubTextSpan> ({news.url && news.url.split('/')[2]})</SubTextSpan></a>
                    <SubText>{news.descendants} points by {news.by} {getTime(news.time)} | {news.kids ? news.kids.length : 0} comments</SubText>
                    
                  </Card>
                </Card.Group>
              </TableRows>
          ))
        }
        {
        !this.state.lastRecord && <MoreLinkComponent href="#" onClick={() => handleMore()}>More</MoreLinkComponent>
        }
      </React.Fragment>
    );
  } 
}
