import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
// import { bindActionCreators } from 'redux';
import {fetchPosts} from '../actions';

// import PostsIndex from './PostsIndex.jsx';
class PostsIndex extends Component {

    componentDidMount() {
        this.props.fetchPosts();
    }


    // constructor(props, context){
    //     super(props, context);
    //     this.state = {
    //         whatever:{}
    //     }
    //    this.handleClick = this.handleClick.bind(this)
    // }

    // handleClick(e) {
    //
    //    this.setState({
    //
    //    })
    // }

    render() {
        return (
            <div className="posts-index">
                <div className="text-xs-right">
                    <Link to="/posts/new"
                          className='btn btn-primary'>Add A Post</Link>
                </div>
                <h3>Posts</h3>
                PostsIndex here
                <ul className="list-group">
                    {this.renderPosts()}
                </ul>
            </div>
        );
    }

    renderPosts(){
        return _.map(this.props.posts, post => {
            return (
                <li className="list-group-item" key={post.id}>
                    <Link to={`/posts/${post.id }`}>
                        {post.title}
                    </Link>
                </li>
            )
        })
    }
}

// PostsIndex.defaultProps = {};
// PostsIndex.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol

///////////////////////////// mapDispatchToProps //////////////////////////////
//
// Option 1. Skip it - dispatch is on props anyway
// -----------> this.props.dispatch(loadCourses());
//
//
// Option 2. Wrap props manually
//
// function mapDispatchToProps(dispatch) {
//     return {
//         loadCourses: () => {dispatch(loadCourses())},
//         createCourse: (course) => {dispatch(createCourse(course))},
//     };
// }
// -> this.props.loadCourses, this.props.createCourse
//
//
// Option 3. use bindActionCreators (which is just a shortcut method)
//
// function mapDispatchToProps(dispatch) {
//     return bindActionCreators(
//         { nameYouWantOnProps:nameOfImportedAction },
//         dispatch
//     );
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         actions: bindActionCreators(actions, dispatch)
//     };
// }
//
// -> this.props.actions.loadCourses();

///////////////////////////// mapStateToProps //////////////////////////////

// function mapStateToProps(state, ownProps) {
//     return { whatever: state.whatever }
// }
//
const mapStateToProps = state => ({
    posts: state.posts
});

///////////////////////////// context //////////////////////////////

// ManageCoursePage.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');


// export default connect(mapStateToProps, () => ({}))(PostsIndex);
// export default connect(mapStateToProps, mapDispatchToProps)(PostsIndex);
export default connect(mapStateToProps, {fetchPosts})(PostsIndex);

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')