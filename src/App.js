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
    latest_news: [], // Get all the latest news
    is_loading: true, // Loader until gets all the data
    current_page: 1, // Each page shows only 30 records in a page, increment page after each 30 records
    from_index: 0, // it is to iterate latest news from 30 to 30
    to_index: 30,
    is_last_batch: false // check whether the last batch arrived
  }
  componentDidMount() {
    /**
     * Get all the latest news id
     * Query each record details with the acquired it
     * Save the each record in latest_news state
     * Make is_loading as flase since we got all the records
     */
    axios.get(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)
      .then(latest_news => {
        latest_news.data.map(news_id => 
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${news_id}.json?print=pretty`)
          .then(news => 
            this.setState({
              latest_news: [...this.state.latest_news, news['data']]
            })
          )
        ) 
        this.setState({is_loading: false})
      })
  }

  render() {

    /**
     * getTime - It gets the time ago for the given timestamp 
     * @param {*} timestamp - The given timestamp of the post
     * @returns time ago for the given timestap
     */
    const getTime = (timestamp) => {
      const dateTimeAgo = moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss")
      return moment(dateTimeAgo).fromNow();
    }

    /**
     * handleMore - It handles the more link of the page, it gets the nxt batch
     * returns - Nothing
     */
    const handleMore = () => {
      this.setState({current_page: this.state.current_page+1})
      this.setState({from_index: this.state.from_index+30})
      if(this.state.latest_news.length >= this.state.from_index+30) {
        this.setState({to_index: this.state.to_index+30})
      } else {
        this.setState({from_index: this.state.from_index + (this.state.latest_news.length - this.state.from_index)})
        this.setState({'is_last_batch': true})
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
            <Card.Header>Hacker News</Card.Header>
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
          this.state.latest_news.length > 30 &&
            this.state.latest_news
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
        !this.state.is_last_batch && <MoreLinkComponent href="#" onClick={() => handleMore()}>More</MoreLinkComponent>
        }
      </React.Fragment>
    );
  } 
}
