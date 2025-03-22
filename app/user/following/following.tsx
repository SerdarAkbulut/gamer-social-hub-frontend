import React from "react";
interface user {
  userId: number;
}
const Following: React.FC<user> = ({ userId }) => {
  return <div>{userId}Following</div>;
};

export default Following;
