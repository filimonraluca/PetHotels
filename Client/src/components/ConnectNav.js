import { useSelector } from "react-redux";
import { Card, Avatar } from "antd";
import moment from "moment";

const { Meta } = Card;

const ConnectNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user } = auth;
  console.log("HEREEE" + user)
  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
         // avatar={user.firstName[0]}
          //title={user.lastName}
          avatar={<Avatar>A</Avatar>}
          title="Andra Simion"

          //   description={`Joined ${moment(user.createdAt).fromNow()}`}
        />
      </Card>
      {auth && auth.user && (
        <>
          <div>Pending balance</div>
          <div>Payout settings</div>
        </>
      )}
    </div>
  );
};

export default ConnectNav;
