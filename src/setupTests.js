// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom';
import {toBeInTheDocument,toHaveStyle} from 
  '@testing-library/jest-dom';
import { render, getByText } from '@testing-library/react';
import App from './App';

expect.extend({ toBeInTheDocument, toHaveStyle });

 
 test('Test for loading state', () => {
     render(
         <App />
     )
     const loadingElem = getByText('Loading');
     expect(loadingElem).toBeInTheDocument();
 });