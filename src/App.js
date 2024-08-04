import { useState } from 'react';
import './App.css';
import { Container, Row, Col, Modal, Card, Button, Image } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function App() {
  const [lgShow, setLgShow] = useState(false)
  const [name, setName] = useState("")
  const [birds, setBirds] = useState([]);
  const [bird, setBird] = useState({ "region": [] });

  const birdSelect = (bird) => {
    console.log(bird);
    const selBird = {
      "image": bird.images[0],
      "name": bird.name,
      "family": bird.family,
      "order": bird.order,
      "region": bird.region,
      "status": bird.status
    }
    setBird(selBird)
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const res = await fetch(
      `https://nuthatch.lastelm.software/v2/birds?page=1&pageSize=25&name=${name}&operator=AND`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          'API-Key': "d3cb13ef-d8a9-4bcf-a61e-2ad5116b1478"
        }
      }
    );
    console.log(name)
    const json = await res.json()
    console.log(json)
    setBirds(json.entities)
    setLgShow(true)
  }

  const onchangeHandler = (e) => {
    setName(e.target.value)
    console.log(name)

  }


  return (
    <>
      <div className='main-con'>
        <Container style={{ paddingTop: '1em', }}>
          <Form className="d-flex" onSubmit={submitForm}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ width: '50%', marginLeft: '25%', borderRadius: '30px' }}
              onChange={onchangeHandler}
            />
          </Form>
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Result for '{name}'
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {birds.map((bird) => {
                return (
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col >
                          <Image src={bird.images[0] ? bird.images[0] : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019'}
                            rounded fluid style={{ maxHeight: '5em', backgroundPosition: 'center' }} />
                        </Col>
                        <Col xs={6}>
                          <Card.Title>{bird.name}</Card.Title>
                        </Col>
                        <Col>
                          <Button variant="primary" style={{ height: "5em", width: '100%' }} onClick={() => birdSelect(bird)}>Select</Button>
                        </Col>
                      </Row>

                    </Card.Body>
                  </Card>
                );
              })}
            </Modal.Body>
          </Modal>
          <Container style={{
            backgroundImage: 'url(https://source.unsplash.com/random/900×700/?nature)',
            backgroundColor: 'rgba(0, 0, 0, 0.4)', backgroundBlendMode: 'multiply', backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover', width: '90%', height: '42em', borderRadius: '30px', boxShadow: ' 0px 3px 25px', margin: '0 auto', marginTop: '1em'
          }}>
            <Row>
              <h1 style={{ textAlign: 'center', marginTop: '8px', color: 'white', textShadow: '0px 2px 10px black' }}>{bird.name}</h1>
              <h4 style={{
                textAlign: 'center', fontStyle: 'italic', marginTop: '4px', color: 'white', textShadow: '0px 2px 10px black', stroke: '2px',
                WebkitTextStroke: '1px black'
              }}>{bird.sciName}</h4>
            </Row>
            <Row style={{ height: '100%' }}>
              <Col>
                <Row>
                  <h3 style={{ textAlign: 'right', marginTop: '8px', color: 'white', textShadow: '0px 2px 10px black' }}>Family</h3>
                  <h4 style={{
                    textAlign: 'right', fontStyle: 'italic', marginTop: '4px', color: 'white', textShadow: '0px 2px 10px black',
                    stroke: '2px', WebkitTextStroke: '1px black'
                  }}>{bird.family}</h4>
                </Row>
                <Row style={{ marginTop: '6em' }}>
                  <h3 style={{ textAlign: 'right', marginTop: '8px', color: 'white', textShadow: '0px 2px 10px black' }}>Order</h3>
                  <h4 style={{
                    textAlign: 'right', fontStyle: 'italic', marginTop: '4px', color: 'white', textShadow: '0px 2px 10px black',
                    stroke: '2px', WebkitTextStroke: '1px black'
                  }}>{bird.order}</h4>
                </Row>
              </Col>
              <Col>
                <Container style={{
                  backgroundImage: `url(${bird.image ? bird.image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019'})`,
                  backgroundSize: 'cover', width: '30em', height: '30em', borderRadius: '30px', boxShadow: '0px 3px 25px', backgroundPosition: 'center'
                }}>
                </Container>
              </Col>
              <Col>
                <Row>
                  <h3 style={{ textAlign: 'left', marginTop: '8px', color: 'white', textShadow: '0px 2px 10px black' }}>Region</h3>
                  {
                    bird.region.map((i) =>
                      <h4 style={{
                        textAlign: 'left', marginTop: '4px', color: 'white', textShadow: '0px 2px 10px black', stroke: '2px',
                        WebkitTextStroke: '1px black'
                      }}>{i}</h4>
                    )
                  }
                </Row>
                <Row style={{ marginTop: '6em' }}>
                  <h3 style={{ textAlign: 'left', marginTop: '8px', color: 'white', textShadow: '0px 2px 10px black' }}>Status</h3>
                  <h4 style={{
                    textAlign: 'left', marginTop: '4px', color: 'white', textShadow: '0px 2px 10px black', stroke: '2px',
                    WebkitTextStroke: '1px black'
                  }}>{bird.status}</h4>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    </>
  );
}

export default App;
