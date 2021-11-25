import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

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
			</div>
		);
	}
	else {
		return (
			<div></div>
		);
	}
};

const DishDetail = (props) => {
	console.log('DishDetail render');
	if (props.dish != null) {
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-5 m-1">
						<RenderDish dish={props.dish} />
					</div>
					<div className="col-12 col-md-5 m-1">
						<RenderComments comments={props.dish.comments} />
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