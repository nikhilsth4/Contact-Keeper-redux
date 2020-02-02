import React, { useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchLogs, clearSearch } from '../../actions/LogActions';

const SearchBar = ({ searchLogs, clearSearch }) => {
  const text = useRef('');

  const onChange = e => {
    if (text.current.value !== '') {
      searchLogs(text.current.value);
    } else {
      clearSearch();
    }
  };
  return (
    <nav style={{ marginBottom: '30px' }} className='blue'>
      <div className='nav-wrapper'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              placeholder='search Logs..'
              ref={text}
              onChange={onChange}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired
};

export default connect(null, { searchLogs, clearSearch })(SearchBar);
