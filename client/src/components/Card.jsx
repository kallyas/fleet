import React from "react";

const Card = ({ data }) => {
  const { title, numbers, icon, text } = data;
  return (
    <div className="card card-body mb-4">
      <article className="icontext">
        <span className="icon icon-sm rounded-circle bg-primary-light">
          <i className={`text-primary material-icons md-${icon}`}></i>
        </span>
        <div className="text">
          <h6 className="mb-1 card-title">{title}</h6>
          <span>{numbers}</span>
          <span className="text-sm">{text}</span>
        </div>
      </article>
    </div>
  );
};

export default Card;
