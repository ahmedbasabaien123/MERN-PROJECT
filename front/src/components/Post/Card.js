import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import { formatDate } from "../Utils";
import FollowHandler from "../profil/FollowHandler";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.usersReducer);

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"> </i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(usersData[0]) &&
                usersData.map((user) => {
                  if (user._id === post.posterId) return user.picture;
                })
              }
              alt="poster-pic"
            />
          </div>

          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {!isEmpty(usersData[0]) &&
                    usersData.map((user) => {
                      if (user._id === post.posterId) return user.pseudo;
                    })}
                </h3>
                {post.posterId === !userData.id_id && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              <span>{formatDate(post.createdAt)}</span>
            </div>
            <p>{post.message}</p>
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img src="./img/icons/message1.svg" alt="comment"/>
                <span>{post.comments.length}</span>
              </div>
              <h6>Like button</h6>
              <img src="./img/icons/share.svg" alt="share"/>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;
