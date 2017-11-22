import {connect} from 'react-redux';
import Main from './main';
import {logout} from '../../actions/session_actions';
import {fetchChannel} from '../../actions/channel_actions';

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  fetchChannel: (id) => dispatch(fetchChannel(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
