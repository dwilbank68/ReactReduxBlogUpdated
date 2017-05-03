import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {deletePost, fetchPost} from '../actions'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// import PostShow from './PostShow.jsx';
class PostShow extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchPost(id);
    }


    constructor(props, context){
        super(props, context);
        // this.state = {
        //     whatever:{}
        // }
        this.onDeleteClick = this.onDeleteClick.bind(this)
    }
    
    onDeleteClick(e) {
        const id = this.props.match.params.id;
        this.props.deletePost(id, () => {
            this.props.history.push('/')
        });
    }
    
    render() {
        const {post} = this.props;
        if (!post) return <div>Loading...</div>;
        return (
            <div className="post-show">
                <Link to="/">Back To Index</Link>
                <button className="btn btn-danger pull-xs-right"
                        onClick={this.onDeleteClick}>
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

// PostShow.defaultProps = {};
// PostShow.propTypes = {
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

function mapStateToProps({posts}, ownProps) {
    return { post: posts[ownProps.match.params.id] }
}
//
// const mapStateToProps = state => ({
//     articles: state.articles
// });

///////////////////////////// context //////////////////////////////

// ManageCoursePage.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');


export default connect(mapStateToProps, {deletePost, fetchPost})(PostShow);
// export default connect(mapStateToProps, () => ({}))(PostShow);
// export default connect(mapStateToProps, mapDispatchToProps)(PostShow);
// export default connect(mapStateToProps, { nameOfImportedAction })(PostShow);

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')