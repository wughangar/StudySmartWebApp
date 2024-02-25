import React from 'react';
import {Oval} from 'react-loader-spinner';
import {connect} from "react-redux";

class LoadingDialog extends React.Component
{
    render()
    {
        const {loadingDialogStatus} = this.props;

        // you can change the type and color as per your need
        return (
            <div className="modal show d-flex justify-content-center align-items-center">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="d-flex justify-content-center align-items-center">
                                <Oval type="ThreeDots" color="#00BFFF" height={80} width={80}/>
                            </div>
                            <p className="text-center">{loadingDialogStatus}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loadingDialogStatus: state.app.loadingDialogStatus,
});

export default connect(mapStateToProps)(LoadingDialog);
