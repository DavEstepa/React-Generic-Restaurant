import {React, Component} from 'react';
import { Card, CardImg, CardText, CardBody, 
	Button, CardTitle, Breadcrumb, BreadcrumbItem,
	Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
//FUNCIONES QUE VALIDAN EL CAMPO DEL COMPONENTE CONTROL

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
	constructor(props){
		super(props);
		this.state = {
			isModalOpen: false
		};
		this.toggleModal = this.toggleModal.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
		this.toggleModal();
        // event.preventDefault();
    }

	render(){
		return(
			<>
				<Button outline onClick={this.toggleModal}><i class="fa fa-pencil fa-lg"></i> Submit Comment</Button>	
				<Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
							<Row className="form-group mx-auto">
									<Label htmlFor="rating">Rating</Label>
									<Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
                                    </Control.select>
							</Row>
							<Row className="form-group  mx-auto">
								<Label htmlFor="name">Your Name</Label>
								<Control.text model=".name" id="name" name="name"
									placeholder="Your name"
									className="form-control"
									validators={{
										minLength: minLength(3), maxLength: maxLength(15)
									}}
								/>
								<Errors
									className="text-danger"
									model=".name"
									show="touched"
									messages={{
										minLength: 'Must be greater than 2 characters',
										maxLength: 'Must be 15 characters or less'
									}}
								/>
							</Row>
							<Row className="form-group  mx-auto">
								<Label htmlFor="comment">Comment</Label>
								<Control.textarea model=".comment" id="comment" name="comment"
									rows="6"
									className="form-control" />
							</Row>


                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
			</>
			
		);
	};
}

function RenderDish({ dish }) {
	if (dish != null) {
		return (
			<Card>
				<CardImg src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		);
	}
	else {
		return (
			<div></div>
		);
	}
};

function RenderComments({ comments }) {
	if (Array.isArray(comments) && comments.length) {
		const comms = comments.map((comm) => {
			return (
				<li key={comm.id}>
					<p>{comm.comment}</p>
					<p>-- {comm.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comm.date)))}</p>
				</li>
			);
		});
		return (
			<div>
				<h4>Comments</h4>
				<ul className="list-unstyled">
					{comms}
				</ul>
				<CommentForm />
			</div>
		);
	}
	else {
		return (
			<div>
				<CommentForm />
			</div>
		);
	}
};

const DishDetail = (props) => {
	console.log('DishDetail render');
	if (props.dish != null) {
		return (
			<div className="container">
				<div className="row">
					<Breadcrumb>
						<BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
						<BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
					</Breadcrumb>
					<div className="col-12">
						<h3>{props.dish.name}</h3>
						<hr />
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={props.dish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<RenderComments comments={props.comments} />
					</div>
				</div>
			</div>
		);
	}
	else {
		return (
			<div></div>
		);
	}

}


export default DishDetail;