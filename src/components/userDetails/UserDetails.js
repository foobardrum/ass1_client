import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import InputRow from "../inputRow/InputRow.js";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import {Link, withRouter} from "react-router-dom";
import User from "../shared/models/User";
import dateTime from "../../helpers/dateTime";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
  width: 50%;
`;

const FormContainer = styled.div`
  text-align: left;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  font-weight: 300;
  padding: 37px;
  width: 100%;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  color: #fff;
`;

class UserDetails extends React.Component {
    constructor({match}) {
        super();
        this.state = {
            user: null,
            isDisabled: false,
            key: match.params.key
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        console.log(this);
        this.setState({ [key]: value });
    }

    updateUser(){
        if(dateTime.checkDate(this.state.user.birthdayDate)){
            fetch(`${getDomain()}/users/`+this.state.key, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.state.user.getFormattedUser())
            })
                .then(response => {
                    if(response.status === 202){
                        alert('Succesfully updated user!');
                    }else{
                        alert('Error updating user!')
                    }
                })
        }else{
            alert('The format of your birthday is wrong!');
        }
    }

    componentDidMount() {
        fetch(`${getDomain()}/users/`+this.state.key, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
            .then( user => {
                this.setState({
                    isDisabled:  user.token !== localStorage.getItem('token'),
                    user: new User(user),
                });
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });
    }

    render() {
        return (
            <Container>
                {!this.state.user ? (
                    <Spinner />
                ) : (
                    <div>
                        <h2>User: {this.state.user.username}</h2>
                        <p>Here you have some detailed information:</p>
                        <FormContainer>
                            <Form>
                                <InputRow label="username"
                                          value={this.state.user.username}
                                          name="username"
                                          disabled={this.state.isDisabled}
                                          handleInputChange={this.handleInputChange}
                                    />
                                <InputRow label="birthday date"
                                          value={this.state.user.birthdayDate}
                                          name="birthdayDate"
                                          placeholder="dd.mm.yyyy"
                                          disabled={this.state.isDisabled}
                                          handleInputChange={this.handleInputChange}
                                />
                                <InputRow label="online status"
                                          value={this.state.user.status}
                                          name="status"
                                          disabled={true}
                                          handleInputChange={function () {}}
                                />
                                <InputRow label="creation date"
                                          value={this.state.user.registrationDateTime}
                                          name="registrationDateTime"
                                          disabled={true}
                                          handleInputChange={function () {}}
                                />

                                <ButtonContainer>
                                    <Button
                                        disabled={this.state.isDisabled}
                                        width="50%"
                                        onClick={() => {
                                            this.updateUser();
                                        }}
                                    >
                                        Save
                                    </Button>
                                </ButtonContainer>
                                <ButtonContainer>
                                    <StyledLink to="/game/dashboard">Go back to overview</StyledLink>
                                </ButtonContainer>
                            </Form>
                        </FormContainer>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(UserDetails);
