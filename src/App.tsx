import React from 'react';
import PostsList from './app/pages/Posts/PostsList';
import PostAdd from './app/pages/Posts/PostAdd';

function App() {
  return (
    <div className="App">
      <PostAdd />
      <PostsList />
    </div>
  );
}

export default App;
