"use client";

import React from 'react';
import { Card, CardBody, CardTitle, CardText, CardLink } from 'reactstrap';

const NewsArticle = ({ title, excerpt, url }) => (
  <Card className="mb-3">
    <CardBody>
      <CardTitle tag="h5">{title}</CardTitle>
      <CardText>{excerpt}</CardText>
      <CardLink href={url} target="_blank">Read More</CardLink>
    </CardBody>
  </Card>
);

export default NewsArticle;
