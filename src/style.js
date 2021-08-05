import styled from "styled-components";

export const StyledCard = styled.div`
  background-color: white;
  font-size: 24px;
  color: black;
  img {
      width: 30px;
      height: 30px;
      float: left;
  }
  .content {
      background-color: #ff6600!important;
  }
`;

export const TableRows = styled.div`
    color:  black;
    width: 90%;
    margin-left: 20px;
    margin-right: 20px;
    background-color: #f6f6ef;
    font-size: 12px;
    a {
        color: black;
        font-family: Verdana, Geneva, sans-serif;
    }
`;

export const SubText = styled.p`
    font-family: Verdana, Geneva, sans-serif;
    font-size: 7pt;
    color: #828282;
`;

export const SubTextSpan = styled.span`
    font-family: Verdana, Geneva, sans-serif;
    font-size: 7pt;
    color: #828282;
`;

export const MoreLinkComponent = styled.a`
    color: black;
    padding-top: 2%;
    float: right;
    padding-right: 8%;
`;