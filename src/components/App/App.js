import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import TaskList from '../TaskList/TaskList';

const App = () => {

  return (
    <section className="todoapp">
      <Header />
      <section className="main">
        <TaskList />
        <Footer />
      </section>
    </section>
  );
};

export default App;