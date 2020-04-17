import React, {Component, Fragment} from "react";
import Modal from "../Modal/Modal";
import Backdrop from "../Backdrop/Backdrop";

class CountriesStatsPopup extends Component{

    closeModal = () => {
        this.props.onCloseModal();
    };

    render() {
        return (this.props.countriesSelected.length >= 1 && this.props.modalOpen) ?(
            <Fragment>
                <Backdrop/>
                <Modal
                    onCloselModal={this.closeModal}
                >
                    Stats History
                </Modal>
            </Fragment>
        ) : null;
    }
}

export default CountriesStatsPopup;