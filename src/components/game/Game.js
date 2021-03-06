import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import Link from "react-router-dom/es/Link";
import {handleErrors} from "../../helpers/handleErrors";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  color: #FFF;
  text-decoration: none;
  &:visited{
   color:#FFF; 
  }
`;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }

  logout() {
    fetch(`${getDomain()}/users/`+localStorage.getItem('userId'), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body:JSON.stringify({
        status: "OFFLINE"
      })
    })
      .then(response => {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      this.props.history.push("/login");
    }).catch(err => {
      alert('Couldn\'t logout User!');
    });
  }

  componentDidMount() {
    fetch(`${getDomain()}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      }
    })
      .then(handleErrors)
      .then( users => {
        this.setState({ users });
      })
      .catch(err => {
        console.log(err);
        alert(err.message);
      });
  }

  render() {
    return (
      <Container>
        <h2>Happy Coding! </h2>
        <p>Get all users from secure end point:</p>
        {!this.state.users ? (
          <Spinner />
        ) : (
          <div>
            <Users>
              {this.state.users.map(user => {
                return (
                  <PlayerContainer key={user.id}>
                      <StyledLink to={"/game/dashboard/users/"+user.id}>
                        <Player user={user} />
                      </StyledLink>
                  </PlayerContainer>
                );
              })}
            </Users>
            <Button
              width="100%"
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </Button>
          </div>
        )}
      </Container>
    );
  }
}

export default withRouter(Game);
