import React, { useEffect, useState } from 'react';
import { Table, Card, Button, Modal } from 'react-bootstrap';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Teams API endpoint:', endpoint);
        console.log('Fetched teams:', data);
        setTeams(data.results || data);
      });
  }, []);

  const handleShowModal = team => {
    setSelectedTeam(team);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeam(null);
  };

  return (
    <Card className="mt-4">
      <Card.Header as="h2">Teams</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Members</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr key={team.id}>
                <td>{team.id}</td>
                <td>{team.name}</td>
                <td>{team.members ? team.members.length : 0}</td>
                <td>
                  <Button variant="info" onClick={() => handleShowModal(team)}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Team Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTeam && (
            <div>
              <h5>Name: {selectedTeam.name}</h5>
              <p>ID: {selectedTeam.id}</p>
              <p>Members: {selectedTeam.members ? selectedTeam.members.join(', ') : 'None'}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Teams;
