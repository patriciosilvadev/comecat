import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import comecatSignUp from '../assets/img/comecatLogin.png';
import signupPic from '../assets/img/signupPic.jpg';
import * as actions from '../actions';

import * as constnat from '../lib/const';
import * as strings from '../lib/strings';
import * as config from '../lib/config';
import user from '../lib/user';

class SignUp extends Component {

    static propTypes = {
    }

    state = {
        acceptPrivacyPolicy: false,
        privacyPolicyError: ""
    }


    submit = (e) => {

        e.preventDefault();

        this.props.onValidationError("");

        this.setState({
            privacyPolicyError: ""
        });

        const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!reEmail.test(this.props.email))
            return this.props.onValidationError(strings.EmailValidationError1[user.lang]);
        else
            this.props.onValidationError("");

        if (!this.state.acceptPrivacyPolicy) {
            this.setState({
                privacyPolicyError: strings.PrivacyPolicyError[user.lang]
            });
            return;
        }

        this.props.onSubmit(this.props.email);

    }

    render() {

        return (
            <div className="row no-gutters min-h-fullscreen bg-white">
                <div className="col-md-6 col-lg-7 col-xl-8 d-none d-md-block bg-img" style={{ backgroundImage: `url(${signupPic})` }} data-overlay="5">

                    <div className="row h-100 pl-50">
                        <div className="col-md-10 col-lg-8 align-self-end">
                            <img src={comecatSignUp} alt="..." />
                            <br />
                            <h4 className="text-white">{strings.SignUpTitle1[user.lang]}</h4>
                            <p className="text-white">
                                {strings.SignUpTitle2[user.lang]}
                            </p>
                            <br /><br />
                        </div>
                    </div>

                </div>

                <div className="col-md-6 col-lg-5 col-xl-4 align-self-center">
                    <div className="px-80 py-30">
                        <h4>{strings.SignupTitle1[user.lang]}</h4>
                        <p><small></small></p>
                        <br />

                        <form className="form-type-material" onSubmit={this.submit}>

                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    placeholder={strings.SignupFormPlaceholderEmail[user.lang]}
                                    onChange={e => this.props.onTypeEmail(e.target.value)}
                                    value={this.props.email} />

                                <div className="invalid-feedback">{this.props.emailError}</div>

                            </div>

                            <div className="form-group flexbox">
                                <div>
                                    <label className="custom-control custom-checkbox" htmlFor="accept">
                                        <input id="accept" type="checkbox" className="custom-control-input"
                                            checked={this.state.acceptPrivacyPolicy}
                                            onChange={e => { this.setState({ acceptPrivacyPolicy: !this.state.acceptPrivacyPolicy }) }} />
                                        <span className="custom-control-indicator"></span>
                                        <span className="custom-control-description">{strings.LoginFormPrivacy[user.lang]}</span>
                                    </label>
                                    <div className="invalid-feedback">{this.state.privacyPolicyError}</div>
                                </div>
                                <div>
                                    <a href="https://come.cat/privacypolicy" target="_blank" className="text-muted hover-primary fs-13">{strings.PrivacyPolicy[user.lang]}</a>
                                </div>
                            </div>

                            <div className="form-group">
                                <button
                                    className="btn btn-bold btn-block btn-primary"
                                    type="button"
                                    onClick={this.submit}
                                >
                                    {strings.SignUpButtonTitle[user.lang]}
                                    {this.props.loading ? <i className="fa fa-spinner fa-spin fa-fw"></i> : null}
                                </button>
                            </div>

                        </form>

                        <hr className="w-30px" />

                        <p className="text-center text-muted fs-13 mt-20">{strings.SignUpBackText[user.lang]}<br />
                            &nbsp;<Link to={config.BasePath} className="text-primary fw-500">{strings.SignUpLoginLink[user.lang]}</Link>
                        </p>
                    </div>
                </div>

                {
                    this.props.finished ? <div
                        className="swal2-container swal2-fade swal2-shown"
                        style={{ "overflowY": "auto" }}>

                        <div className="swal2-modal swal2-show"
                            style={{
                                "width": "500px",
                                "padding": "20px",
                                "background": "rgb(255, 255, 255)",
                                "display": "block",
                                "minHeight": "289px"
                            }}>

                            <div className="swal2-icon swal2-success swal2-animate-success-icon" style={{ "display": "block" }}>
                                <div className="swal2-success-circular-line-left" style={{ "background": "rgb(255, 255, 255)" }}></div>
                                <span className="swal2-success-line-tip swal2-animate-success-line-tip"></span>
                                <span className="swal2-success-line-long swal2-animate-success-line-long"></span>
                                <div className="swal2-success-ring"></div>
                                <div className="swal2-success-fix" style={{ "background": "rgb(255, 255, 255)" }}></div>
                                <div className="swal2-success-circular-line-right" style={{ "background": "rgb(255, 255, 255" }}></div>
                            </div>

                            <h2 className="swal2-title" id="swal2-title">{strings.SignUpFinishTitle[user.lang]}</h2>
                            <div id="swal2-content" className="swal2-content" style={{ "display": "block" }}>{strings.SignUpFinishText[user.lang]}</div>

                            <div className="swal2-buttonswrapper" style={{ "display": "block" }}>
                                <button type="button" className="swal2-confirm btn btn-bold btn-primary" onClick={this.props.signupDone}>OK</button>
                            </div>

                        </div>
                    </div> : null
                }

            </div >

        );
    }

}

const mapStateToProps = (state) => {
    return {
        loading: state.signup.loading,
        email: state.signup.email,
        emailError: state.signup.emailValidationError,
        finished: state.signup.finished
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (email) => dispatch(actions.signup.onSubmit(email)),
        onTypeEmail: (v) => dispatch(actions.signup.onTypeEmail(v)),
        onValidationError: (error) => dispatch(actions.signup.onValidationError(error)),
        signupDone: () => dispatch(actions.signup.signupDone()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);
