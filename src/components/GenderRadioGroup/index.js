import React, { Component } from 'react';

class GenderRadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGender: 'male',
        };
    }

    handleGenderChange = (event) => {
        this.setState({
            selectedGender: event.target.value,
        });
        this.props.onGenderChange(event.target.value);
    };

    render() {
        return (
            <div>
                <label>
                    <input
                        type="radio"
                        value="male"
                        checked={this.state.selectedGender === 'male'}
                        onChange={this.handleGenderChange}
                    />
                    Чоловік
                </label>
                <label>
                    <input
                        type="radio"
                        value="female"
                        checked={this.state.selectedGender === 'female'}
                        onChange={this.handleGenderChange}
                    />
                    Жінка
                </label>
            </div>
        );
    }
}

export default GenderRadioGroup;