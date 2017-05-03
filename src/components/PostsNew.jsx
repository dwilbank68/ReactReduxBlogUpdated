import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';

import { connect } from 'react-redux';
import {createPost} from '../actions/index';
// import { bindActionCreators } from 'redux';

// import PostsNew from './PostsNew.jsx';
class PostsNew extends Component {

    constructor(props, context){
        super(props, context);
        this.state = {
            whatever:{}
        }
       this.onSubmit = this.onSubmit.bind(this)
    }

    // handleClick(e) {
    //
    //    this.setState({
    //
    //    })
    // }

    onSubmit(vals){
        this.props.createPost(vals, () => {
            this.props.history.push('/');
        });
    }

    render() {
        const {handleSubmit} = this.props;                  {/* 1 */}
        return (
            <form   className="posts-new"
                    onSubmit={handleSubmit(this.onSubmit)}> {/* 2 */}
                <Field  label="Title"
                        name="title"
                        component={this.renderField}/>
                <Field  label="Categories"
                        name="categories"
                        component={this.renderField}/>
                <Field  label="Content"
                        name="content"
                        component={this.renderField}/>
                <button type="submit"
                        className="btn btn-primary">
                    Submit
                </button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }

    // 1 -  piped in via reduxForm decorator
    // 2 -  handleSubmit is reduxForm confirming validation before
    //      calling your custom submit function
    
    renderField(field){
        const {meta:{touched, error}} = field;
        const className = `form-group ${touched && error ? 'has-danger':''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input  type="text"
                        className="form-control"
                        {...field.input} />
                <div className="text-help">
                    {touched ? error:''}
                </div>
            </div>
        )
    }



}

function validate(v) {
    // v is an object whose keys are the names of the form fields
    const errors = {};

    if (!v.title) errors.title = 'Enter a title';
    if (!v.categories) errors.categories = 'Enter a category';
    if (!v.content) errors.content = 'Enter some content';

    // if errors is empty, the form will submit
    return errors;
}

// PostsNew.defaultProps = {};
// PostsNew.propTypes = {
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
// const mapStateToProps = state => ({
//     articles: state.articles
// });

///////////////////////////// context //////////////////////////////

// ManageCoursePage.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');


// export default connect()(PostsNew);
const formOptions = {
    form: 'PostsNewForm',
    validate
}
const connectedComponent = connect(null, {createPost})(PostsNew);
export default reduxForm(formOptions)(connectedComponent);
// export default connect(mapStateToProps, () => ({}))(PostsNew);
// export default connect(mapStateToProps, mapDispatchToProps)(PostsNew);
// export default connect(mapStateToProps, { nameOfImportedAction })(PostsNew);

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')