import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
	constructor(props) {
		super(props);
	};

	renderDish(dish) {
		return (
			<Card>
				<CardImg src={dish.image} alt={dish.name} />
				<CardBody>
					<CardTitle>{dish.name}</CardTitle>
					<CardText>{dish.description}</CardText>
				</CardBody>
			</Card>
		);
	};

	renderComments(comments) {
		const comms = comments.map((comm) => {
			return (
				<li key={comm.id}>
					<p>{comm.comment}</p>
					<p>-- {comm.author}, {comm.date}</p>
				</li>
			);
		});

		return (
			<div>
				<h4>Comments</h4>
				<ul className="list-unstyled">
					{comms}
				</ul>
			</div>
		);
	};

	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						{this.renderDish(this.props.dish)}
					</div>
					<div className="col-12 col-md-5 m-1">
						{this.renderComments(this.props.dish.comments)}
					</div>
				</div>
			</div>
		);
	}
};

export default DishDetail;