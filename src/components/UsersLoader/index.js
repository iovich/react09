import React, { Component } from 'react';
import Spinner from '../Spinner';
import * as API from '../../api';
import GenderRadioGroup from '../GenderRadioGroup';

const ListUsers = ({ users }) => {
  const renderUser = ({ login: { uuid }, name: { first: firstName, last: lastName } }) => {
    return <li key={uuid}>{firstName} {lastName}</li>
  }
  return (
    <ul>
      {users.map(renderUser)}
    </ul>
  );
}
class UsersLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: false,
      page: 1,
      isError: false,
      selectedGender: 'male'
    }
    console.log('constructor');
  }

  load() {
    this.setState({ isLoading: true });
    const { page, selectedGender } = this.state;
    API.getUsers({ page, results: 5, gender: selectedGender })
      .then(data => this.setState({
        users: data.results,
      }))
      .catch(error => this.setState({
        isError: true,
      }))
      .finally(() => this.setState({
        isLoading: false
      }));
  }

  handleGenderChange = (selectedGender) => {
    this.setState({ selectedGender, page: 1 }, () => {
      this.load();
    });
  };
  componentDidMount() {
    console.log('componentDidMount');
    this.load();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    if (this.state.page === prevState.page) {
      return;
    }
    this.load();

  }
  prevPage = () => {
    this.setState({ page: this.state.page - 1 })
  }
  nextPage = () => {
    this.setState({ page: this.state.page + 1 })
  }

  render() {
    console.log('render');
    const { users, isLoading, page, isError } = this.state;
    if (isError) {
      return <p>Error...</p>
    }
    return (
      <section>
        <h2>Users List:</h2>
        <GenderRadioGroup onGenderChange={this.handleGenderChange}/>
        <button disabled={page === 1} onClick={this.prevPage}>{"<"}</button>
        <span>page:{page}</span>
        <button onClick={this.nextPage}>{">"}</button>
        {/* {
          isLoading ? <Spinner /> : <ListUsers users={users} />
        } */}
        <ListUsers users={users} />
        {isLoading && <Spinner />}
      </section>
    );
  }
}

export default UsersLoader;










